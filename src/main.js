require('./blocks.js');

var Robot = require('./robot');
var Bar = require('./bar');

var App = function() {
  this.game = new Phaser.Game(
    320,
    240,
    Phaser.AUTO,
    'stage',
    {
      init: this.init,
      preload: this.preload,
      create: this.create,
      update: this.update,
      render: this.render,
      resize: this.resize,
    },
    false, // transparent
    false  // antialias
  );
  this.editPane = document.getElementById('edit');
  document.getElementById('toggle-edit')
    .addEventListener('click', this.toggleEdit.bind(this));
  document.getElementById('fight')
    .addEventListener('click', this.startFight.bind(this));
  return this;
};

App.prototype.init = function() {
  this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  this.scale.pageAlignVertically = true;
  this.scale.pageAlignHorizontally = true;
};

App.prototype.preload = function() {
  this.stage.backgroundColor = '#ddd';
  this.stage.disableVisibilityChange = true;
  this.load.image('bg', 'assets/bg.png');
  this.load.image('body', 'assets/body.png');
  this.load.image('shoulder-arm', 'assets/shoulder-arm.png');
  this.load.image('fore-arm', 'assets/fore-arm.png');
  this.load.image('bar', 'assets/bar.png');
  this.load.image('hp', 'assets/hp.png');
  this.load.image('ap', 'assets/ap.png');
  this.load.image('brace', 'assets/brace.png');
};

App.prototype.create = function() {
  this.game.add.sprite(0, 0, 'bg');
  this.game.title = this.game.add.text(
    this.game.world.width / 2,
    this.game.world.height / 2,
    'ROBATTLER', {
      font: '20pt Silkscreen',
      fill: '#66f'
    });
  this.game.title.anchor.set(0.5, 0.5);

  this.game.ai = new Robot(this.game, true);
  this.game.add.existing(this.game.ai);

  this.game.aiHP = new Bar(
    this.game, this.game.ai, 'hp', true);
  this.game.add.existing(this.game.aiHP);
  this.game.aiAP = new Bar(
    this.game, this.game.ai, 'ap', true);
  this.game.add.existing(this.game.aiAP);

  this.game.player = new Robot(this.game);
  this.game.add.existing(this.game.player);
  this.game.playerHP = new Bar(
    this.game, this.game.player, 'hp');
  this.game.add.existing(this.game.playerHP);
  this.game.playerAP = new Bar(
    this.game, this.game.player, 'ap');
  this.game.add.existing(this.game.playerAP);

  this.game.player.move(2);
  this.game.ai.move(2);

  this.game.ai.code = (
    'app.game.ai.addAction("moveForward");' +
    'app.game.ai.addAction("punch");' +
    'app.game.ai.addAction("moveBackward");'
  );
};

App.prototype.update = function() {
  var c = Math.sin(2.5 * this.game.time.totalElapsedSeconds());
  var s = Math.abs(0.2 * c) + 1.5;
  this.game.title.scale.set(s, s);
  this.game.title.angle = 5 * c;
};
App.prototype.render = function() {};

// DOM Methods

App.prototype.toggleEdit = function() {
  this.editPane.classList.toggle('toggled');
};

App.prototype.startFight = function() {
  this.game.title.setText('ROBATTLER');
  this.game.player.hp = 100;
  this.game.player.ap = 10;
  this.game.ai.hp = 100;
  this.game.ai.ap = 10;
  var code = Blockly.JavaScript.workspaceToCode();
  console.log("ROBOT CODE", code);
  this.game.player.code = code;
  this.fight();
};

App.prototype.checkTurn = function() {
  this.tickTurns -= 1;
  if (this.tickTurns === 0) {
    var win = this.game.ai.hp === 0;
    var lose = this.game.player.hp === 0;
    var draw = win && lose;
    if (win || lose || draw) {
      this.game.player.move(2);
      this.game.ai.move(2);
      document.getElementById('fight').style.display = 'inline-block';
      switch (true) {
        case draw:
          return this.game.title.setText('DRAW!');
        case win:
          return this.game.title.setText('YOU WIN!');
        case lose:
          return this.game.title.setText('YOU LOSE');
      }
    }
    this.fight();
  }
};

App.prototype.fight = function() {
  document.getElementById('fight').style.display = 'none';
  this.tickTurns = 2;
  var checkTurn = this.checkTurn.bind(this);
  this.game.player.fight(checkTurn);
  this.game.ai.fight(checkTurn);
};

module.exports = (function() {
  var app = new App();
  return app;
})();
