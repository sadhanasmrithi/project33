const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;

var snowImg, snowManImg, snowBallImg, boy2Img, girl1Img;
var girl1, boy2, snowMan, snowBall;
var engine, world;
var maxFlakes = 2;
var flakes = [];
var snowCreatedFrame = 0;
var slingShot;
var snowFallingMusic;

function preload() {
  snowImg = loadImage("snow1.jpg");
  snowManImg = loadImage("snowman1.jpg");
  snowBallImg = loadImage("snowball.png");
  boy1Img = loadImage("boy2.jpg");
  girl1Img = loadImage("girl1.png");
  snowFallingMusic = loadSound("JoyMusic.mp3");

}

function setup() {
  createCanvas(1280,720);
  snowFallingMusic.loop();
  engine = Engine.create();
  world = engine.world;
  Engine.run(engine);
  snowMan = createSprite(900, 470);
  snowMan.addImage("snowman1",snowManImg);
  snowMan.scale = 0.4;

  boy1 = createSprite(700, 600);
  boy1.addImage("boy2",boy1Img);
  boy1.scale = 0.5;

  girl1 = createSprite(300, 600);
  girl1.addImage("girl1", girl1Img);
  girl1.scale = 0.4;

  snowBall = Bodies.circle(240,560,20);
  World.add(world,snowBall);

  if(frameCount % 1 === 0){
    for(var i=0; i<maxFlakes; i++){
        flakes.push(new snowFlake(random(0,1280), random(0,7)));
    }
}
slingShot = new SlingShot(this.snowBall,{x:240,y:520});
}

function draw() {
  background(snowImg); 
  textSize(30);
  fill("black");
  text("Drag the snowball to hit the boy", 400, 30);
  text("Press Space key to return the snowball to its own position", 250, 60);
  drawSprites();
  slingShot.display();
  Engine.update(engine);
  imageMode(CENTER)
  image(snowBallImg ,snowBall.position.x,snowBall.position.y,40,40);
  for(var i = 0; i<maxFlakes; i++){
    flakes[i].showFlake();
    flakes[i].updateY();
}
}
function mouseDragged(){
  Matter.Body.setPosition(this.snowBall,{x:mouseX,y:mouseY});
}
function mouseReleased(){
  slingShot.fly();
}
function keyPressed(){
  if(keyCode === 32){
      slingShot.attach(this.snowBall);
  }
}