'use strict';

goog.provide('Blockly.Arduino.joint');

goog.require('Blockly.Arduino');

Blockly.Arduino.joint_digitalWrite = function() {
  var dropdown_pin = this.getFieldValue('PIN');
  var dropdown_stat = this.getFieldValue('STAT');
  if(!isNaN(dropdown_pin.replace(/^A/, ''))) {
    Blockly.Arduino.setups_['setup_output_' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', OUTPUT);';
  }
  var code = 'digitalWrite(' + dropdown_pin + ', ' + dropdown_stat + ');\n'
  return code;
};

Blockly.Arduino.joint_digitalRead = function() {
  var dropdown_pin = this.getFieldValue('PIN');
  if(!isNaN(dropdown_pin.replace(/^A/, ''))) {
    Blockly.Arduino.setups_['setup_input_' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', INPUT);';
  }
  var code = 'digitalRead(' + dropdown_pin + ')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.joint_analogRead = function() {
  var dropdown_pin = this.getFieldValue('PIN');
  //Blockly.Arduino.setups_['setup_input_'+dropdown_pin] = 'pinMode('+dropdown_pin+', INPUT);';
  var code = 'analogRead(' + dropdown_pin + ')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.joint_analogWrite = function() {
  var dropdown_pin = this.getFieldValue('PIN');
  var value_num = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_ATOMIC);
  //Blockly.Arduino.setups_['setup_output'+dropdown_pin] = 'pinMode('+dropdown_pin+', OUTPUT);';
  var code = 'analogWrite(' + dropdown_pin + ', ' + value_num + ');\n';
  return code;
};

Blockly.Arduino.joint_setMotorDC = function() {
  var dropdown_port = this.getFieldValue('PIN').split('_');
  var dropdown_dir = this.getFieldValue('DIR');
  var value_num = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_ATOMIC);
  var pin0 = dropdown_port[0];
  var pin1 = dropdown_port[1];
  var code;
  switch(dropdown_dir) {
	  case 'clockwise':
		code = 'analogWrite(' + pin0 + ', ' + value_num + ');\nanalogWrite(' + pin1 + ', 0);\n';
		break;
	  case 'anti-clockwise':
		code = 'analogWrite(' + pin0 + ', 0);\nanalogWrite(' + pin1 + ', ' + value_num + ');\n';
		break;
	  case 'stop':
		code = 'analogWrite(' + pin0 + ', 0);\nanalogWrite(' + pin1 + ', 0);\n';
		break;
  }
  return code;
};

Blockly.Arduino.joint_setRGBLED = function() {
  var port = this.getFieldValue('PIN');
  var dropdown_port = port.split('_');
  var value_R = Blockly.Arduino.valueToCode(this, 'R', Blockly.Arduino.ORDER_ATOMIC);
  var value_G = Blockly.Arduino.valueToCode(this, 'G', Blockly.Arduino.ORDER_ATOMIC);
  var value_B = Blockly.Arduino.valueToCode(this, 'B', Blockly.Arduino.ORDER_ATOMIC);
  var pin0 = dropdown_port[0];
  var pin1 = dropdown_port[1];
  Blockly.Arduino.definitions_['joint_include_wire'] = '#include <Wire.h>\n';
  Blockly.Arduino.definitions_['joint_include_rgbLed'] = '#include "rgbLed.h"\n';
  Blockly.Arduino.definitions_['joint_include_rgbLed_' + port] = 'RGBLed rgbled' + port + ';\n';
  Blockly.Arduino.setups_['setup_output_' + pin0] = 'pinMode(' + pin0 + ', OUTPUT);';
  Blockly.Arduino.setups_['setup_output_' + pin1] = 'pinMode(' + pin1 + ', OUTPUT);';
  var code = 'rgbled' + port + '.sendColor(' + pin0 + ', ' + pin1 + ', ' + value_R + ', ' + value_G + ', ' + value_B + ');\n';
  return code;
};

Blockly.Arduino.joint_getButtonVal = Blockly.Arduino.joint_digitalRead;
Blockly.Arduino.joint_getSoundVal = Blockly.Arduino.joint_digitalRead;
Blockly.Arduino.joint_getTiltSwitchVal = Blockly.Arduino.joint_digitalRead;
Blockly.Arduino.joint_getInfraredVal = Blockly.Arduino.joint_digitalRead;
Blockly.Arduino.joint_getSildeSwitchVal = Blockly.Arduino.joint_digitalRead;
Blockly.Arduino.joint_getMotionTriggerVal = Blockly.Arduino.joint_digitalRead;
Blockly.Arduino.joint_getSoundTriggerVal = Blockly.Arduino.joint_digitalRead;
Blockly.Arduino.joint_getTouchButtonVal = Blockly.Arduino.joint_digitalRead;
// Blockly.Arduino.joint_getIrDistanceTriggerVal = Blockly.Arduino.joint_digitalRead;
Blockly.Arduino.joint_getMagneticSwitchVal = Blockly.Arduino.joint_digitalRead;
Blockly.Arduino.joint_getFlameSensorVal = Blockly.Arduino.joint_digitalRead;
Blockly.Arduino.joint_getLimitSwitchVal = Blockly.Arduino.joint_digitalRead;

Blockly.Arduino.joint_getLightVal = Blockly.Arduino.joint_analogRead;
Blockly.Arduino.joint_getSlideVal = Blockly.Arduino.joint_analogRead;
Blockly.Arduino.joint_getRotateVal = Blockly.Arduino.joint_analogRead;
// Blockly.Arduino.joint_getTemperatureVal = Blockly.Arduino.joint_analogRead;
Blockly.Arduino.joint_getWaterVal = Blockly.Arduino.joint_analogRead;
Blockly.Arduino.joint_getResistanceVal = Blockly.Arduino.joint_analogRead;
Blockly.Arduino.joint_getLowLightVal = Blockly.Arduino.joint_analogRead;

