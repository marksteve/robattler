function dot(game, parent) {
  var g = game.add.graphics(parent.x, parent.y);
  g.beginFill(0xFF33FF);
  g.drawRect(0, 0, 1, 1);
  g.endFill();
  parent.add(g);
}

var Robot = function(game, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'body');

  this.initX = x;
  this.initY = y - 24;
  this.angle = 15;

  this.arenaX = 0;
  this.hp = 100;
  this.ap = 10;
  this.maxAP = 15;

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
  this.position.set(this.initX, this.initY);

  return this;
};

Robot.prototype = Object.create(Phaser.Sprite.prototype);
Robot.prototype.constructor = Robot;

Robot.prototype.update = function() {
  // Hover
  var dy = 4 * Math.sin(5 * this.game.time.totalElapsedSeconds());
  this.position.y = this.initY + dy;
};

Robot.prototype.move = function(arenaX) {
  if (arenaX < 0 || arenaX > 4) {
    return;
  }
  this.game.add.tween(this).to(
    {x: arenaX * 30 + this.initX}, 1000, Phaser.Easing.Quadratic.InOut
  ).start();
  this.game.add.tween(this).to(
    {angle: 30}, 500, Phaser.Easing.Quadratic.InOut
  ).to(
    {angle: 15}, 500, Phaser.Easing.Quadratic.InOut
  ).start();
  this.arenaX = arenaX;
  return this;
};

Robot.prototype.moveForward = function(arenaX) {
  return this.move(this.arenaX + 1);
};

Robot.prototype.moveBackward = function(arenaX) {
  return this.move(this.arenaX - 1);
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
