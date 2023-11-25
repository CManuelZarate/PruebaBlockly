import * as Blockly from 'blockly/core';

/*
declare module 'blockly/core' {
  interface Blockly {
    Arduino: Blockly.ArduinoGenerator;
  }
}
*/
export const jsonGenerator = new Blockly.Generator('JSON');
//esto se saco de arduino.compressed
const Order = {
  ATOMIC: 0,
};
/**
 * Arduino code generator.
 * @type !Blockly.Generator
 */
//Blockly.Arduino = new Blockly.Generator('Arduino');


const arduino_uno = {
  description: 'Arduino standard-compatible board',
  digitalPins: [
    ['2', '2'],
    ['3', '3'],
    ['4', '4'],
    ['5', '5'],
    ['6', '6'],
    ['7', '7'],
    ['8', '8'],
    ['9', '9'],
    ['10', '10'],
    ['11', '11'],
    ['12', '12'],
    ['13', '13'],
    ['A0', 'A0'],
    ['A1', 'A1'],
    ['A2', 'A2'],
    ['A3', 'A3'],
    ['A4', 'A4'],
    ['A5', 'A5']
  ],
  pwmPins: [
    ['3', '3'],
    ['5', '5'],
    ['6', '6'],
    ['9', '9'],
    ['10', '10'],
    ['11', '11'],
    ['A0', 'A0'],
    ['A1', 'A1'],
    ['A2', 'A2'],
    ['A3', 'A3'],
    ['A4', 'A4'],
    ['A5', 'A5']
  ],
  analogPins: [
    ['A0', 'A0'],
    ['A1', 'A1'],
    ['A2', 'A2'],
    ['A3', 'A3'],
    ['A4', 'A4'],
    ['A5', 'A5']
  ],
  serial_baud_rate: 9600,
  parseKey: '_*_'
};
export enum BoardTypes {
  ArduinoUno = 'Arduino Uno'
}
export const selectedBoard = () => {
  return arduino_uno;
};