Blockly.Arduino.joint_getTemperatureVal = function() {
  var dropdown_pin = this.getFieldValue('PIN');
  Blockly.Arduino.definitions_['joint_include_wire'] = '#include <Wire.h>\n';
  Blockly.Arduino.definitions_['joint_include_temperature'] = '#include "LDTempHum.h"\n';
  var code = 'readLedongTemp(' + dropdown_pin + ')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.joint_setBuzzer = Blockly.Arduino.joint_digitalWrite;
Blockly.Arduino.joint_setLed = Blockly.Arduino.joint_digitalWrite;
Blockly.Arduino.joint_setStripLed = Blockly.Arduino.joint_digitalWrite;
Blockly.Arduino.joint_setVibrationMotor = Blockly.Arduino.joint_digitalWrite;
Blockly.Arduino.joint_setElectromagnet = Blockly.Arduino.joint_digitalWrite;
Blockly.Arduino.joint_setRelay = Blockly.Arduino.joint_digitalWrite;
Blockly.Arduino.joint_setFan = Blockly.Arduino.joint_digitalWrite;
Blockly.Arduino.joint_setMotor = Blockly.Arduino.joint_digitalWrite;

Blockly.Arduino.joint_setRec = function() {
	var dropdown_pin = this.getFieldValue('PIN').split('_');
	var pin0 = dropdown_pin[0];
	var pin1 = dropdown_pin[1];
	var seconds = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_ATOMIC);
	var dropdown_dir = this.getFieldValue('DIR');
	// alert(dropdown_dir);
	var code = '';
	Blockly.Arduino.setups_['setup_output'+pin0] = 'pinMode('+pin0+', OUTPUT);';
	Blockly.Arduino.setups_['setup_output'+pin1] = 'pinMode('+pin1+', OUTPUT);';
	switch(dropdown_dir) {
		case 'PLAY':
			code = 'digitalWrite(' + pin1 + ', LOW);\ndelay(10);\ndigitalWrite(' + pin0 + ', HIGH);\ndelay(' + seconds + '*1000);\ndigitalWrite(' + pin0 + ', LOW);\ndelay(10);\n'
			break;
		case 'RECORD':
			code = 'digitalWrite(' + pin0 + ', LOW);\ndelay(10);\ndigitalWrite(' + pin1 + ', HIGH);\ndelay(' + seconds + '*1000);\ndigitalWrite(' + pin1 + ', LOW);\ndelay(10);\n'
			break;
	}
	// var code = 'digitalWrite(' + pin0 + ', HIGH);\n' + 'delay(' + seconds + '*1000);\n' + 'digitalWrite(' + pin1 + ', LOW);\n' + 'delay(10);\n'
	return code;
};

Blockly.Arduino.joint_setRecOn = function() {
	var dropdown_pin = this.getFieldValue('PIN').split('_');
	var pin0 = dropdown_pin[0];
	var pin1 = dropdown_pin[1];
	var dropdown_dir = this.getFieldValue('DIR');
	// alert(dropdown_dir);
	var code = '';
	Blockly.Arduino.setups_['setup_output'+pin0] = 'pinMode('+pin0+', OUTPUT);';
	Blockly.Arduino.setups_['setup_output'+pin1] = 'pinMode('+pin1+', OUTPUT);';
	switch(dropdown_dir) {
		case 'PLAY':
			code = 'digitalWrite(' + pin1 + ', LOW);\ndelay(10);\ndigitalWrite(' + pin0 + ', HIGH);\ndelay(10);\n'
			break;
		case 'RECORD':
			code = 'digitalWrite(' + pin0 + ', LOW);\ndelay(10);\ndigitalWrite(' + pin1 + ', HIGH);\ndelay(10);\n'
			break;
	}
	// var code = 'digitalWrite(' + pin0 + ', HIGH);\n' + 'delay(10);\n' + 'digitalWrite(' + pin1 + ', LOW);\n' + 'delay(10);\n'
	return code;
};

Blockly.Arduino.joint_setRecOff = function() {
	var dropdown_pin = this.getFieldValue('PIN').split('_');
	var pin0 = dropdown_pin[0];
	var pin1 = dropdown_pin[1];
	var seconds = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_ATOMIC);
	Blockly.Arduino.setups_['setup_output'+pin0] = 'pinMode('+pin0+', OUTPUT);';
	Blockly.Arduino.setups_['setup_output'+pin1] = 'pinMode('+pin1+', OUTPUT);';
	var code = 'digitalWrite(' + pin0 + ', LOW);\ndelay(10);\ndigitalWrite(' + pin1 + ', LOW);\ndelay(10);\n'
	return code;
};

