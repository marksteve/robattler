// Movement

Blockly.Blocks.move_forward = {
  init: function() {
    this.setColour(290);
    this.appendDummyInput()
        .appendField("forward");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');   this.setTooltip('');
  }
};

Blockly.JavaScript.move_forward = function() {
  return 'app.game.player.addAction("moveForward");';
};

Blockly.Blocks.move_backward = {
  init: function() {
    this.setColour(290);
    this.appendDummyInput()
        .appendField("backward");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.JavaScript.move_backward = function() {
  return 'app.game.player.addAction("moveBackward");';
};

Blockly.Blocks.rotate = {
  init: function() {
    this.setColour(290);
    this.appendValueInput("ROTATE")
        .setCheck("Number")
        .appendField("rotate")
        .appendField(new Blockly.FieldDropdown([["shoulder", "SHOULDER"], ["elbow", "ELBOW"], ["laser", "LASER"]]), "PART");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.JavaScript.rotate = function(block) {
  var value_rotate = Blockly.JavaScript.valueToCode(block, 'ROTATE', Blockly.JavaScript.ORDER_ATOMIC);
  var dropdown_part = block.getFieldValue('PART');
  return 'app.game.player.rotate("' + dropdown_part + '", ' + value_rotate + ');';
};

// Arm

Blockly.Blocks.punch = {
  init: function() {
    this.setColour(20);
    this.appendDummyInput()
        .appendField("punch");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.JavaScript.punch = function() {
  return 'app.game.player.addAction("punch");';
};

Blockly.Blocks.hammer = {
  init: function() {
    this.setColour(20);
    this.appendDummyInput()
        .appendField("hammer");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.JavaScript.hammer = function() {
  return 'app.game.player.addAction("hammer");';
};

// Stats

function stats(name, title, varName, color) {
  Blockly.Blocks[name] = {
    init: function() {
      this.setColour(color);
      this.appendDummyInput()
          .appendField(title);
      this.setOutput(true);
      this.setTooltip('');
    }
  };

  Blockly.JavaScript[name] = function() {
    return [varName, Blockly.JavaScript.ORDER_NONE];
  };
}

stats('self_hp', 'your hp', 'app.game.player.hp', 20);
stats('self_ap', 'your ap', 'app.game.player.ap', 210);
stats('self_pos', 'your position', 'app.game.player.arenaX', 120);
stats('enemy_hp', 'enemy hp', 'app.game.enemy.hp', 20);
stats('enemy_ap', 'enemy ap', 'app.game.enemy.ap', 210);
stats('enemy_pos', 'enemy position', 'app.game.enemy.arenaX', 120);
stats('enemy_dist', 'enemy distance', 'app.game.player.enemyDist()', 160);

