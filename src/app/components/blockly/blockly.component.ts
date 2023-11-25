import { Component, OnInit } from '@angular/core';
import { selectedBoard } from '../../generators/arduino';
import * as Blockly from 'blockly';
/*
import 'blockly/javascript';
import * as Blockly from 'blockly/core';
import 'blockly/blocks';
*/
import { BlocklyOptions } from 'blockly';


import * as Es from 'blockly/msg/es';

import { a, jsonTools, jsonTools2, reto1, xmlTools, CustomEs } from '../../utils';

import { javascriptGenerator } from 'blockly/javascript';//para el generador



const Order = {
  ATOMIC: 0,
};





@Component({
  selector: 'app-blockly',
  templateUrl: './blockly.component.html',
  styleUrls: ['./blockly.component.css']
})
export class BlocklyComponent implements OnInit {
  //esto debe ir adentro a diferencia ORDER ya q se necesita en el oninit y me da error en la ejecucion
  public profile={
    arduino:{
      description:"Arduino standard-compatible board",
      digital:[["1","1"],["2","2"],["3","3"],["4","4"],["5","5"],["6","6"],["7","7"],["8","8"],["9","9"],["10","10"],["11","11"],["12","12"],["13","13"],["A0","A0"],["A1","A1"],["A2","A2"],["A3","A3"],["A4","A4"],["A5","A5"]],//ang v7 quita el 1
      pwm: [//esto lo añade en angular v7
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
      analog:[["A0","A0"],["A1","A1"],["A2","A2"],["A3","A3"],["A4","A4"],["A5","A5"]],serial:9600,
      parseKey: '_*_'//esto esta en el ejm angular v7
    },
    arduino_mega:{description:"Arduino Mega-compatible board"},
  
  };
  ws: Blockly.Workspace | any; //espacio de trabajo
  //Arduino=Blockly.Generator;
  Arduino: Blockly.Generator;



  constructor() {
    this.Arduino = new Blockly.Generator('Arduino');
    console.log(this.profile);
    //this.Arduino.ORDER_ATOMIC=0
    this.Arduino.forBlock["base_delay"] = function (block, generator) {
      return "delay(" + (generator.valueToCode(block, "DELAY_TIME", Order.ATOMIC) || "1000") + ");\n"
    };

    this.quote_("as");
    this.Arduino.forBlock["text"] = (block, generator) => {
      // Text value.
      //var code = 'String('+Blockly.Arduino.quote_(this.getFieldValue('TEXT'))+')';

      var code = this.quote_(block.getFieldValue('TEXT'));//LA FUNCION FLECHA HACE QUE SE DESVINCULE Y TRABAJE EL QUOTE CON ESTE Q DEFINI
      return [code, Order.ATOMIC];
    };

    /*LED INOUT
    Blockly.Arduino.inout_digital_write=function(){var a=this.getFieldValue("PIN"),b=this.getFieldValue("STAT");Blockly.Arduino.setups_["setup_output_"+a]="pinMode("+a+", OUTPUT);";return"digitalWrite("+a+", "+b+");\n"};
    */
    //this.Arduino["setups_"]=Object.create(null);
    this.Arduino.forBlock["inout_digital_write"] = (block, generator) => {
      let a=block.getFieldValue("PIN"),b=block.getFieldValue("STAT");
      //en el ejm de v7 no usa esta linea
      //this.Arduino.setups_["setup_output_"+a]="pinMode("+a+", OUTPUT);";
      return"digitalWrite("+a+", "+b+");\n"
    };
  }



  quote_(string: string) {
    // Can't use goog.string.quote since Google's style guide recommends
    // JS string literals use single quotes.
    string = string.replace(/\\/g, '\\\\')
      .replace(/\n/g, '\\\n')
      .replace(/'/g, '\\\'');
    return '\'' + string + '\'';
  };


  /*
  configureArduinoGenerator(generator: Blockly.Generator): void {
    class ArduinoGenerator extends Blockly.Generator {
      constructor(name: string) {
        super(name);
      }

      init(): void {
        // Define las funciones generadoras para tus bloques personalizados aquí
        (this as any)['base_delay'] = function (block:any) {
          const delayTime = Blockly.Arduino.valueToCode(block, 'DELAY_TIME', Blockly.Arduino.ORDER_ATOMIC) || '1000';
          return `delay(${delayTime});\n`;
        };
      }
    }

    //this.Arduino = new ArduinoGenerator('Arduino');
  }
  */

  ngOnInit() {
    //Blockly.setLocale(Es);
    //Blockly.setLocale(CustomEs);
    const blocklyDiv = document.getElementById('blocklyDiv')!;

    //crear nuevas fichas
    /*Blockly.Blocks['string_length'] = {
      init: function() {
        this.jsonInit({
          "message0": Blockly.Msg['RUN']||'RUN',//traducciones
          "previousStatement": null,
          "nextStatement": null,
          "colour": 230,
          "tooltip": "Este es mi bloque personalizado",
          "helpUrl": ""
        });
      }
    };*/
    Blockly.Blocks['string_length'] = {
      init: function () {
        this.jsonInit({
          "message0": 'length of %1',//traducciones lo q se ve
          "previousStatement": null,//habilita abajo
          "nextStatement": null,//habilita abajo
          "args0": [
            {
              "type": "input_value",
              "name": "VALUE",
              "check": "String"
            }
          ],
          "output": "Number",
          "colour": 230,
          "tooltip": "Este es mi bloque personalizado",
          "helpUrl": ""
        });
      }
    };

    javascriptGenerator['string_length'] = function (block: any) {
      // String or array length.
      var argument0 = javascriptGenerator.valueToCode(block, 'VALUE',
        javascriptGenerator.ORDER_FUNCTION_CALL) || '\'\'';
      return [argument0 + '.length', javascriptGenerator.ORDER_MEMBER];
    };


    //otro ejemplo
    javascriptGenerator['text_indexOf'] = function (block: any) {
      // Search the text for a substring.

      //obtiene valor del campo 'END' del bloque,depede si se busca la 1° aparicion o ultima
      var operator = block.getFieldValue('END') == 'FIRST' ? 'indexOf' : 'lastIndexOf';
      // obtiene el código generado para el bloque conectado al conector 'FIND', Si no hay ningún bloque conectado, se utiliza '';ORDDER_NONE se usa bloque no tiene ningún orden específico en relación con otros bloques.El nivel de precedencia ORDER_NONE indica que no hay una relación de precedencia establecida y que se generará el código sin modificar el orden de los bloques.
      var subString = javascriptGenerator.valueToCode(block, 'FIND',
        javascriptGenerator.ORDER_NONE) || '\'\'';

      // obtiene el código generado para el bloque conectado al conector 'VALUE';si no hay ningun bloque conectado se usa ''
      //ORDER_MEMBER: Esta constante se utiliza para establecer un nivel de precedencia más alto; el bloque conectado al conector 'VALUE'. El nivel de precedencia ORDER_MEMBER indica que el bloque conectado al conector 'VALUE' debe tener una precedencia mayor que otros bloques adyacentes, lo que se reflejará en la generación del código final.
      var text = javascriptGenerator.valueToCode(block, 'VALUE',
        javascriptGenerator.ORDER_MEMBER) || '\'\'';
      var code = text + '.' + operator + '(' + subString + ')';
      //nivel de precedencia  para una llamada de función en el código generado(ORDER_FUNCTION_CALL)
      return [code, javascriptGenerator.ORDER_FUNCTION_CALL];
    };



    /******* BLOQUES blocks_compressed.js --> definicion de bloques */

    Blockly.Blocks.base_delay = {
      helpUrl: "http://arduino.cc/en/Reference/delay",
      init: function () {
        this.setColour(120);
        this.appendValueInput("DELAY_TIME", "Number").appendField("Delay").setCheck("Number");
        this.setInputsInline(!0);
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null);
        this.setTooltip("Delay specific time")
      }
    };


    console.log("init ");
    console.log(this.profile);
    console.log(selectedBoard().digitalPins.map(option => {
      return [option[0], option[1]];  // Mapea las opciones a la estructura requerida por Blockly
    }));
    
    Blockly.Blocks.inout_digital_write = { 
      helpUrl: "http://arduino.cc/en/Reference/DigitalWrite",
      init: function () { 
        this.setColour(230);
        this.appendDummyInput()
          .appendField("DigitalWrite PIN#")
          .appendField(new Blockly.FieldDropdown(selectedBoard().digitalPins.map(option => {
            return [option[0], option[1]];  // Mapea las opciones a la estructura requerida por Blockly --no se puede usar solo el selectboard ya que creo q quiere el tipado de 2 elemntos y al traerlo de la otra forma es un string [][] en lugar de string [][2]
          })
          
          ), "PIN")
          .appendField("Stat")
          .appendField(new Blockly.FieldDropdown([["HIGH", "HIGH"], ["LOW", "LOW"]]), "STAT");
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null);
        this.setTooltip("Write digital value to a specific Port") 
      } 
    };