Blockly.Arduino.joint_getHumTemp = function() {
	Blockly.Arduino.definitions_['joint_include_wire'] = '#include <Wire.h>\n';
    Blockly.Arduino.definitions_['joint_include_temperature'] = '#include "LDTempHum.h"\n';
	Blockly.Arduino.setups_['wire_begin'] = 'Wire.begin();';
	var dropdown_dir = this.getFieldValue('DIR');
	var code = '';
	switch(dropdown_dir) {
		case 'HUM':
			code = 'getTempAndHum()[1]';
			break;
		case 'TEMP':
			code = 'getTempAndHum()[0]';
			break;
	}
	return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.joint_getUltrasonic = function() {
	Blockly.Arduino.definitions_['joint_include_wire'] = '#include <Wire.h>\n';
	Blockly.Arduino.definitions_['joint_ultrasonic'] = 'int getUltrasonic()\n{\n  int distance, h, l;\n  Wire.requestFrom(1, 2);\n  '+
	'if(Wire.available() == 2) {\n    l = Wire.read();\n    h = Wire.read();\n    distance = h * 256 + l;\n  }\n  return distance;\n}\n';
	Blockly.Arduino.setups_['wire_begin'] = 'Wire.begin();';
	var code = 'getUltrasonic()';
	return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.joint_getUltrasonic0 = function() {
	Blockly.Arduino.definitions_['joint_include_wire'] = '#include <Wire.h>\n';
	Blockly.Arduino.definitions_['joint_ultrasonic'] = 'int getUltrasonic0(int TRIG_PIN, int ECHO_PIN){\n' +
	                                                   '  unsigned long t1, t2, pulse_width;\n' +
                                                       '  int cm;\n' +
                                                       '  digitalWrite(TRIG_PIN, HIGH);\n' +
													   '  delayMicroseconds(10);\n' + 
													   '  digitalWrite(TRIG_PIN, LOW);\n' + 
													   '  while(digitalRead(ECHO_PIN) == 0);\n' +
													   '  t1 = micros();\n' +
													   '  while(digitalRead(ECHO_PIN) == 1);\n' +
													   '  t2 = micros();\n' +
													   '  pulse_width = t2 - t1;\n' +
													   '  cm = pulse_width / 58.0;\n' + 
													   '  delay(60);\n' +
													   '  return cm;\n' +
		                                               '}\n';
    var dropdown_pin = this.getFieldValue('PIN').split('_');
	var pin0 = dropdown_pin[0];
	var pin1 = dropdown_pin[1]; 
	var code = 'getUltrasonic0(' + pin0 + ', ' + pin1 + ')';
	return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.joint_setDigit = function() {
	Blockly.Arduino.definitions_['joint_include_wire'] = '#include <Wire.h>\n';
	Blockly.Arduino.definitions_['joint_include_LDTM1650'] = '#include "LDTM1650.h"\n';
	Blockly.Arduino.definitions_['joint_LDTM1650'] = 'TM1650 d;';
	Blockly.Arduino.setups_['wire_begin'] = 'Wire.begin();';
	Blockly.Arduino.setups_['joint_LDTM1650_init'] = 'd.init();';
	var value_num = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_ATOMIC);
	var code = 'd.disComplexString(' + value_num + ');\n' + 'd.displayOn();\n';
	return code;	
};

Blockly.Arduino.joint_setDigitOff = function() {
	Blockly.Arduino.definitions_['joint_include_wire'] = '#include <Wire.h>\n';
	Blockly.Arduino.definitions_['joint_include_LDTM1650'] = '#include "LDTM1650.h"\n';
	Blockly.Arduino.definitions_['joint_LDTM1650'] = 'TM1650 d;';
	Blockly.Arduino.setups_['wire_begin'] = 'Wire.begin();';
	Blockly.Arduino.setups_['joint_LDTM1650_init'] = 'd.init();';
	var code = 'd.displayOff();\n';
	return code;	
};

Blockly.Arduino.joint_setMatrix = function() {
	var matrixName = this.getFieldValue('dotName');
	Blockly.Arduino.definitions_['joint_include_gfx'] = '#include <Labplus_GFX.h>';
	Blockly.Arduino.definitions_['joint_include_ledbackpack'] = '#include <Labplus_LEDBackpack.h>';
	Blockly.Arduino.definitions_['joint_include_neopixel.h'] = '#include <Labplus_NeoPixel.h>';
	Blockly.Arduino.definitions_['joint_inclue_wire'] = '#include <Wire.h>';
	Blockly.Arduino.definitions_['joint_matrix_define' + matrixName] = 'Labplus_8x16matrix ' + matrixName + ' = Labplus_8x16matrix();';
	Blockly.Arduino.setups_['matirx_begin'+ matrixName] = matrixName + '.begin(0x70);';
	Blockly.Arduino.setups_['matrix_setBrightness'+ matrixName] = matrixName + '.setBrightness(1);';
	Blockly.Arduino.setups_['matirx_setRotation'+ matrixName] = matrixName + '.setRotation(1);';
	var row0 = Blockly.Arduino.valueToCode(this, 'row0', Blockly.Arduino.ORDER_ATOMIC);
    var row1 = Blockly.Arduino.valueToCode(this, 'row1', Blockly.Arduino.ORDER_ATOMIC);
    var row2 = Blockly.Arduino.valueToCode(this, 'row2', Blockly.Arduino.ORDER_ATOMIC);
	var row3 = Blockly.Arduino.valueToCode(this, 'row3', Blockly.Arduino.ORDER_ATOMIC);
	var row4 = Blockly.Arduino.valueToCode(this, 'row4', Blockly.Arduino.ORDER_ATOMIC);
	var row5 = Blockly.Arduino.valueToCode(this, 'row5', Blockly.Arduino.ORDER_ATOMIC);
	var row6 = Blockly.Arduino.valueToCode(this, 'row6', Blockly.Arduino.ORDER_ATOMIC);
	var row7 = Blockly.Arduino.valueToCode(this, 'row7', Blockly.Arduino.ORDER_ATOMIC);
	var MatrixDot = row0 + row1 + row2 + row3 + row4 + row5 + row6 + row7;
	var matrixName = this.getFieldValue('dotName');
	Blockly.Arduino.definitions_['joint_matirx_' + matrixName] = 'String ' + matrixName + "Value = \"" + MatrixDot + "\";";
	var code = 'for(int dotNum = 0; dotNum < 16*8; dotNum++) {\n';
	code += '  if(' + matrixName + 'Value[dotNum] == \'1\') {\n';
	code += '    ' + matrixName + '.drawPixel(dotNum % 16, dotNum / 16, LED_ON);\n';
	code += '  } else {\n';
	code += '    ' + matrixName + '.drawPixel(dotNum % 16, dotNum / 16, LED_OFF);\n';
	code += '  }\n';
	code += '}\n';
	//code += 'matrix.writeDisplay();\n';
	return code;	
}


function analyzeColor(color) {
	if(color == "#E8E8E8") {
		return '0';
	}
	return '1';
}

Blockly.Arduino.DotMatrixRow = function() {
  // var branch = Blockly.Arduino.statementToCode(this, 'DO');

  var Dot0 = this.getFieldValue('Dot0');
  var Dot1 = this.getFieldValue('Dot1');
  var Dot2 = this.getFieldValue('Dot2');
  var Dot3 = this.getFieldValue('Dot3');
  var Dot4 = this.getFieldValue('Dot4');
  var Dot5 = this.getFieldValue('Dot5');
  var Dot6 = this.getFieldValue('Dot6');
  var Dot7 = this.getFieldValue('Dot7');
  var Dot8 = this.getFieldValue('Dot8');
  var Dot9 = this.getFieldValue('Dot9');
  var Dot10 = this.getFieldValue('Dot10');
  var Dot11 = this.getFieldValue('Dot11');
  var Dot12 = this.getFieldValue('Dot12');
  var Dot13 = this.getFieldValue('Dot13');
  var Dot14 = this.getFieldValue('Dot14');
  var Dot15 = this.getFieldValue('Dot15');
  // var colorRGB = this.getFieldValue('colorRGB');

  var code='';
  code+=analyzeColor(Dot0);
  code+=analyzeColor(Dot1);
  code+=analyzeColor(Dot2);
  code+=analyzeColor(Dot3);
  code+=analyzeColor(Dot4);
  code+=analyzeColor(Dot5);
  code+=analyzeColor(Dot6);
  code+=analyzeColor(Dot7);
  code+=analyzeColor(Dot8);
  code+=analyzeColor(Dot9);
  code+=analyzeColor(Dot10);
  code+=analyzeColor(Dot11);
  code+=analyzeColor(Dot12);
  code+=analyzeColor(Dot13);
  code+=analyzeColor(Dot14);
  code+=analyzeColor(Dot15);
  
  return [code, Blockly.Arduino.ORDER_ATOMIC];
}; 


Blockly.Arduino.joint_percussion = function() {
	var code = this.getFieldValue('DIR');
	return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.joint_melodic = function() {
	var code = this.getFieldValue('DIR');
	return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.joint_setMidi1 = function() {
	Blockly.Arduino.definitions_['include_Wire'] = '#include <Wire.h>';
	Blockly.Arduino.definitions_['include_LdSetMidi'] = '#include <LdSetMidi.h>';
	var dropdown_port = this.getFieldValue('PIN').split('_');
	var pin0 = dropdown_port[0];
	var pin1 = dropdown_port[1];
	Blockly.Arduino.definitions_['joint_midi_define_' + pin0 + '_' + pin1] = 'LdSetMidi midi_' + pin0 + '_' + pin1 + ' = LdSetMidi(' + pin0 + ',' + pin1 + ');';
	Blockly.Arduino.setups_['midi_' + pin0 + '_' + pin1] = 'midi_' + pin0 + '_' + pin1 + '.begin();'
	var chs = Blockly.Arduino.valueToCode(this, 'CHS', Blockly.Arduino.ORDER_ATOMIC);
	var code = 'midi_' + pin0 + '_' +pin1 + '.MidiChangeProgram(0, ' + chs + ');\n';
	return code;
};

Blockly.Arduino.joint_setMidi2 = function() {
	Blockly.Arduino.definitions_['include_Wire'] = '#include <Wire.h>';
	Blockly.Arduino.definitions_['include_LdSetMidi'] = '#include <LdSetMidi.h>';
	var dropdown_port = this.getFieldValue('PIN').split('_');
	var pin0 = dropdown_port[0];
	var pin1 = dropdown_port[1];
	Blockly.Arduino.definitions_['joint_midi_define_' + pin0 + '_' + pin1] = 'LdSetMidi midi_' + pin0 + '_' + pin1 + ' = LdSetMidi(' + pin0 + ',' + pin1 + ');';
	Blockly.Arduino.setups_['midi_' + pin0 + '_' + pin1] = 'midi_' + pin0 + '_' + pin1 + '.begin();'
	var chs = Blockly.Arduino.valueToCode(this, 'CHS', Blockly.Arduino.ORDER_ATOMIC);
	var code = 'midi_' + pin0 + '_' +pin1 + '.MidiChangeProgram(10, ' + chs + ');\n';
	return code;
	
};

Blockly.Arduino.joint_playNote = function() {
	Blockly.Arduino.definitions_['include_SWire'] = '#include <Wire.h>';
	Blockly.Arduino.definitions_['include_LdSetMidi'] = '#include <LdSetMidi.h>';
	var dropdown_port = this.getFieldValue('PIN').split('_');
	var pin0 = dropdown_port[0];
	var pin1 = dropdown_port[1];
	var note = Blockly.Arduino.valueToCode(this, 'NOTE', Blockly.Arduino.ORDER_ATOMIC);
	var code = 'midi_' + pin0 + '_' +pin1 + '.noteOn(0x90, ' + note + ', 50);\n';
	return code;
};

Blockly.Arduino.joint_playNote1 = function() {
	Blockly.Arduino.definitions_['include_SWire'] = '#include <Wire.h>';
	Blockly.Arduino.definitions_['include_LdSetMidi'] = '#include <LdSetMidi.h>';
	var dropdown_port = this.getFieldValue('PIN').split('_');
	var pin0 = dropdown_port[0];
	var pin1 = dropdown_port[1];
	var note = Blockly.Arduino.valueToCode(this, 'NOTE', Blockly.Arduino.ORDER_ATOMIC);
	var vol = Blockly.Arduino.valueToCode(this, 'VOL', Blockly.Arduino.ORDER_ATOMIC);
	var code = 'midi_' + pin0 + '_' +pin1 + '.noteOn(0x90, ' + note + ', ' + vol +');\n';
	return code;
};

Blockly.Arduino.joint_stopPlay = function() {
	Blockly.Arduino.definitions_['include_Wire'] = '#include <Wire.h>';
	Blockly.Arduino.definitions_['include_LdSetMidi'] = '#include <LdSetMidi.h>';
	var dropdown_port = this.getFieldValue('PIN').split('_');
	var pin0 = dropdown_port[0];
	var pin1 = dropdown_port[1];
	var note = Blockly.Arduino.valueToCode(this, 'NOTE', Blockly.Arduino.ORDER_ATOMIC);
	var code = 'midi_' + pin0 + '_' +pin1 + '.noteOff();\n';
	return code;
};

Blockly.Arduino.joint_getColor = function() {
	Blockly.Arduino.definitions_['include_LdSetiColor'] = '#include \"LdSetiColor.h\"';
	Blockly.Arduino.definitions_['include_Wire'] = '#include <Wire.h>';
	Blockly.Arduino.setups_['joint_colorsensor_init'] = 'ColorSensor_PowerUp();\n  ColorSensor_SetGain(GAIN_X_64);\n';
	var code = 'getColor_();\n';
	return code;
};

Blockly.Arduino.joint_hsvColor = function() {
	Blockly.Arduino.definitions_['include_LdSetiColor'] = '#include \"LdSetiColor.h\"';
	Blockly.Arduino.definitions_['include_Wire'] = '#include <Wire.h>';
	Blockly.Arduino.setups_['joint_colorsensor_init'] = 'ColorSensor_PowerUp();\n  ColorSensor_SetGain(GAIN_X_64);\n';
	var chs = this.getFieldValue('CHS');
	var code = 'color_hsv.' + chs;
	return [code, Blockly.Arduino.ORDER_ATOMIC];	
};

Blockly.Arduino.joint_rgbColor = function() {
	Blockly.Arduino.definitions_['include_LdSetiColor'] = '#include \"LdSetiColor.h\"';
	Blockly.Arduino.definitions_['include_Wire'] = '#include <Wire.h>';
	Blockly.Arduino.setups_['joint_colorsensor_init'] = 'ColorSensor_PowerUp();\n  ColorSensor_SetGain(GAIN_X_64);\n';
	var chs = this.getFieldValue('CHS');
	var code = 'color_rgb.' + chs;
	return [code, Blockly.Arduino.ORDER_ATOMIC];	
};

Blockly.Arduino.joint_setLcdNum = function() {
	Blockly.Arduino.definitions_['include_Wire'] = '#include <Wire.h>';
	Blockly.Arduino.definitions_['include_BU9792'] = '#include \"BU9792.h\"';
	Blockly.Arduino.definitions_['joint_BU9792_define'] = 'BU9792Class BU9792;';
	Blockly.Arduino.setups_['joint_BU9792_begin'] = 'BU9792.begin();';
	var num0 = Blockly.Arduino.valueToCode(this, 'num0', Blockly.Arduino.ORDER_ATOMIC);
	var code = 'BU9792.clearDisplay();\n  BU9792.display(' + num0 + ');\n';
	return code;
};

Blockly.Arduino.joint_setLcdTime = function() {
	Blockly.Arduino.definitions_['include_Wire'] = '#include <Wire.h>';
	Blockly.Arduino.definitions_['include_BU9792'] = '#include \"BU9792.h\"';
	Blockly.Arduino.definitions_['joint_BU9792_define'] = 'BU9792Class BU9792;';
	Blockly.Arduino.setups_['joint_BU9792_begin'] = 'BU9792.begin();';
	var num0 = Blockly.Arduino.valueToCode(this, 'hour', Blockly.Arduino.ORDER_ATOMIC);
	var num1 = Blockly.Arduino.valueToCode(this, 'min', Blockly.Arduino.ORDER_ATOMIC);
	var code = 'BU9792.clearDisplay();\n  BU9792.displayTime(' + num0 + ', ' + num1 +  ');\n';
	return code;
};

Blockly.Arduino.joint_closeLcd = function() {
	Blockly.Arduino.definitions_['include_Wire'] = '#include <Wire.h>';
	Blockly.Arduino.definitions_['include_BU9792'] = '#include \"BU9792.h\"';
	Blockly.Arduino.definitions_['joint_BU9792_define'] = 'BU9792Class BU9792;';
	Blockly.Arduino.setups_['joint_BU9792_begin'] = 'BU9792.begin();';
	var code = 'BU9792.clearDisplay();\n';
	return code;
};

Blockly.Arduino.joint_musiclist = function() {
	var code = this.getFieldValue('DIR');
	return [code, Blockly.Arduino.ORDER_ATOMIC];;
};
	
// Blockly.Arduino.joint_mp3dirlist = function() {
	// var code = this.getFieldValue('DIR');
	// return [code, Blockly.Arduino.ORDER_ATOMIC];;
// };	

Blockly.Arduino.joint_playMp3 = function() {
	Blockly.Arduino.definitions_['include_Wire'] = '#include <Wire.h>';
	Blockly.Arduino.definitions_['include_kt540b'] = '#include \"kt540b.h\"';
	var dropdown_port = this.getFieldValue('PIN').split('_');
	var pin0 = dropdown_port[0];
	var pin1 = dropdown_port[1];
	Blockly.Arduino.definitions_['joint_kt540b_' + pin0 + '_' + pin1] = 'Kt540bClass mp3Play_' + pin0 + '_' + pin1 + '(' + pin0 + ', ' + pin1 + ');\n';
	Blockly.Arduino.setups_['joint_kt540b_' + pin0 + '_' + pin1 + '_begin'] = 'mp3Play_' + pin0 + '_' + pin1 + '.begin();\n';
	//var dirnum = Blockly.Arduino.valueToCode(this, 'DIR', Blockly.Arduino.ORDER_ATOMIC);
	var musicnum = Blockly.Arduino.valueToCode(this, 'Num', Blockly.Arduino.ORDER_ATOMIC);
	var code = 'mp3Play_' + pin0 + '_' + pin1 + '.play(' + musicnum + ');\n';
	
	// if(dirnum != 'root') {
		// if(musicnum != 'all') {
			// code = 'mp3Play_' + pin0 + '_' + pin1 + '.play(' + dirnum + ', ' + musicnum + ');\n';
		// } else {
			// code = 'mp3Play_' + pin0 + '_' + pin1 + '.playdir(' + dirnum + ');\n'
		// }
	// } else {
		// if(musicnum != 'all') {
			// code = 'mp3Play_' + pin0 + '_' + pin1 + '.play(' + musicnum + ');\n';
		// } else {
			// code = 'mp3Play_' + pin0 + '_' + pin1 + '.radomPlay();\n';
		// }
	// }
	return code;
};

Blockly.Arduino.joint_loopMp3 = function() {
	Blockly.Arduino.definitions_['include_Wire'] = '#include <Wire.h>';
	Blockly.Arduino.definitions_['include_kt540b'] = '#include \"kt540b.h\"';
	var dropdown_port = this.getFieldValue('PIN').split('_');
	var pin0 = dropdown_port[0];
	var pin1 = dropdown_port[1];
	Blockly.Arduino.definitions_['joint_kt540b_' + pin0 + '_' + pin1] = 'Kt540bClass mp3Play_' + pin0 + '_' + pin1 + '(' + pin0 + ', ' + pin1 + ');\n';
	Blockly.Arduino.setups_['joint_kt540b_' + pin0 + '_' + pin1 + '_begin'] = 'mp3Play_' + pin0 + '_' + pin1 + '.begin();\n';
	//var dirnum = Blockly.Arduino.valueToCode(this, 'DIR', Blockly.Arduino.ORDER_ATOMIC);
	var musicnum = Blockly.Arduino.valueToCode(this, 'Num', Blockly.Arduino.ORDER_ATOMIC);
	var stat = 0;
	var code = 'mp3Play_' + pin0 + '_' + pin1 + '.loop(' + musicnum + ');\n';
	// if(!isNaN(dirnum)) {
		// if(!isNaN(musicnum)) {
			// code = 'mp3Play_' + pin0 + '_' + pin1 + '.loop(' + dirnum + ', ' + musicnum + ');\n';
		// } else {
			// code = 'mp3Play_' + pin0 + '_' + pin1 + '.loopdir(' + dirnum + ');\n'
		// }
	// } else {
		// if(!isNaN(musicnum)) {
			// code = 'mp3Play_' + pin0 + '_' + pin1 + '.loop(' + musicnum + ');\n';
		// } else {
			// code = 'mp3Play_' + pin0 + '_' + pin1 + '.radomPlay();\n';
		// }
	// }
	return code;
};

Blockly.Arduino.joint_setMp3 = function() {
	Blockly.Arduino.definitions_['include_Wire'] = '#include <Wire.h>';
	Blockly.Arduino.definitions_['include_kt540b'] = '#include \"kt540b.h\"';
	var dropdown_port = this.getFieldValue('PIN').split('_');
	var pin0 = dropdown_port[0];
	var pin1 = dropdown_port[1];
	Blockly.Arduino.definitions_['joint_kt540b_' + pin0 + '_' + pin1] = 'Kt540bClass mp3Play_' + pin0 + '_' + pin1 + '(' + pin0 + ', ' + pin1 + ');\n';
	Blockly.Arduino.setups_['joint_kt540b_' + pin0 + '_' + pin1 + '_begin'] = 'mp3Play_' + pin0 + '_' + pin1 + '.begin();\n';
	var stat = this.getFieldValue('STAT');
	var code = '';
	switch(stat) {
		case '0': code = 'mp3Play_' + pin0 + '_' + pin1 + '.stop();\n';
		break;
		case '1': code = 'mp3Play_' + pin0 + '_' + pin1 + '.play();\n';
		break; 
		case '2': code = 'mp3Play_' + pin0 + '_' + pin1 + '.pause();\n';
		break; 
		case '3': code = 'mp3Play_' + pin0 + '_' + pin1 + '.playNext();\n';
		break; 
		case '4': code = 'mp3Play_' + pin0 + '_' + pin1 + '.playPrev();\n';
		break; 
	}
	return code;
};

Blockly.Arduino.joint_setMp3Volume = function() {
	Blockly.Arduino.definitions_['include_Wire'] = '#include <Wire.h>';
	Blockly.Arduino.definitions_['include_kt540b'] = '#include \"kt540b.h\"';
	var dropdown_port = this.getFieldValue('PIN').split('_');
	var pin0 = dropdown_port[0];
	var pin1 = dropdown_port[1];
	var vol = Blockly.Arduino.valueToCode(this, 'VOL', Blockly.Arduino.ORDER_ATOMIC);
	Blockly.Arduino.definitions_['joint_kt540b_' + pin0 + '_' + pin1] = 'Kt540bClass mp3Play_' + pin0 + '_' + pin1 + '(' + pin0 + ', ' + pin1 + ');\n';
	var code = 'mp3Play_' + pin0 + '_' + pin1 + '.setVolume(' + vol + ');\n'
	return code;
};

Blockly.Arduino.joint_getMp3Stat = function() {
	Blockly.Arduino.definitions_['include_Wire'] = '#include <Wire.h>';
	Blockly.Arduino.definitions_['include_kt540b'] = '#include \"kt540b.h\"';
	var dropdown_port = this.getFieldValue('PIN').split('_');
	var pin0 = dropdown_port[0];
	var pin1 = dropdown_port[1];
	Blockly.Arduino.definitions_['joint_kt540b_' + pin0 + '_' + pin1] = 'Kt540bClass mp3Play_' + pin0 + '_' + pin1 + '(' + pin0 + ', ' + pin1 + ');\n';
	Blockly.Arduino.setups_['joint_kt540b_' + pin0 + '_' + pin1 + '_begin'] = 'mp3Play_' + pin0 + '_' + pin1 + '.begin();\n';
	var stat = this.getFieldValue('STAT');
	var code = '(mp3Play_' + pin0 + '_' + pin1 + '.getPlayState() == ' + stat + ')';
	return [code, Blockly.Arduino.ORDER_ATOMIC];
};
	
Blockly.Arduino.joint_defineLightBar = function() {
	Blockly.Arduino.definitions_['include_Wire'] = '#include <Wire.h>';
	var pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
	var amount = Blockly.Arduino.valueToCode(this, 'AMOUNT', Blockly.Arduino.ORDER_ATOMIC);
	Blockly.Arduino.definitions_['include_Labplus_NeoPixel'] = '#include <Labplus_NeoPixel.h>';
	Blockly.Arduino.definitions_['define_NeoPixel_' + pin] = 'Labplus_NeoPixel ledbar_' + pin + ' = Labplus_NeoPixel(' + amount + ', ' + pin + ', NEO_GRB + NEO_KHZ800);\n';
	Blockly.Arduino.setups_['ledbar_' + pin] = 'ledbar_' + pin + '.begin();\n';
	var code = '';
	return code;
};		
		
Blockly.Arduino.joint_setLightBar = function() {
	var pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
	var num = Blockly.Arduino.valueToCode(this, 'NUMBER', Blockly.Arduino.ORDER_ATOMIC);
	var red = Blockly.Arduino.valueToCode(this, 'RED', Blockly.Arduino.ORDER_ATOMIC);
	var green = Blockly.Arduino.valueToCode(this, 'GREEN', Blockly.Arduino.ORDER_ATOMIC);
	var blue = Blockly.Arduino.valueToCode(this, 'BLUE', Blockly.Arduino.ORDER_ATOMIC);
	var result =  'ledbar_' + pin + '.setPixelColor(' + num + ', ' + red + ', ' + green + ', ' + blue + ');\n'
	return result;
};	 

Blockly.Arduino.joint_sendLightBar = function() {
	var pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
	var result = 'ledbar_' + pin + '.show();\n';
	return result;
};	

Blockly.Arduino.joint_setLightBarPalette = function() {	
	var pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
	var num = Blockly.Arduino.valueToCode(this, 'NUMBER', Blockly.Arduino.ORDER_ATOMIC);
	var color = Blockly.Arduino.valueToCode(this, 'COLOR', Blockly.Arduino.ORDER_ATOMIC);
	color = color.substr(1);
	var red = '0x' + color.substr(0,2);
	var green = '0x' + color.substr(2,2);
	var blue = '0x' + color.substr(4,2);
	var result =  'ledbar_' + pin + '.setPixelColor(' + num + ', ' + red + ', ' + green + ', ' + blue + ');\n'
	return result;
};		

Blockly.Arduino.joint_digital_pin = function() {
	var pin = this.getFieldValue('PIN');
	return [pin, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.colorbar = function() {
	var color = this.getFieldValue('COLOR');
	return [color, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.joint_setMatrixCoorXY = function() {
	var matrixName = this.getFieldValue('dotName');
	Blockly.Arduino.definitions_['joint_include_gfx'] = '#include <Labplus_GFX.h>';
	Blockly.Arduino.definitions_['joint_include_ledbackpack'] = '#include <Labplus_LEDBackpack.h>';
	Blockly.Arduino.definitions_['joint_include_neopixel.h'] = '#include <Labplus_NeoPixel.h>';
	Blockly.Arduino.definitions_['joint_inclue_wire'] = '#include <Wire.h>';
	Blockly.Arduino.definitions_['joint_matrix_define' + matrixName] = 'Labplus_8x16matrix ' + matrixName + ' = Labplus_8x16matrix();';
	Blockly.Arduino.setups_['matirx_begin'+ matrixName] = matrixName + '.begin(0x70);';
	Blockly.Arduino.setups_['matrix_setBrightness'+ matrixName] = matrixName + '.setBrightness(1);';
	Blockly.Arduino.setups_['matirx_setRotation'+ matrixName] = matrixName + '.setRotation(1);';
	var coorX = Blockly.Arduino.valueToCode(this, 'CoorX', Blockly.Arduino.ORDER_ATOMIC);
	var coorY = Blockly.Arduino.valueToCode(this, 'CoorY', Blockly.Arduino.ORDER_ATOMIC);
	var stat = Blockly.Arduino.valueToCode(this, 'stat', Blockly.Arduino.ORDER_ATOMIC);
	var code = matrixName + ".drawPixel(" + coorX + ', ' + coorY + ', ' + stat + ');\n';
	return code;
	
};

Blockly.Arduino.joint_setMatrixCursor = function() {
	var matrixName = this.getFieldValue('dotName');
	Blockly.Arduino.definitions_['joint_include_gfx'] = '#include <Labplus_GFX.h>';
	Blockly.Arduino.definitions_['joint_include_ledbackpack'] = '#include <Labplus_LEDBackpack.h>';
	Blockly.Arduino.definitions_['joint_include_neopixel.h'] = '#include <Labplus_NeoPixel.h>';
	Blockly.Arduino.definitions_['joint_inclue_wire'] = '#include <Wire.h>';
	Blockly.Arduino.definitions_['joint_matrix_define' + matrixName] = 'Labplus_8x16matrix ' + matrixName + ' = Labplus_8x16matrix();';
	Blockly.Arduino.setups_['matirx_begin'+ matrixName] = matrixName + '.begin(0x70);';
	Blockly.Arduino.setups_['matrix_setBrightness'+ matrixName] = matrixName + '.setBrightness(1);';
	Blockly.Arduino.setups_['matirx_setRotation'+ matrixName] = matrixName + '.setRotation(1);';
	var coorX = Blockly.Arduino.valueToCode(this, 'CoorX', Blockly.Arduino.ORDER_ATOMIC);
	var coorY = Blockly.Arduino.valueToCode(this, 'CoorY', Blockly.Arduino.ORDER_ATOMIC);
	var stat = Blockly.Arduino.valueToCode(this, 'stat', Blockly.Arduino.ORDER_ATOMIC);
	var code = matrixName + ".setCursor(" + coorX + ', ' + coorY + ');\n';
	return code;
	
};

Blockly.Arduino.joint_setMatrixChar = function() {
	var matrixName = this.getFieldValue('dotName');
	Blockly.Arduino.definitions_['joint_include_gfx'] = '#include <Labplus_GFX.h>';
	Blockly.Arduino.definitions_['joint_include_ledbackpack'] = '#include <Labplus_LEDBackpack.h>';
	Blockly.Arduino.definitions_['joint_include_neopixel.h'] = '#include <Labplus_NeoPixel.h>';
	Blockly.Arduino.definitions_['joint_inclue_wire'] = '#include <Wire.h>';
	Blockly.Arduino.definitions_['joint_matrix_define' + matrixName] = 'Labplus_8x16matrix ' + matrixName + ' = Labplus_8x16matrix();';
	Blockly.Arduino.setups_['matirx_begin'+ matrixName] = matrixName + '.begin(0x70);';
	Blockly.Arduino.setups_['matrix_setBrightness'+ matrixName] = matrixName + '.setBrightness(1);';
	Blockly.Arduino.setups_['matirx_setRotation'+ matrixName] = matrixName + '.setRotation(1);';
	var char1 = Blockly.Arduino.valueToCode(this, 'Char', Blockly.Arduino.ORDER_ATOMIC);
	var code = matrixName + '.write(' + char1 + ');\n';
	return code;
	
};

Blockly.Arduino.joint_clearMatrix = function() {
	var matrixName = this.getFieldValue('dotName');
	Blockly.Arduino.definitions_['joint_include_gfx'] = '#include <Labplus_GFX.h>';
	Blockly.Arduino.definitions_['joint_include_ledbackpack'] = '#include <Labplus_LEDBackpack.h>';
	Blockly.Arduino.definitions_['joint_include_neopixel.h'] = '#include <Labplus_NeoPixel.h>';
	Blockly.Arduino.definitions_['joint_inclue_wire'] = '#include <Wire.h>';
	Blockly.Arduino.definitions_['joint_matrix_define' + matrixName] = 'Labplus_8x16matrix ' + matrixName + ' = Labplus_8x16matrix();';
	Blockly.Arduino.setups_['matirx_begin'+ matrixName] = matrixName + '.begin(0x70);';
	Blockly.Arduino.setups_['matrix_setBrightness'+ matrixName] = matrixName + '.setBrightness(1);';
	Blockly.Arduino.setups_['matirx_setRotation'+ matrixName] = matrixName + '.setRotation(1);';
	var code = matrixName + '.clear();\n';
	return code;
	
};

Blockly.Arduino.joint_writeToMatrix = function() {
	var matrixName = this.getFieldValue('dotName');
	Blockly.Arduino.definitions_['joint_include_gfx'] = '#include <Labplus_GFX.h>';
	Blockly.Arduino.definitions_['joint_include_ledbackpack'] = '#include <Labplus_LEDBackpack.h>';
	Blockly.Arduino.definitions_['joint_include_neopixel.h'] = '#include <Labplus_NeoPixel.h>';
	Blockly.Arduino.definitions_['joint_inclue_wire'] = '#include <Wire.h>';
	Blockly.Arduino.definitions_['joint_matrix_define' + matrixName] = 'Labplus_8x16matrix ' + matrixName + ' = Labplus_8x16matrix();';
	Blockly.Arduino.setups_['matirx_begin'+ matrixName] = matrixName + '.begin(0x70);';
	Blockly.Arduino.setups_['matrix_setBrightness'+ matrixName] = matrixName + '.setBrightness(1);';
	Blockly.Arduino.setups_['matirx_setRotation'+ matrixName] = matrixName + '.setRotation(1);';
	var code = matrixName + '.writeDisplay();\n';
	return code;
	
};

Blockly.Arduino.joint_curYear = function() {
	var code = this.getFieldValue('year');
	return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.joint_curMonth = function() {
	var code = this.getFieldValue('month');
	return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.joint_curDay = function() {
	var code = this.getFieldValue('day');
	return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.joint_weekDay = function() {
	var code = this.getFieldValue('week_day');
	return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.joint_curHour = function() {
	var code = this.getFieldValue('hour');
	return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.joint_curMinute = function() {
	var code = this.getFieldValue('minute');
	return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.joint_curSecond = function() {
	var code = this.getFieldValue('second');
	return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.joint_settime = function() {
	Blockly.Arduino.definitions_['joint_include_ds3231'] = '#include <DS3231.h>';
	Blockly.Arduino.definitions_['joint_inclue_wire'] = '#include <Wire.h>';
	Blockly.Arduino.definitions_['ds3231_define'] = 'DS3231 ds3231;';
	var year = Blockly.Arduino.valueToCode(this, 'year', Blockly.Arduino.ORDER_ATOMIC);
	var month = Blockly.Arduino.valueToCode(this, 'month', Blockly.Arduino.ORDER_ATOMIC);
	var date = Blockly.Arduino.valueToCode(this, 'day', Blockly.Arduino.ORDER_ATOMIC);
	var week_day = Blockly.Arduino.valueToCode(this, 'week_day', Blockly.Arduino.ORDER_ATOMIC);
	var hour = Blockly.Arduino.valueToCode(this, 'hour', Blockly.Arduino.ORDER_ATOMIC);
	var minute = Blockly.Arduino.valueToCode(this, 'minute', Blockly.Arduino.ORDER_ATOMIC);
	var second = Blockly.Arduino.valueToCode(this, 'second', Blockly.Arduino.ORDER_ATOMIC);
	var code = "ds3231.setYear(" + year + ");\n"
			+ "ds3231.setMonth(" + month + ");\n"
			+ "ds3231.setDate(" + date + ");\n"
			+ "ds3231.setDoW(" + week_day + ");\n"
			+ "ds3231.setHour(" + hour + ");\n"
			+ "ds3231.setMinute(" + minute + ");\n"
			+ "ds3231.setSecond(" + second + ");\n"
	return code;
};

Blockly.Arduino.joint_gettime = function() {
	Blockly.Arduino.definitions_['joint_include_ds3231'] = '#include <DS3231.h>';
	Blockly.Arduino.definitions_['joint_inclue_wire'] = '#include <Wire.h>';
	Blockly.Arduino.definitions_['ds3231_define'] = 'DS3231 ds3231;';
	Blockly.Arduino.setups_['wire_begin'] = 'Wire.begin();';
	var val = this.getFieldValue('DIR');
	var code = '';
	switch(val) {
		case 'joint_year':
			code = 'ds3231.getYear()';
			break;
		case 'joint_month':
			Blockly.Arduino.definitions_['var_declare_Century'] = 'bool __Century = false;\n';
			code = 'ds3231.getMonth(__Century)';
			break;
		case 'joint_day':
			code = 'ds3231.getDate()';
			break;
		case 'joint_week_day':
			code = 'ds3231.getDoW()';
			break;
		case 'joint_hour':
			Blockly.Arduino.definitions_['var_declare_h12;'] = 'bool __h12;\n';
			Blockly.Arduino.definitions_['var_declare_PM;'] = 'bool __PM;\n';
			code = 'ds3231.getHour(__h12, __PM)';
			break;
		case 'joint_minute':
			code = 'ds3231.getMinute()';
			break;
		case 'joint_second':
			code = 'ds3231.getSecond()';
			break;
	}
	return [code, Blockly.Arduino.ORDER_ATOMIC];
};


	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	