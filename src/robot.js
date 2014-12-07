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
};

Robot.prototype.move = function(col) {
  this.game.add.tween(this).to(
    {x: col * 64 + 32}, 1000, Phaser.Easing.Quadratic.InOut
  ).start();
  this.game.add.tween(this).to(
    {angle: 45}, 500, Phaser.Easing.Quadratic.InOut
  ).to(
    {angle: 15}, 500, Phaser.Easing.Quadratic.InOut
  ).start();
  this.col = col;
  return this;
};

Robot.prototype.forward = function(col) {
  return this.move(this.col + 1);
};

Robot.prototype.backward = function(col) {
  return this.move(this.col - 1);
};

Robot.prototype.punch = function() {
  this.game.add.tween(this.arm).to(
    {angle: -30}, 200, Phaser.Easing.Back.In
  ).to(
    {angle: -90}, 200, Phaser.Easing.Back.Out
  ).to(
    {angle: -30}, 200, Phaser.Easing.Back.InOut
  ).start();

  this.game.add.tween(this.frArm).to(
    {angle: -120}, 200, Phaser.Easing.Back.In
  ).to(
    {angle: -15}, 200, Phaser.Easing.Back.Out
  ).to(
    {angle: -120}, 200, Phaser.Easing.Back.InOut
  ).start();

  return this;
};

Robot.prototype.hammer = function() {
  this.game.add.tween(this.arm).to(
    {angle: -220}, 200, Phaser.Easing.Back.In
  ).to(
    {angle: -90}, 200, Phaser.Easing.Back.Out, false, 150
  ).to(
    {angle: -30}, 200, Phaser.Easing.Back.InOut, false, 200
  ).start();

  this.game.add.tween(this.frArm).to(
    {angle: 0}, 200, Phaser.Easing.Back.In
  ).to(
    {angle: -30}, 200, Phaser.Easing.Back.Out, false, 150
  ).to(
    {angle: -120}, 200, Phaser.Easing.Back.InOut, false, 200
  ).start();

  return this;
};

module.exports = Robot;
