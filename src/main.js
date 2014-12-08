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
  document.getElementById('test')
    .addEventListener('click', this.test.bind(this));
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

  this.game.enemy = new Robot(this.game, true);
  this.game.add.existing(this.game.enemy);

  this.game.enemyHP = new Bar(
    this.game, this.game.enemy, 'hp', true);
  this.game.add.existing(this.game.enemyHP);
  this.game.enemyAP = new Bar(
    this.game, this.game.enemy, 'ap', true);
  this.game.add.existing(this.game.enemyAP);

  this.game.player = new Robot(this.game);
  this.game.add.existing(this.game.player);
  this.game.playerHP = new Bar(
    this.game, this.game.player, 'hp');
  this.game.add.existing(this.game.playerHP);
  this.game.playerAP = new Bar(
    this.game, this.game.player, 'ap');
  this.game.add.existing(this.game.playerAP);

  this.game.player.move(2);
  this.game.enemy.move(2);

  this.game.enemy.code = (
    'app.game.enemy.addAction("moveForward");' +
    'app.game.enemy.addAction("punch");' +
    'app.game.enemy.addAction("moveBackward");'
  );
};

App.prototype.update = function() {};
App.prototype.render = function() {};

// DOM Methods

App.prototype.toggleEdit = function() {
  this.editPane.classList.toggle('toggled');
};

App.prototype.test = function() {
  var code = Blockly.JavaScript.workspaceToCode();
  console.log("ROBOT CODE", code);
  this.game.player.code = code;
  this.fightTilDeath();
};

App.prototype.checkTurn = function() {
  this.tickTurns -= 1;
  if (this.tickTurns === 0) {
    this.fightTilDeath();
  }
};

App.prototype.fightTilDeath = function() {
  this.tickTurns = 2;
  var checkTurn = this.checkTurn.bind(this);
  this.game.player.fight(checkTurn);
  this.game.enemy.fight(checkTurn);
};

module.exports = (function() {
  var app = new App();
  return app;
})();
