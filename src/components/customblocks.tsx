import * as Blockly from 'blockly/core';

// Define the custom motor block with dropdowns and inputs
Blockly.Blocks['motor_initialize'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Set up motor at port")
        .appendField(new Blockly.FieldDropdown([["A", "A"], ["B", "B"], ["C", "C"], ["D", "D"], ["E", "E"], ["F", "F"]]), "MOTOR");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg.LOGIC_HUE);
    this.setTooltip("Intializes the specified motor to be used in the program.");
    this.setHelpUrl("");
  }
};

// Define the custom motor block with dropdowns and inputs
// Define the custom motor block with dropdowns and inputs
Blockly.Blocks['motor_run'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Run motor")
        .appendField(new Blockly.FieldDropdown([["A", "A"], ["B", "B"], ["C", "C"], ["D", "D"], ["E", "E"], ["F", "F"]]), "MOTOR")
        .appendField("at")
        .appendField(new Blockly.FieldNumber(50, 0, 100), "SPEED")
        .appendField("% speed")
        .appendField(new Blockly.FieldDropdown([["Clockwise", "CLOCKWISE"], ["Counterclockwise", "COUNTERCLOCKWISE"]]), "DIRECTION")
        .appendField("for")
        .appendField(new Blockly.FieldDropdown(
            [["Infinite", "INFINITE"], ["Rotations", "ROTATIONS"], ["Degrees", "DEGREES"]],
            this.validateUnit.bind(this)
        ), "UNIT");
    
    // Create an input field for rotations or degrees, but don't show it by default
    this.appendValueInput("AMOUNT")
        .setCheck("Number")
        .appendField("Amount")
        .setVisible(false);

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg.LOGIC_HUE);
    this.setTooltip("Runs the motor for a specified amount of time or rotations.");
    this.setHelpUrl("");
  },
  
  // Function to validate the selected unit and show/hide the input field
  validateUnit: function(newValue : any) {
    const amountInput = this.getInput('AMOUNT');
    if (newValue === 'INFINITE') {
      amountInput.setVisible(false);
    } else {
      amountInput.setVisible(true);
      this.getField('AMOUNT').setValue(1); // Set a default value of 1 when visible
    }
    this.render(); // Re-render the block to apply visibility changes
  }
};