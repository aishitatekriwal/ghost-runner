var ghost, ghostImg;
var door, doorImg, doorGroup;
var tower, towerImg;
var climber, climberImg, climberGroup;
var block, blockGrp;
var gameState = "PLAY";

function preload()
{
  ghostImg = loadImage("ghost-standing.png");
  doorImg = loadImage("door.png");
  towerImg = loadImage("tower.png");
  climberImg = loadImage("climber.png");
}

function setup()
{
  createCanvas(600,600);
  
  ghost = createSprite(300,100,20,20);
  ghost.addImage("ghost",ghostImg);
  ghost.scale = 0.3;
  
  doorGroup = new Group();
  
  tower = createSprite(300,300,20,20);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  climberGroup = new Group();
  blockGrp = new Group();
}

function draw()
{
  background(0);
  
  if(gameState === "PLAY")
    {
      ghost.depth = ghost.depth + 1;
  
     //scrolling background
     if(tower.y > 400)
     {
       tower.y = 300;
     }
  
     //controls of the ghost
     //up when space is pressed
     if(keyDown("space"))
     {
       ghost.velocityY = -8;
     }
  
     //gravity 
     ghost.velocityY = ghost.velocityY + 0.8;
  
     if(keyDown("RIGHT_ARROW"))
     {
       ghost.x = ghost.x + 5;
     }
      
     if(keyDown("LEFT_ARROW"))
     {
       ghost.x = ghost.x - 5;
     }
      
     // making ghost sit on climber
     if(climberGroup.isTouching(ghost))
     {
       ghost.velocityY = 0;
     }
  
     //making it fall
     if(blockGrp.isTouching(ghost) || ghost.y > 600)
     {
      gameState = "END";
      ghost.destroy();
     }
  
  spawnDoors();
        drawSprites();
    }
   if(gameState === "END")
     {
       fill("yellow");
       textSize(30);
       text("GAME OVER",200,300);
     }
}

function spawnDoors()
{
  if(frameCount % 250 === 0)
    {
      door = createSprite(random(100,400),0,20,20);
      door.addImage("door",doorImg);
      door.velocityY = 1;
      door.lifetime = 600;
      doorGroup.add(door);
      
      climber = createSprite(door.x,55,20,20);
      climber.addImage("climber",climberImg);
      climber.velocityY = 1;
      climber.lifetime = 600;
      climberGroup.add(climber);
      
      block = createSprite(climber.x,50,climber.width,1);
      block.visible = true;
      block.lifetime = 600;
      block.velocityY = 1;
      blockGrp.add(block);
    }
}
