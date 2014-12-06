function dot(game, parent) {
  var g = game.add.graphics(parent.x, parent.y);
  g.beginFill(0xFF33FF);
  g.drawRect(0, 0, 1, 1);
  g.endFill();
  parent.add(g);
}

var Robot = function(game, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'body');

  // Arm
  this.arm = this.game.add.group(this);
  this.arm.position.set(12, 13);
  this.arm.pivot.set(7, 7);
  this.arm.angle -= 30;
  this.shArm = this.arm.create(
    0, 0, 'shoulder-arm'
  );
  this.frArm = this.arm.create(
    7, 30, 'fore-arm'
  );
  this.frArm.anchor.set(0.5, 0.18);
  this.frArm.angle -= 120;

  this.pivot.set(16, 48);
  this.position.set(x + 32, y - 24);

  this.oldCol = 0;
  this.col = 0;
  this.angle = 15;

  return this;
};

Robot.prototype = Object.create(Phaser.Sprite.prototype);
Robot.prototype.constructor = Robot;

Robot.prototype.update = function() {
  // Hover
  var dy = 0.3 * Math.sin(5 * this.game.time.totalElapsedSeconds());
  this.position.y += dy;
  // Move
  var d = 64 * this.col - this.x + 32;
  this.body.velocity.x = d;
  if (this.oldCol !== this.col) {
    this.angle = Math.sin(
      Math.PI * d / (64 * (this.oldCol - this.col))
    ) * 45 + 15;
  }
};

module.exports = Robot;
