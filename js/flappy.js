var width = 790;
var height = 400;
var game = new Phaser.Game(width, height, Phaser.AUTO, 'game', stateActions);
var score = -2;
var labelscore;
var player;
var gameGravity = 580;
var pipeInterval = 1.75 * Phaser.Timer.SECOND;
var jumpPower = -200;
var pipeGap = 100;
var pipes = [];

function preload() {
  game.load.image('playerimg','../assets/flappy.png');
  game.load.audio('score','../assets/point.ogg');
  game.load.image("pipeBlock","../assets/pipe.png");
}



function create() {
    // set the background colour of the scene
    game.stage.setBackgroundColor('#0066ff');
    // game.input.onDown.add(click);
    // game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(space);

    labelScore=game.add.text(20,20,"0");
    player = game.add.sprite(100,200,"playerimg");

    player.anchor.setTo(0.5,0.5)
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.enable(player);
    player.body.gravity.y = gameGravity;
    game.input.keyboard
    .addKey(Phaser.Keyboard.SPACEBAR)
    .onDown.add(playerJump)

    game.time.events.loop(pipeInterval, generatePipe);

function click(event){

  labelScore=game.add.text(event.x,event.y-20,score);
  game.add.sprite(event.x,event.y,'playerimg');
  game.sound.play("score");
  changeScore();
}




function moveRight(){
  player.x = player.x + 10;
}
function moveLeft(){
  player.x = player.x - 10;
}
function moveUp(){
  player.y = player.y - 10;

}
function moveDown(){
  player.y = player.y + 10;
}
 */
 function changeScore() {
  score +=1;
  labelScore.setText(score.toString());
}
 function playerJump(){
   player.body.velocity.y = jumpPower;
 }


function generatePipe(){
  var gapStart = game.rnd.integerInRange(1, 5);
  for(var count=0; count<8; count+=1){
    if (count != gapStart && count != gapStart + 1){
      addPipeBlock(width-50,50*count);
    }
  }
  changeScore();
}

function addPipeBlock(x,y){
  var block = game.add.sprite(x, y, "pipeBlock");
  pipes.push(block);
  game.physics.arcade.enable(block);
  block.body.velocity.x = -200;
}
function update() {
  game.physics.arcade.overlap(player,pipes,gameOver);
  if (player.y<=0 || player.y>=height){
      gameOver();
    }
}
function gameOver(){
  alert("Game over. Your score is:"+score)
  location.reload();
}

function changeScore(){
  score ++;
labelScore.setText(score.toString());
}
