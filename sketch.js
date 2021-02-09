var trex, trex_running, trex_collided, cloudImage, GO, RS, GOI, RSI, O1I, O2I, O3I, O4I, O5I, O6I, ground, invisibleGround, groundImage, obstaclesGroup, cloudsGroup, PLAY, END, gameState;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  cloudImage = loadImage("cloud.png");
  groundImage = loadImage("ground2.png");
  O1I = loadImage("obstacle1.png");
  O2I = loadImage("obstacle2.png");
  O3I = loadImage("obstacle3.png");
  O4I = loadImage("obstacle4.png");
  O5I = loadImage("obstacle5.png");
  O6I = loadImage("obstacle6.png");
  GOI = loadImage("gameOver.png");
  RSI = loadImage("restart.png");
  
}

function setup() {
  createCanvas(600, 200);
  
  GO = createSprite (200,200,200,200);
  GO = addImage("gameOver", GOI);
  
  
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -2;
  
  invisibleGround = createSprite(200,184,400,10);
  invisibleGround.visible = false;
  
  obstaclesGroup = createGroup();
  cloudsGroup = createGroup();
  
  END = 0;
  PLAY = 1;
  gameState = PLAY;
}

function draw() {
  background(180);
  
  trex.collide(invisibleGround);
  
  if (gameState === PLAY){
    if(keyDown("space")) {
      trex.velocityY = -10;
    }
  
    trex.velocityY = trex.velocityY + 0.8;
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
  
    if (trex.isTouching(obstaclesGroup)) {
      gameState = END;
      
    }
  
   spawnClouds();
   spawnObstacles();
  }
  
  if (gameState === END) {
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    ground.velocityX = 0;
    trex.changeAnimation ("collided", trex_collided);
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
    
  }
  
  
   drawSprites();
}

function spawnClouds() {
  if (frameCount % 100 === 0) {
    var num = random(80,120);
    var num1 = random(0.3,1);
    var cloud = createSprite(620,num);
    cloud.addImage(cloudImage);
    cloud.scale = num1;
    cloud.velocityX = -3;
    cloud.lifetime = 230;
    
    cloudsGroup.add(cloud);
  
  }
}
  
function spawnObstacles() {
  if (frameCount % 100 === 0) {
    var num2 = Math.round(random(1,6));
    var obstacle = createSprite(620,160);
    
    switch(num2) {
      case 1:
        obstacle.addImage(O1I);
        break;
      case 2:
        obstacle.addImage(O2I);
        break;
      case 3:
        obstacle.addImage(O3I);
        break;
      case 4:
        obstacle.addImage(O4I);
        break;
      case 5:
        obstacle.addImage(O5I);
        break;
      case 6:
        obstacle.addImage(O6I);
        break; 
      default:
        break;
    }

    obstacle.velocityX = -2;
    obstacle.lifetime = 310;
    obstacle.scale = 1/2;
    
    obstaclesGroup.add(obstacle);
  }

}