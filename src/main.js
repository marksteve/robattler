require('./blocks.js');

var Robot = require('./robot');;
var Menu = require('./menu')

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
  this.load.image('body', 'assets/body.png');
  this.load.image('shoulder-arm', 'assets/shoulder-arm.png');
  this.load.image('fore-arm', 'assets/fore-arm.png');
};

App.prototype.create = function() {
  this.game.physics.startSystem(Phaser.Physics.ARCADE);
  this.game.player = new Robot(this.game, 0, this.game.world.bounds.bottom);
  this.game.add.existing(this.game.player);
  this.game.physics.arcade.enable(this.game.player);
};

App.prototype.update = function() {};
App.prototype.render = function() {};
App.prototype.resize = function() {};

// DOM Methods

App.prototype.toggleEdit = function() {
  this.editPane.classList.toggle('toggled');
};

App.prototype.test = function() {
  var code = Blockly.JavaScript.workspaceToCode();
  eval(code);
};

module.exports = (function() {
  var app = new App();
  return app;
})();
