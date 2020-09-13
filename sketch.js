var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup, gameover, goi, restartImg;
var score;
var play = 1,
  end = 0;
var gamestate = play;
var survivalTime = 0;
var restart;



function preload() {


  monkey_running = loadAnimation("monkey_0.png", "monkey_1.png", "monkey_2.png", "monkey_3.png", "monkey_4.png", "monkey_5.png", "monkey_6.png", "monkey_7.png", "monkey_8.png")

  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  goi = loadImage("gameover.png");
  restartImg = loadImage("restart.png");
}



function setup() {
  createCanvas(600, 400);



  var survivalTime = 0;
  gameover = createSprite(300, 200, 20, 20);
  gameover.addImage(goi);
  gameover.visible = false;



  //creating monkey
  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  // monkey.addImage(bananaImage)
  monkey.scale = 0.1

  ground = createSprite(400, 350, 1200, 10);
  ground.velocityX = -4;
  ground.x = ground.width / 2;
  console.log(ground.x)

  restart = createSprite(300, 250);
  restart.addImage(restartImg);
  restart.scale = 0.5;
  restart.visible = false;

  FoodGroup = new Group();
  obstaclesGroup = new Group();

  score = 0;


}


function draw() {

  background("lightblue");
  fill("black");
  textSize(20);
  text("Score: " + score, 500, 50);

  text("Survival Time: " + survivalTime, 100, 50);

  if (gamestate == play) {
    spawnFood();
    spawnObstacles();
    survivalTime = frameCount;


    restart.addImage(restartImg);
    restart.scale = 0.5;

    if (ground.x < 0) {
      ground.x = ground.width / 2;
    } //console.log(monkey.y);
    if (keyDown("space") && monkey.y > 314.2) {

      monkey.velocityY = -18;
    }
    monkey.velocityY = monkey.velocityY + 0.8;
    if (frameCount > 101)
      if (monkey.isTouching(banana)) {
        banana.lifetime = 0;
        score = score + 1;

      }
    if (obstaclesGroup.isTouching(monkey)) {
      ground.velocityX = 0;
      monkey.velocityY = 0;
      /* FoodGroup.setVelocityEach(0);
       FoodGroup.setLifetimeEach(0);
       obstaclesGroup.setLifetimeEach(0);
       FoodGroup.setLifetimeEach(0);
       monkey.lifetime = 0;*/
      FoodGroup.destroyEach(0);
      obstaclesGroup.destroyEach(0);
      gamestate = end;
    }


  }

  if (gamestate == end) {

    gameover.visible = true;
    restart.visible = true;

    ground.velocityX = 0;

    obstaclesGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(0);
    FoodGroup.setLifetimeEach(0);
    //to make the monkey disappear in end state
    monkey.visible = false;

    if (mousePressedOver(restart)) {
      reset();
    }
  }




  //console.log(gamestate);
  monkey.collide(ground);
  drawSprites();
}




function spawnFood() {
  //write code here to spawn the Food
  if (frameCount % 100 === 0) {
    banana = createSprite(600, 250, 40, 10);
    banana.y = random(120, 200);
    banana.velocityX = -5;

    //assign lifetime to the variable
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;

    //add image of banana
    banana.addImage(bananaImage);
    banana.scale = 0.095;

    //add each banana to the group
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if (frameCount % 300 === 0) {
    obstacle = createSprite(800, 320, 10, 40);
    obstacle.velocityX = -6;

    //add image to the obstacle 
    obstacle.addImage(obstaceImage);
    obstacle.scale = 0.15;

    //lifetime to the obstacle     
    obstacle.lifetime = 300;

    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset() {
  gameover.visible = false;
  restart.visible = false;
  score = 0;
  frameCount = 0;// to reset the survival time
  
  //to make the monkey reappear when we click reset
  monkey.visible = true;
  monkey.changeAnimation("moving", monkey_running);
  gamestate = play;

}