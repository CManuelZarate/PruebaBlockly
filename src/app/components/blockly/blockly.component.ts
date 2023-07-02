import { Component, OnInit } from '@angular/core';

import * as Blockly from 'blockly';
/*
import 'blockly/javascript';
import * as Blockly from 'blockly/core';
import 'blockly/blocks';
*/
import { BlocklyOptions } from 'blockly';


import * as Es from 'blockly/msg/es';

import { a, jsonTools,jsonTools2, reto1, xmlTools,CustomEs } from '../../utils';

import {javascriptGenerator} from 'blockly/javascript';//para el generador

@Component({
  selector: 'app-blockly',
  templateUrl: './blockly.component.html',
  styleUrls: ['./blockly.component.css']
})
export class BlocklyComponent implements OnInit {

  ws:Blockly.Workspace | any; //espacio de trabajo
  constructor() { }

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
      init: function() {
        this.jsonInit({
          "message0": 'length of %1',//traducciones lo q se ve
          //"previousStatement": null,//habilita abajo
          //"nextStatement": null,//habilita abajo
          "args0":[
            {
              "type":"input_value",
              "name":"VALUE",
              "check":"String"
            }
          ],
          "output":"Number",
          "colour": 230,
          "tooltip": "Este es mi bloque personalizado",
          "helpUrl": ""
        });
      }
    };

    javascriptGenerator['string_length'] = function(block:any) {
      // String or array length.
      var argument0 = javascriptGenerator.valueToCode(block, 'VALUE',
          javascriptGenerator.ORDER_FUNCTION_CALL) || '\'\'';
      return [argument0 + '.length', javascriptGenerator.ORDER_MEMBER];
    };


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
    let code = javascriptGenerator.workspaceToCode(this.ws);
    //este codigo no se porque no da
    //let code = (Blockly as any).JavaScript.workspaceToCode(this.ws);

    console.log(code);
  }


}
