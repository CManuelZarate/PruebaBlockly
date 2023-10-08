import * as Blockly from 'blockly/core';

/*
declare module 'blockly/core' {
  interface Blockly {
    Arduino: Blockly.ArduinoGenerator;
  }
}
*/
export const jsonGenerator = new Blockly.Generator('JSON');

const Order = {
  ATOMIC: 0,
};
/**
 * Arduino code generator.
 * @type !Blockly.Generator
 */
//Blockly.Arduino = new Blockly.Generator('Arduino');

