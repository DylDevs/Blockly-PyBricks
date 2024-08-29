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
  Blockly.Python['motor_run'] = function(block) {
    var motor = block.getFieldValue('MOTOR');
    var rotations = block.getFieldValue('ROTATIONS');
    var unit = block.getFieldValue('UNIT');
    var code = '';

    if (unit === 'ROTATIONS') {
        code = `${motor}.run_for_rotations(${rotations})\n`;
    } else if (unit === 'SECONDS') {
        code = `${motor}.run_for_seconds(${rotations})\n`;
    }

    return code;
  };

  // @ts-ignore || Generate Python code for the display text block
  Blockly.Python['display_text'] = function(block) {
      var text = block.getFieldValue('TEXT');
      var code = `display_text('${text}')\n`;
      return code;
  };
}

export default Blockly.Python;