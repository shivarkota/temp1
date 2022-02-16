var ship;

var shipImg,bgImg,waterImg, helicopterImg,bombImg,gameOverImg;

var water;

var helicopterGroup, bombGroup;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var score = 0;
var music;


function preload(){

    shipImg = loadAnimation("images/ship.png","images/ship2.png","images/ship.png");
    gameOverImg = loadAnimation("images/gameOver.png");

    bgImg = loadImage("images/skybg.jpg");
    waterImg = loadImage("images/waterbg.png");
    helicopterImg = loadImage("images/helicopter.png");
    bombImg = loadImage("images/bomb.png");

    music = loadSound("images/birds.mp3");


}

function setup(){
    createCanvas(800,500);

    


    water = createSprite(400,380,200,20);
    water.addImage("water",waterImg);
    water.velocityX = -2;
   // water.debug = true;
    water.x = water.width/2;

    ship = createSprite(200,320,50,50);
    ship.addAnimation("ship",shipImg);
    ship.addAnimation("gameOver",gameOverImg);
    ship.scale = 0.4;

    helicopterGroup = new Group();
    bombGroup = new Group();


    

}

function draw(){
    background(bgImg);
    textSize(20);
    fill("yellow");
    text("Score: "+score,650,50);

    //console.log(water.x);
   // console.log(water.width);

    if(gameState === PLAY) {

        music.play();

      score = Math.round(frameCount/6);
      //score = frameCount;

        if(water.x < 300) {
            water.x = water.width/2;
        }


        if(keyDown("left") && ship.x > 60) {
            ship.x = ship.x - 5;
        }
    
        if(keyDown("right") && ship.x < 750) {
            ship.x = ship.x + 5;
        }

        spawnHelicopters();

        if(bombGroup.isTouching(ship)) {
            gameState = END;
        }


    } else if(gameState === END) {
        water.velocityX = 0;
        helicopterGroup.destroyEach();
        bombGroup.destroyEach();

        ship.changeAnimation("gameOver",gameOverImg);
        ship.x = 400;
    }




   

    

    // var n = Math.round(random(1,20));
    // console.log(n);

    console.log(frameCount);

    

    drawSprites();

}


function spawnHelicopters() {

    if(frameCount % 150 === 0) {
        var xPos = Math.round(random(50,750));
        var helicopter = createSprite(xPos,40,20,20);
        helicopter.addImage("helicopter",helicopterImg);
        helicopter.scale = 0.4;
        helicopter.velocityX = -4;
        helicopterGroup.add(helicopter);

        helicopter.lifetime = 200;


        var bomb = createSprite(helicopter.x, 40,10,10);
        bomb.addImage("bomb",bombImg);
        bomb.scale = 0.1;
        bomb.velocityY = 4;
        bombGroup.add(bomb);
        bomb.lifetime = 150;




    }

    
}
