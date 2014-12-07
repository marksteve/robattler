// Movement

Blockly.Blocks.move_forward = {
  init: function() {
    this.setColour(120);
    this.appendDummyInput()
        .appendField("forward");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');   this.setTooltip('');
  }
};

Blockly.JavaScript.move_forward = function() {
  return 'app.game.player.moveForward();';
};

Blockly.Blocks.move_backward = {
  init: function() {
    this.setColour(20);
    this.appendDummyInput()
        .appendField("backward");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.JavaScript.move_backward = function() {
  return 'app.game.player.moveBackward();';
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
  return 'app.game.player.punch();';
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
  return 'app.game.player.hammer();';
};
