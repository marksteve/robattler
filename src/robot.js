function dot(game, parent) {
  var g = game.add.graphics(parent.x, parent.y);
  g.beginFill(0xFF33FF);
  g.drawRect(0, 0, 1, 1);
  g.endFill();
  parent.add(g);
}

var Robot = function(game, ai) {
  this.initX = ai ? 310 : 10;
  this.initY = game.world.bounds.bottom - 24;

  Phaser.Sprite.call(this, game, this.initX, this.initY, 'body');

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

  // Body
  this.angle = 15;
  this.pivot.set(16, 48);

  this.arenaX = 0;
  this.hp = 100;
  this.ap = 10;
  this.maxAP = 15;
  this.ai = ai;
  this.actions = [];

  // AI
  if (this.ai) {
    this.scale.x *= -1;
    this.angle *= -1;
  }

  return this;
};

Robot.prototype = Object.create(Phaser.Sprite.prototype);
Robot.prototype.constructor = Robot;

Robot.prototype.update = function() {
  // Hover
  var dy = 4 * Math.sin(5 * this.game.time.totalElapsedSeconds());
  this.position.y = this.initY + dy;
};

// Control

Robot.prototype.addAction = function() {
  this.actions.push(
    Array.prototype.slice.call(arguments, 0)
  );
  return this;
};

Robot.prototype.doActions = function(actions, done) {
  if (actions.length === 0) {
    return done.call(this);
  }
  var action = actions.shift();
  var func = this[action.shift()];
  if (this.ap - func.cost < 0) {
    return done.call(this);
  }
  func.apply(this, action.concat(function(success) {
    if (success !== false) {
      this.ap -= func.cost;
    }
    if (func.dmg && func.dmg > 0) {
      if (this.enemyDist() <= func.reqDist) {
        var enemy = this.game[
          this.ai ? 'player' : 'ai'
        ];
        enemy.hp -= func.dmg;
        enemy.hp = enemy.hp < 0 ? 0 : enemy.hp;
        enemy.hurt();
      }
    }
    this.doActions(actions, done);
  }));
  return this;
};

Robot.prototype.fight = function(done) {
  this.actions = [];
  eval(this.code);
  this.doActions(this.actions, function() {
    this.actions = [];
    this.ap += 10;
    this.ap = this.ap > 0 ? 15 : this.ap;
    return done();
  });
  return this;
};

// Stats

Robot.prototype.enemyDist = function() {
  return 8 - this.game[
    this.ai ? 'player' : 'ai'
  ].arenaX - this.arenaX;
};

// Actions

Robot.prototype.move = function(arenaX, next) {
  next = next || function() {};
  var maxArenaX = 8 - this.game[
    this.ai ? 'player' : 'ai'
  ].arenaX;
  if (arenaX < 0 || arenaX > maxArenaX) {
    next.call(this, false);
    return;
  }
  var f = this.ai ? -1 : 1;
  this.game.add.tween(this).to(
    {angle: f * 30}, 500, Phaser.Easing.Quadratic.InOut
  ).to(
    {angle: f * 15}, 500, Phaser.Easing.Quadratic.InOut
  ).start();

  var newX = this.initX + f * arenaX * 30;
  this.game.add.tween(this).to(
    {x: newX}, 1000, Phaser.Easing.Quadratic.InOut
  ).start().onComplete.add(next, this);

  this.arenaX = arenaX;
  return this;
};

Robot.prototype.moveForward = function(next) {
  return this.move(this.arenaX + 1, next);
};
Robot.prototype.moveForward.cost = 5;

Robot.prototype.moveBackward = function(next) {
  return this.move(this.arenaX - 1, next);
};
Robot.prototype.moveBackward.cost = 5;

Robot.prototype.punch = function(next) {
  next = next || function() {};
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
  ).start().onComplete.add(next, this);

  return this;
};
Robot.prototype.punch.cost = 5;
Robot.prototype.punch.dmg = 6;
Robot.prototype.punch.reqDist = 1;

Robot.prototype.hammer = function(next) {
  next = next || function() {};
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
  ).start().onComplete.add(next, this);

  return this;
};
Robot.prototype.hammer.cost = 10;
Robot.prototype.hammer.dmg = 12;
Robot.prototype.hammer.reqDist = 1;

// Reaction
Robot.prototype.hurt = function() {
  var f = this.ai ? -1 : 1;
  this.game.add.tween(this).to(
    {angle: f * 0}, 500, Phaser.Easing.Quadratic.InOut
  ).to(
    {angle: f * 15}, 500, Phaser.Easing.Quadratic.InOut
  ).start();
};

module.exports = Robot;
