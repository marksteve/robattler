var Bar = function(game, robot, type, right) {
  var x = right ? game.world.bounds.right - 30 : 30;
  var y = type == 'hp' ? 20 : 60;
  Phaser.TileSprite.call(this, game, x, y, 16, 32, 'bar');
  this.width = type == 'hp' ? 100 : 60;

  this.fill = new Phaser.TileSprite(
    this.game, 0, 0, 32, 32, type);
  this.fill.alpha = 0.4;
  this.fill.width = this.width;
  this.addChild(this.fill);

  this.braces = this.game.add.group(this);
  this.braces.create(
    -16, 0, 'brace'
  );
  this.braces.create(
    this.width + 16, 0, 'brace'
  ).scale.x *= -1;

  if (right) {
    this.anchor.set(1, 0);
    this.braces.x -= this.width;
    this.fill.x -= this.width;
  }
};

Bar.prototype = Object.create(Phaser.TileSprite.prototype);
Bar.prototype.constructor = Bar;

module.exports = Bar;
