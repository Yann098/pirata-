const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world, backgroundImg;
var canvas, tower, ground, cannon;
var angle = 20;
var cannonBall;
var balls = [];
var boats = [];

let boatAnimation = [];
let boatSpriteData, boatSpriteSheet;

let brokenBoatAnimation = [];
let brokenBoatSpriteData, brokenBoatSpriteSheet;

let ballAnimation = [];
let ballSpriteData, ballSpriteSheet;

let waterSound,pirateSound,backgroundSound,cannonSound;

let isGameOver = false
let isLaughing = false



function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");
  boatSpriteData = loadJSON("./assets/boat/boat.json");
  boatSpriteSheet = loadImage("./assets/boat/boat.png");
  brokenBoatSpriteData = loadJSON("./assets/boat/broken_boat.json");
  brokenBoatSpriteSheet = loadImage("./assets/boat/broken_boat.png");
  ballSpriteData = loadJSON("./assets/water_splash/water_splash.json");
  ballSpriteSheet = loadImage("./assets/water_splash/water_splash.png");
  waterSound = loadSound ("./assets/cannon_water.mp3");
  pirateSound = loadSound ("./assets/pirate_laugh.mp3");
  cannonSound = loadSound ("./assets/cannon_explosion.mp3");
  backgroundSound = loadSound ("./assets/background_music.mp3");

}

function setup() {
  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;

  var options = {
    isStatic: true,
  };

  ground = Bodies.rectangle(0, height - 1, width * 2, 1, options);
  World.add(world, ground);

  tower = Bodies.rectangle(160, 350, 160, 310, options);
  World.add(world, tower);

  angleMode(DEGREES);
  angle = 15;
  cannon = new Cannon(180, 110, 150, 150, angle);

  let boatFrames = boatSpriteData.frames;
  for (let i = 0; i < boatFrames.length; i++) {
    let pos = boatFrames[i].position;
    let img = boatSpriteSheet.get(pos.x, pos.y, pos.w, pos.h);
    boatAnimation.push(img);
  }
  let brokenBoatFrames = brokenBoatSpriteData.frames;
  for (let i = 0; i < brokenBoatFrames.length; i++) {
    let pos = brokenBoatFrames[i].position;
    let img = brokenBoatSpriteSheet.get(pos.x, pos.y, pos.w, pos.h);
    brokenBoatAnimation.push(img);
  }
  let ballFrames = ballSpriteData.frames;
  for (let i = 0; i < ballFrames.length; i++) {
    let pos = ballFrames[i].position;
    let img = ballSpriteSheet.get(pos.x, pos.y, pos.w, pos.h);
    ballAnimation.push(img);
  }
}

function draw() {
  image(backgroundImg, 0, 0, width, height);
  if (!backgroundSound.isPlaying()) {
    backgroundSound.play()
    backgroundSound.setVolume(0.1)

  }
  Engine.update(engine);
  rect(ground.position.x, ground.position.y, width * 2, 1);
  push();
  imageMode(CENTER);
  image(towerImage, tower.position.x, tower.position.y, 160, 310);
  pop();


  cannon.display();
  showBoats();

  for (var i = 0; i < balls.length; i++) {
    showCannonBalls(balls[i], i);
    colisionWithBoat(i)
  }
}

function colisionWithBoat(index) {
  for (let i = 0; i < boats.length; i++) {
    if (balls[index] !== undefined && boats[i] !== undefined) {
      let colision = Matter.SAT.collides(balls[index].body, boats[i].body);
      if (colision.collided) {
        boats[i].remove(i);
        Matter.World.remove(world, balls[index].body);
        delete balls[index];
      }
    }
  }
}

function keyReleased() {
  if (keyCode == DOWN_ARROW) {
    balls[balls.length - 1].shoot();
  }
}

function keyPressed() {
  if (keyCode == DOWN_ARROW) {
    var cannonBall = new CannonBall(cannon.x, cannon.y);
    balls.push(cannonBall);
  }
}

function showCannonBalls(ball, index) {
  if (ball) {
    ball.display();
    ball.animate ();
    if (ball.body.position.x>=width||ball.body.position.y>=height-50) {
      ball.remove(index)
    }
  }
}

function showBoats() {
  if (boats.length > 0) {
    if (
      boats[boats.length - 1] === undefined ||
      boats[boats.length - 1].body.position.x < width - 300
    ) {
      if (!) {
        
      }
      var positions = [-40, -60, -70, -20];
      var position = random(positions);
      var boat = new Boat(
        width - 79,
        height - 60,
        170,
        170,
        position,
        boatAnimation
      );
      boats.push(boat);
    }

    for (let i = 0; i < boats.length; i++) {
      if (boats[i]) {
        Matter.Body.setVelocity(boats[i].body, { x: -0.9, y: 0 });
        boats[i].display();
        boats[i].animate();
        let collision = Matter.SAT.collides (this.tower,boats[i].body)
        if (collision.collided&& !boats[i].isBroken) {
        if (!isLaughing&& !pirateSound.isPlaying()) {
        pirateSound.play()
        isLaughing = true
        }
        isGameOver = true
        gameOver()
        }
      }
    }
  } else {
    var boat = new Boat(width - 79, height - 60, 170, 170, -80, boatAnimation);
    boats.push(boat);
  }
}
function gameOver(){
swal ({
title : "fim de jogo",
text : "obrigado por jogar",
imageUrl: "https://raw.githubusercontent.com/whitehatjr/PiratesInvasion/main/assets/boat.png",
imageSize : "150x150",
confirmBottomText : "jogar novamente?"

},function (isConfirm){
if (isConfirm) {
  location.reload ()
}
})

}