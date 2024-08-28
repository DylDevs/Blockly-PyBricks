/**
 * @license
 *
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Define generation methods for custom blocks.
 * @author samelh@google.com (Sam El-Husseini)
 */

import * as Blockly from 'blockly/core';
import 'blockly/python';  // Ensure Blockly Python is imported

// Check if Blockly.Python exists before setting properties
if (Blockly.Python) {
  // Define Python generator for the custom block "test_react_field"
  Blockly.Python['test_react_field'] = function (block) {
    return "print('custom block')\n";  // Example Python code
  };

  // Example generator for controls_ifelse
  Blockly.Python['controls_ifelse'] = function (block) {
    const condition = Blockly.Python.valueToCode(block, 'IF0', Blockly.Python.ORDER_NONE) || 'False';
    const branch = Blockly.Python.statementToCode(block, 'DO0');
    const elseBranch = Blockly.Python.statementToCode(block, 'ELSE');

    let code = `if ${condition}:\n${branch}`;
    if (elseBranch) {
      code += `else:\n${elseBranch}`;
    }
    return code + '\n';
  };

  // Example generator for logic_compare
  Blockly.Python['logic_compare'] = function (block) {
    const OPERATORS = {
      'EQ': '==',
      'NEQ': '!=',
      'LT': '<',
      'LTE': '<=',
      'GT': '>',
      'GTE': '>='
    };
    const operator = block.getFieldValue('OP');
    const code = `${Blockly.Python.valueToCode(block, 'A', Blockly.Python.ORDER_RELATIONAL)} ${OPERATORS[operator]} ${Blockly.Python.valueToCode(block, 'B', Blockly.Python.ORDER_RELATIONAL)}`;
    return code;
  };

  // Example generator for logic_operation
  Blockly.Python['logic_operation'] = function (block) {
    const operator = block.getFieldValue('OP') === 'AND' ? 'and' : 'or';
    const code = `${Blockly.Python.valueToCode(block, 'A', Blockly.Python.ORDER_LOGICAL)} ${operator} ${Blockly.Python.valueToCode(block, 'B', Blockly.Python.ORDER_LOGICAL)}`;
    return code;
  };

  // Example generator for controls_repeat_ext
  Blockly.Python['controls_repeat_ext'] = function (block) {
    const times = Blockly.Python.valueToCode(block, 'TIMES', Blockly.Python.ORDER_NONE) || '10';
    const branch = Blockly.Python.statementToCode(block, 'DO');
    return `for _ in range(${times}):\n${branch}`;
  };

  // Example generator for logic_negate
  Blockly.Python['logic_negate'] = function (block) {
    const argument = Blockly.Python.valueToCode(block, 'BOOL', Blockly.Python.ORDER_NONE) || 'False';
    return `not ${argument}`;
  };

  // Example generator for logic_boolean
  Blockly.Python['logic_boolean'] = function (block) {
    return block.getFieldValue('BOOL') === 'TRUE' ? 'True' : 'False';
  };

  // Example generator for logic_null
  Blockly.Python['logic_null'] = function (block) {
    return 'None';
  };

  // Example generator for logic_ternary
  Blockly.Python['logic_ternary'] = function (block) {
    const condition = Blockly.Python.valueToCode(block, 'IF', Blockly.Python.ORDER_NONE) || 'False';
    const ifBranch = Blockly.Python.valueToCode(block, 'THEN', Blockly.Python.ORDER_NONE) || 'None';
    const elseBranch = Blockly.Python.valueToCode(block, 'ELSE', Blockly.Python.ORDER_NONE) || 'None';
    return `(${condition} and ${ifBranch}) or ${elseBranch}`;
  };

  // Example generator for text_charAt
  Blockly.Python['text_charAt'] = function (block) {
    const value = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_NONE) || '""';
    const index = Blockly.Python.valueToCode(block, 'AT', Blockly.Python.ORDER_NONE) || '0';
    return `${value}[${index}]`;
  };

  // Example generator for variables_get
  Blockly.Python['variables_get'] = function (block) {
    const variable = Blockly.Python.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
    return variable;
  };
} else {
  console.error('Blockly.Python is not defined');
}

export default Blockly.Python;

