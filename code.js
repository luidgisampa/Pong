

var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":["a0c0cf95-9367-425f-9ed4-8ecf09029ef9"],"propsByKey":{"a0c0cf95-9367-425f-9ed4-8ecf09029ef9":{"name":"soccer_yellow_1","sourceUrl":null,"frameSize":{"x":30,"y":30},"frameCount":1,"looping":true,"frameDelay":12,"version":"xT69JmdZqW.kAVdufUlOsyUqcItDLaiM","categories":["sports"],"loadedFromSource":true,"saved":true,"sourceSize":{"x":60,"y":60},"rootRelativePath":"assets/a0c0cf95-9367-425f-9ed4-8ecf09029ef9.png"}}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

//var and createSprite
var ball = createSprite(400,200,10,10);
ball.setAnimation("soccer_yellow_1");


var playerPaddle = createSprite(790,200,10,100);
playerPaddle.shapeColor = "white";


var playerRobot = createSprite(10,200,10,100); 
playerRobot.shapeColor = "white";
//var and Armazenament of score and gamestate
var gameState = "serve";

var compScore = 0;
var playerScore = 0;

//Edges
createEdgeSprites();
  
function draw() {
  //Background
  background("black");
  //text
  textSize(20);
  
  //coloque o texto de informação no centro
  if (gameState == "serve") {
    text("Clique do mouse para começar",260,300);
  }
  //show the score.
  text(compScore, 360,20);
  text(playerScore, 420,20);
  
  //Movimetion of paddlePlayer.
  playerPaddle.y = World.mouseY;
  
  //IA para o raquete do computador
  //faça-a se mover com a posição y da bola
  playerRobot.y = ball.y;
  
  //bounceOff Edge
  ball.bounceOff(topEdge);
  ball.bounceOff(bottomEdge);
  //bounceOff Players.
  ball.bounceOff(playerPaddle);
  ball.bounceOff(playerRobot);

  //reinicie a bola no centro se ela cruzar a tela
  if(ball.x > 800 || ball.x <0) {
    
    if(ball.x > 800) {
      compScore = compScore + 1; //aumentar a pontuação do computador
    }
    
    if(ball.x < 0) {
      playerScore = playerScore + 1; //aumentar a pontuação do jogador
    }
    
    reset();
    gameState = "serve";
  }
  
  if (playerScore == 5 || compScore == 5){
    gameState = "over";
    text("Fim de Jogo!",400,200);
  }
  for (var i = 0; i < 4; i++) {
    ball.velocityX = ball.velocityX * 1.0005;
    ball.velocityY = ball.velocityY * 1.0005;
  }
  
  
  drawSprites();
    ball.velocityX = ball.velocityX;
    ball.velocityY = ball.velocityY;

  }

  document.addEventListener('click', function() {
    ball.velocityX = 3;
    ball.velocityY = 4;
    gameState = "play";
  });

function reset() {
  ball.x = 200;
  ball.y = 200;
  ball.velocityX = 0;
  ball.velocityY = 0;
}

// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
