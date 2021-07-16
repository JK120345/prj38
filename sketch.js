 var path,boy;
var pathImg,boyRun,boyFall;

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;
var pinkSP,YellowSP;
var gameover;
var YellowFall,pinkFall;
var pg,yg;

function preload(){
  pathImg = loadImage("images/Road.png");
  boyRun = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
  boyFall=loadAnimation("images/mainPlayer3.png");
  pcy=loadAnimation("opponent1.png","opponent2.png");
  ylcy=loadAnimation("opponent4.png","opponent5.png");
  gameoverimg=loadImage("gameOver.png");
  pinkFall=loadAnimation("opponent3.png");
  YellowFall=loadAnimation("opponent6.png");
  cycleBell = loadSound("sound/bell.mp3");
  
}

function setup(){
  
createCanvas(1200,300);
  
// Moving background
path=createSprite(100,150);
path.addImage(pathImg);
path.velocityX = -5;

//creating boy running
boy  = createSprite(70,150,20,20);
boy.addAnimation("SahilRunning",boyRun);
boy.scale=0.07;
  
  gameover=createSprite (650,150);
  gameover.addImage(gameoverimg);
  gameover.scale=0.8;
  gameover.visible=false;
  
  //creating groups of opponent players
  pg=createGroup();
  yg=createGroup();
}

function draw() {
  background(0);
  
  drawSprites();
  
  textSize(20);
  fill(255);
  text("Distance: "+ distance,350,30);
  
  

//pinkSP.velocityX=-(6+2*distance/150);
// YellowSP.velocityX=-(6+2*distance/150);
  
camera.position.x=boy.x;
camera.position.y=boy.y;

  if(gameState===PLAY){
    
    distance=distance+Math.round(getFrameRate()/50);
    path.velocityX=-(6+2*distance/150);
    
     boy.y = World.mouseY;
  
   edges= createEdgeSprites();
   boy.collide(edges);
  
  //code to reset the background
  if(path.x < 0 ){
    path.x = width/2;
  }
   
    var select_oppPlayer=Math.round(random(1,2));
    console.log(select_oppPlayer);
    if(World.frameCount%150===0){
      if(select_oppPlayer===1){
      pinkFn();
      }
    else{
      yellowFn();
      }
      
    }
      //code to play cycle bell sound
  if(keyDown("space")) {
    cycleBell.play();
  }
    
    if(pg.isTouching(boy) ){
      gameState=END;
      //pinkSP.addImage(pinkFall);
      
      //boy.velocityY=0;
      pinkSP.velocityY=0;
      pinkSP.addAnimation("pRun",pinkFall);
    }
        
    if(yg.isTouching(boy) ){
      gameState=END;
      //YellowSP.addImage(YellowFall);
      
      //boy.velocityY=0;
      YellowSP.velocityY=0;
      YellowSP.addAnimation("yRun",YellowFall);
    }
        
    
  }
    else if(gameState === END){
      gameover.visible=true;
     textSize(20);
      fill(255);
      text("press up arrow to restart thr game",500,200);
      path.velocityX=0;
      boy.velocityY=0;
      boy.addAnimation("SahilRunning",boyFall)
      pg.setVelocityXEach(0);
      yg.setVelocityXEach(0);
      
      pg.setLifetimeEach(-1);
      yg.setLifetimeEach(-1);
      
      if(keyDown("UP_ARROW")){
      reset();
    }
    }
    
  
    
 }

function pinkFn(){
 console.log("pink");
  pinkSP=createSprite(1100,Math.round(random(150,250),10,10));
  //pinkSP.shapeColor="red";
  pinkSP.addAnimation("pRun",pcy);
  pinkSP.setLifetime=170;
   pinkSP.scale=0.05;
   pinkSP.velocityX=-(6 + 2*distance/150);
   pg.add(pinkSP);
}
function yellowFn(){
  YellowSP=createSprite(1100,Math.round(random(150,250),10,10));
  YellowSP.addAnimation("yRun",ylcy);
  YellowSP.scale=0.05;
  YellowSP.setLifetime=170;
  YellowSP.velocityX=-(6 + 2*distance/150);
 yg.add(YellowSP);
}
function reset(){
  gameState=PLAY;
  gameover.visible=false;
  boy.addAnimation("SahilRunning",boyRun);
  
  pg.destroyEach();
  yg.destroyEach();
  
  distance=0;
  
}