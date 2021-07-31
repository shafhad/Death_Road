var bg,bgImg;
var zombie,zombieImg;
var knight,knightImg;
var stone,stoneImg;
var stoneGroup;
var  gameOver,gameOverImg;
var PLAY=1;
var END=0;
var gameState=PLAY;
var knightWalking,knightStop;
var ground 
var restartImg,restart;
var snake ,snakeImg;
var bat , batImg;


function preload(){
  
zombieImg= loadImage ("zombie.png");
bgImg= loadImage ("bg.png");
knightWalking= loadAnimation("knight1.png","knight2.png");
//girlStop=loadAnimation("girl2.png");
stoneImg=loadImage("stone.png");
gameOverImg=loadImage("gameOver.png");
restartImg=loadImage("restart.png");
snakeImg=loadImage("snake2.png");
batsImg=loadImage("bat.png");

}

function setup() {
  
  createCanvas (windowWidth,windowHeight);
  
  bg=createSprite(width/2,height/2,width,height);
  bg.addImage(bgImg);
  bg.scale=4;
  bg.velocityX=-3;
  ground=createSprite(width/2,height-10,width,30);
  ground.visible=false;

  knight=createSprite(350,height-50,50,50);
  knight.addAnimation("walking",knightWalking);
 // knight.addAnimation("stop",girlStop);
  knight.scale=0.40;
  knight.debug=false;
  knight.setCollider("rectangle",25,0,240,550)
  
  zombie=createSprite(100,550,20,20);
  zombie.addImage(zombieImg);
  zombie.scale=0.6;
  
  gameOver=createSprite(width/2,height/2,20,20);
  gameOver.addImage(gameOverImg);

  restart=createSprite(width/2,height/2+100,30,30);
  restart.addImage(restartImg);
  restart.scale=0.15

  
  
  
  stoneGroup=new Group();
  batsGroup=new Group();
  
 
}

function draw() {
  background(0)

  if(mousePressedOver(restart)) {
    bg.velocityX=-3;
    reset();
  }
  
 if(gameState===PLAY){
   gameOver.visible=false;
   restart.visible=false;
  
  
  
  
  if(bg.x<width/2-100){
    bg.x=width/2
  }
  if(keyDown("space")){
   //knight.addAnimation("walking",knightlWalking)
    knight.velocityY=-20;
  }
  knight.velocityY = knight.velocityY+0.8;
  edges=createEdgeSprites();
  knight.collide(edges[3]);
   zombie.collide(edges[3]);
  
  

  
  
  spawnStones();
  spawnBats();
  if(stoneGroup.isTouching(zombie)){
     
    zombie.velocityY=-25
    
  }
  zombie.velocityY=zombie.velocityY+1
  if (stoneGroup.isTouching(knight)||batsGroup.isTouching(knight)){
    //girl.addAnimation("stop",girlStop);
      gameState=END;
      
        
      }
 }
  
  else if(gameState===END){
    
    bg.velocityX=0;
    knight.velocityY=0
    zombie.velocityY=0;
    gameOver.visible=true;
    restart.visible=true;

   
    
    
  }
  drawSprites();
  
}

function reset (){

gameState=PLAY;
stoneGroup.destroyEach();
batsGroup.destroyEach();
stoneGroup.setVelocityXEach(-0);
batsGroup.setVelocityXEach(-0);
gameOver.visible=false;
restart.visible=false;




}

function spawnStones (){
  
  if(frameCount%250===0) {
  stone=createSprite(width,height-30,20,20);
  stone.setCollider("rectangle",0,0,150,250);
  var rand=Math.round(random(1,2));
  switch(rand){

    case 1:stone.addImage(stoneImg);
    break;
    case 2:stone.addImage(snakeImg);
    break;
    default:break;
  }
  
  stone.scale=0.3;
  stone.debug=false;
  stone.velocityX=-3;
  stone.lifetime=400;
  
  stoneGroup.add(stone);
  } 

}
function spawnBats(){

  if (frameCount%150===0){

    bats=createSprite(width,70,50,50);
    bats.addImage(batsImg);
    bats.debug=false;
    bats.setCollider("rectangle",0,0,250,250)
    bats.scale=0.4;
    bats.velocityX=-5;
    bats.lifetime=200
    batsGroup.add(bats);
    
  }

}