    //arduino_compressed.js -- > es el que tiene el generador de codigo
    /*
    this.Arduino.init = () => {
      // Define las funciones generadoras para tus bloques personalizados aquí
      this.base_delay = function () {
        return "delay(" + (this.valueToCode(this, "DELAY_TIME", this.ORDER_ATOMIC) || "1000") + ");\n";
      };
    }
    */

    /*
    this.Arduino.forBlock["base_delay"]=function(block, generator){
      return"delay("+(generator.valueToCode(block,"DELAY_TIME",this.Order)||"1000")+");\n"
    };
*/

    /*
    this.Arduino["base_delay"]=function(){
      return"delay("+(this.Arduino.valueToCode(this,"DELAY_TIME",this.Arduino.ORDER_ATOMIC)||"1000")+");\n"
    };
    */

    //Arduino=new Blockly.Generator("Arduino");
    this.ws = Blockly.inject(blocklyDiv, {
      readOnly: false,
      trashcan: true,
      //generator: Blockly.JavaScript,
      move: {
        scrollbars: true,
        drag: true,
        wheel: true
      },
      toolbox: jsonTools2
    } as BlocklyOptions);
  }

  ngDoCheck(): void {
    //let code = javascriptGenerator.workspaceToCode(this.ws);
    let code = this.Arduino.workspaceToCode(this.ws);
    //este codigo no se porque no da
    //let code = (Blockly as any).JavaScript.workspaceToCode(this.ws);

    console.log(code);
  }


}
