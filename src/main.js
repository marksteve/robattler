var Robot = require('./robot');

var App = function() {
  this.game = new Phaser.Game(
    320,
    240,
    Phaser.AUTO,
    '',
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
  return this;
};

App.prototype.init = function() {
  this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  this.scale.pageAlignVertically = true;
  this.scale.pageAlignHorizontally = true;
};

App.prototype.preload = function() {
  this.game.stage.backgroundColor = '#ddd';
  this.game.load.image('body', 'assets/body.png');
  this.game.load.image('shoulder-arm', 'assets/shoulder-arm.png');
  this.game.load.image('fore-arm', 'assets/fore-arm.png');
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

// Actions

App.prototype.move = function(col) {
  this.game.player.oldCol = this.game.player.col;
  this.game.player.col = col;
};

module.exports = (function() {
  var app = new App();
  return app;
})();
