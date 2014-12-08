var Bar = function(game, robot, type, right) {
  var x = right ? game.world.bounds.right - 30 : 30;
  var y = type == 'hp' ? 20 : 40;
  Phaser.TileSprite.call(this, game, x, y, 32, 16, 'bar');
  this.width = type == 'hp' ? 100 : 40;
  this.type = type;
  this.robot = robot;

  this.fill = new Phaser.TileSprite(
    game, 0, 0, 16, 16, type);
  this.fill.alpha = 0.4;
  this.fill.width = 0;
  this.addChild(this.fill);

  this.braces = game.add.group(this);
  this.braces.create(
    -16, 0, 'brace'
  );
  this.braces.create(
    this.width + 16, 0, 'brace'
  ).scale.x *= -1;

  if (right) {
    this.anchor.x = 1;
    this.fill.anchor.x = 1;
    this.braces.x -= this.width;
  }
};

Bar.prototype = Object.create(Phaser.TileSprite.prototype);
Bar.prototype.constructor = Bar;
Bar.prototype.update = function() {
  var max = this.type == 'hp' ? 100 : 15;
  this.fill.width = this.width * this.robot[this.type] / max;
};

module.exports = Bar;
