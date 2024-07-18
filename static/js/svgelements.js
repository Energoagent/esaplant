
//Общие

//SERVER_LOCATION = 'vpn.energoagent.com:8787';
//SERVER_LOCATION = '192.168.22.11:8787';
SERVER_LOCATION = 'localhost:8787';

STROKE_WIDTH = '1.0';

newAd = function(initX, initY, labelText) {	
	let ad = document.createElementNS('http://www.w3.org/2000/svg', 'text');
	ad.id = '';
	ad.setAttribute('x', initX);
	ad.setAttribute('y', initY);
	ad.innerHTML = labelText;
	ad.setAttribute('class', 'parameters');
	ad.alarm = function() {
		ad.id = 'alarm_blink';
		ad.style.display = '';
	};
	ad.warning = function() {
		ad.id = 'warn_blink';
		ad.style.display = '';
	};
	ad.norm = function() {
		ad.id = '';
		ad.style.display = '';
	};
	ad.hide = function() {
		ad.id = '';
		ad.style.display = 'none';
	};
	ad.setLabel = function(newLabelText) {
		ad.innerHTML = newlabelText;
		ad.style.display = '';
	};
	return ad;
}

//------

//Шаровая мельница


const MILL_SHAPE =`
<path d="M260,10 L60,10 L60,70 L260,70 L260,10 Z "/>
<path d="M60,0 L50,0 L50,79 L60,79 L60,0 Z "/>
<path d="M265,80 L278,80 L278,20 L265,20 L265,80 Z "/>
<path d="M281,80 L262,80 L262,84 L281,84 L281,80 Z "/>
<path d="M265,30 L260,30 L260,50 L265,50 L265,30 Z "/>
<path d="M32,80 L45,80 L45,20 L32,20 L32,80 Z "/>
<path d="M48,80 L29,80 L29,84 L48,84 L48,80 Z "/>
<path d="M50,30 L45,30 L45,50 L50,50 L50,30 Z "/>
<path d="M283,30 L278,30 L278,50 L283,50 L283,30 Z "/>
<path d="M283,33 L285,33 L285,47 L283,47 L283,33 Z "/>
<path d="M285,33 L290,26 L300,26 L300,47 L285,47 L285,33 Z "/>
<path d="M32,30 L27,30 L27,50 L32,50 L32,30 Z "/>
<path d="M25,33 L27,33 L27,47 L25,47 L25,33 Z "/>
<path d="M20,25 L0,25 L0,55 L20,55 L20,25 Z "/>
<line x1="25" y1="33" x2="20" y2="25"/>
<line x1="25" y1="47" x2="20" y2="55"/>
<path d="M17,25 L15,20 L5,20 L3,25 L17,25 Z "/>
<path d="M17,55 L15,60 L5,60 L3,55 L17,55 Z "/>`

MILL_ROTATION_RIGHT =
`<path d="M4,30 L4,2 A2,2 0 0,1 6,0 L12,0 A2,2 0 0,1 14,2 L14,16 "/>
<line x1="0" y1="40" x2="4" y2="30"/>
<line x1="4" y1="30" x2="8" y2="40"/>
<line x1="0" y1="40" x2="8" y2="40"/>`

MILL_ROTATION_LEFT =
`<path d="M64,30 L64,2 A2,2 0 0,0 62,0 L56,0 A2,2 0 0,0 54,2 L54,16 "/>
<path d="M64,40 L60,30 L68,30 L64,40 "/>`

millRotation = function(initHTML, initX, initY) {
	let elm = document.createElementNS('http://www.w3.org/2000/svg', 'g');
	elm.innerHTML = initHTML;
	elm.setAttribute('class', 'parameters');
	elm.setAttribute('transform', `translate(${initX}, ${initY}), scale(1)`);
	elm.setAttribute('fill', 'none');
	elm.setAttribute('stroke-width', STROKE_WIDTH);
	elm.style.stroke = 'green';
	elm.hide = function() {
		elm.style.display = 'none';
	};
	elm.run = function() {
		elm.style.display = '';
	};
	return elm;
}

newMill = function(elemId, initX, initY, initScale) {
	const PBP = {x: 1, y: -30};
	const millJSON = {
		elemId: [
			'ROT_LEFT', 'ROT_RIGTH',			// вращение влево-вправо
			'TMP_ACD', 							// авария-температура подшипников
			'RUN', 								// работа
			'ENG_PROT', 						// срабатывание защиты двигателя
			'ACD_ST',							// состояние авария
			'P1_1_TMP', 'P1_2_TMP', 'P1_3_TMP',	// температура подшипника со стороны привода
			'P2_1_TMP', 'P2_2_TMP', 'P2_3_TMP'	// температура подшипника со стороны загрузки
		]
	};
	
	requestProcessor = function() {
		let req = new XMLHttpRequest();
		if (!readyFlag) {return;}
		req.open('POST', 'http://' + SERVER_LOCATION);
		req.onreadystatechange = function() {
			if(this.readyState === 4 && this.status === 200) {
				readyFlag = true;
				resp = JSON.parse(this.response);
				keys = Object.keys(resp);
				agrId = keys[0];
				params = resp[agrId];
console.log(params);
				mill = mainUnit.getElementById(String(agrId));
			}
			else {
				readyFlag = true;
			};
		};
		req.setRequestHeader('Content-type', 'application/json; charset=utf-8');
		req.send(JSON.stringify(millJSON));
		readyFlag = false;
	};
	let mill = document.createElementNS('http://www.w3.org/2000/svg', 'g');
	mill.id = elemId + '_mill';
	mill.innerHTML = MILL_SHAPE;
	mill.secondDriver = mill.appendChild(newDriverReducer(PBP.x - 15, PBP.y + 85));
	mill.driver6Kv = mill.appendChild(newDriver6kV(PBP.x - 80, PBP.y + 55));
	mill.rotationLeft = mill.appendChild(millRotation(MILL_ROTATION_LEFT, PBP.x + 160, PBP.y + 30));
	mill.rotationRigth = mill.appendChild(millRotation(MILL_ROTATION_RIGHT, PBP.x + 100, PBP.y + 30));
//	mill.temperatureAccident = mill.appendChild(newAd(PBP.x, PBP.y, 'Температура подшипника авария'));
//	mill.driverRun = mill.appendChild(newAd(PBP.x, PBP.y + 6, 'Работа двигателя'));
	mill.driverProtection = mill.appendChild(newAd(PBP.x + 120, PBP.y + 60, 'Срабатывание защиты'));
	mill.accidentState = mill.appendChild(newAd(PBP.x + 120, PBP.y + 70, 'Аварийное состояние'));
	mill.P1_1_temperature = mill.appendChild(newAd(PBP.x + 70, PBP.y + 50, '0 C°'));
	mill.P1_2_temperature = mill.appendChild(newAd(PBP.x + 70, PBP.y + 60, '0 C°'));
	mill.P1_3_temperature = mill.appendChild(newAd(PBP.x + 70, PBP.y + 70, '0 C°'));
	mill.P2_1_temperature = mill.appendChild(newAd(PBP.x + 240, PBP.y + 50, '0 C°'));
	mill.P2_2_temperature = mill.appendChild(newAd(PBP.x + 240, PBP.y + 60, '0 C°'));
	mill.P2_3_temperature = mill.appendChild(newAd(PBP.x + 240, PBP.y + 70, '0 C°'));
	mill.label = mill.appendChild(newAd(PBP.x + 120, PBP.y + 50, 'Агрегат: ' + elemId));
	mill.setAttribute('transform', `translate(${initX}, ${initY}), scale(${initScale})`);
	mill.setAttribute('fill', 'none');
	mill.setAttribute('stroke-width', STROKE_WIDTH);
	mill.style.stroke = 'black';

	setInterval(requestProcessor, 5000);

	return mill;
}
				
const DRIVER_REDUCER =
`<path d="M5,28 L30,28 L30,8 L5,8 A3,3 0 0,0 2,11 L2,25 A3,3 0 0,0 5,28 Z "/>
<line x1="8" y1="8" x2="8" y2="28"/>
<line x1="10" y1="10" x2="28" y2="10"/>
<line x1="10" y1="13" x2="14" y2="13"/>
<line x1="26" y1="13" x2="28" y2="13"/>
<line x1="10" y1="26" x2="28" y2="26"/>
<line x1="10" y1="23" x2="14" y2="23"/>
<line x1="26" y1="23" x2="28" y2="23"/>
<path d="M17,23 L23,23 A1,1 0 0,0 24,22 L24,14 A1,1 0 0,0 23,13 L17,13 A1,1 0 0,0 16,14 L16,22 A1,1 0 0,0 17,23 Z "/>
<path d="M17,23 L19,23 L19,25 L17,25 L17,23 Z "/>
<path d="M21,23 L23,23 L23,25 L21,25 L21,23 Z "/>
<path d="M30,13 L33,13 L33,23 L30,23 L30,13 Z "/>
<path d="M2,14 L1,14 A1,1 0 0,0 0,15 L0,21 A1,1 0 0,0 1,22 L2,22 L2,14 Z "/>
<path d="M33,26 L38,26 L38,11 L33,11 L33,26 Z "/>
<path d="M38,0 L43,0 L43,21 L38,21 L38,0 Z "/>`


newDriverReducer = function(initX, initY) {
	let elm = document.createElementNS('http://www.w3.org/2000/svg', 'g');
	elm.innerHTML = DRIVER_REDUCER;
	elm.setAttribute('transform', `translate(${initX}, ${initY}), scale(1)`);
	elm.setAttribute('fill', 'none');
	elm.setAttribute('stroke-width', STROKE_WIDTH);
	elm.style.stroke = 'black';
	elm.notReady = function() {
		elm.setAttribute('fill', 'orange');
	};
	elm.ready = function() {
		elm.setAttribute('fill', 'blue');
	};
	elm.run = function() {
		elm.setAttribute('fill', 'green');
	};
	elm.alarm = function() {
		elm.setAttribute('fill', 'red');
	};
	return elm;
}

const DRIVER_6_KV =
`<path d="M18,0 L16,0 A8,8 0 0,0 8,8 L8,22 A8,8 0 0,0 16,30 L18,30 "/>
<path d="M58,0 L60,0 A8,8 0 0,1 68,8 L68,22 A8,8 0 0,1 60,30 L58,30 "/>
<path d="M18,33 L58,33 L58,40 L18,40 L18,33 Z "/>
<path d="M20,28 L26,28 L26,33 L20,33 L20,28 Z "/>
<path d="M50,28 L56,28 L56,33 L50,33 L50,28 Z "/>
<path d="M20,30 L18,30 L18,0 L58,0 L58,30 L56,30 "/>
<path d="M50,30 L48,30 "/>
<path d="M28,30 L26,30 "/>
<path d="M48,32 L28,32 L28,12 A2,2 0 0,1 30,10 L46,10 A2,2 0 0,1 48,12 L48,32 Z "/>
<path d="M8,20 L2,20 A2,2 0 0,1 0,18 L0,12 A2,2 0 0,1 2,10 L8,10 L8,20 Z "/>
<path d="M73,7 L78,7 L78,23 L73,23 L73,7 Z "/>
<path d="M68,13 L73,13 L73,17 L68,17 L68,13 Z "/>`

newDriver6kV = function(initX, initY) {
	let elm = document.createElementNS('http://www.w3.org/2000/svg', 'g');
	elm.innerHTML = DRIVER_6_KV;
	elm.setAttribute('transform', `translate(${initX}, ${initY}), scale(1)`);
	elm.setAttribute('fill', 'none');
	elm.setAttribute('stroke-width', STROKE_WIDTH);
	elm.stroke = 'black';
	elm.notReady = function() {
		elm.setAttribute('fill', 'orange');
	};
	elm.ready = function() {
		elm.setAttribute('fill', 'blue');
	};
	elm.run = function() {
		elm.setAttribute('fill', 'green');
	};
	elm.alarm = function() {
		elm.setAttribute('fill', 'red');
	};
	return elm;
}

const OIL_STATION =
`<path d="M30,30 L0,30 L0,2 A2,2 0 0,1 2,0 L28,0 A2,2 0 0,1 30,2 L30,30 Z " fill="white"/>
<circle cx="20" cy="10" r="7"/>
<path d="M10,10 L3,10 A2,2 0 0,1 1,8 L1,6 A2,2 0 0,1 3,4 L10,4 L10,10 Z "/>
<path d="M10,5 L11,5 L11,9 L10,9 L10,5 Z "/>
<path d="M11,6 L12,6 L12,8 L11,8 L11,6 Z "/>
<line x1="3" y1="10" x2="3" y2="4"/>
<line x1="4" y1="5" x2="9" y2="5"/>
<line x1="4" y1="7" x2="9" y2="7"/>
<line x1="4" y1="9" x2="9" y2="9"/>
<path d="M10,26 L3,26 A2,2 0 0,1 1,24 L1,22 A2,2 0 0,1 3,20 L10,20 L10,26 Z "/>
<path d="M10,21 L11,21 L11,25 L10,25 L10,21 Z "/>
<path d="M11,22 L12,22 L12,24 L11,24 L11,22 Z "/>
<line x1="3" y1="26" x2="3" y2="20"/>
<line x1="4" y1="21" x2="9" y2="21"/>
<line x1="4" y1="23" x2="9" y2="23"/>
<line x1="4" y1="25" x2="9" y2="25"/>
<line x1="14" y1="10" x2="16" y2="10"/>
<line x1="16" y1="14" x2="17" y2="13"/>
<line x1="20" y1="16" x2="20" y2="14"/>
<line x1="24" y1="14" x2="23" y2="13"/>
<line x1="26" y1="10" x2="24" y2="10"/>
<line x1="24" y1="6" x2="23" y2="7"/>
<line x1="20" y1="4" x2="20" y2="6"/>
<line x1="16" y1="6" x2="17" y2="7"/>
<line x1="20" y1="10" x2="23" y2="4"/>`

newOilStation = function(elemId, initX, initY, initScale) {
	let os = document.createElementNS('http://www.w3.org/2000/svg', 'g');
	os.id = elemId;
	os.innerHTML = OIL_STATION;
	os.label = os.appendChild(newAd(12, 25, elemId));
	os.setAttribute('transform', `translate(${initX}, ${initY}), scale(${initScale})`);
	os.setAttribute('fill', 'none');
	os.setAttribute('stroke-width', STROKE_WIDTH);
	os.style.stroke = 'black';
	return os;
}

// ------

// ленточный транспортер

const CONVEYOR_TENSION_DRUM_SHAPE =
`<circle cx="9" cy="9" r="9"/>
<circle cx="9" cy="9" r="2"/>
<path d="M7,7 L11,7 L11,11 L7,11 L7,7 Z "/>
<path d="M17,7 L20,7 L20,11 L17,11 L17,7 Z "/>
<line x1="11" y1="7" x2="13" y2="11"/>
<line x1="13" y1="11" x2="15" y2="7"/>
<line x1="15" y1="7" x2="17" y2="11"/>`

const CONVEYOR_MOTOR_DRUM_SHAPE =
`<path d="M7,6 L0,19 L0,20 L18,20 L18,19 L11,6 L7,6"/>
<circle cx="9" cy="9" r="9"/>
<circle cx="9" cy="9" r="2"/>`

newTensionDrum = function(elemId, initX, initY, initMirror) {	
	let convTension = document.createElementNS('http://www.w3.org/2000/svg', 'g');
	convTension.id = elemId + '_tn';
	convTension.innerHTML = CONVEYOR_TENSION_DRUM_SHAPE;
	convTension.setAttribute('fill', 'none');
	convTension.setAttribute('stroke-width', STROKE_WIDTH);
	convTension.setAttribute('stroke', 'black');
	if (initMirror) {
		convTension.setAttribute('transform', `translate(${initX + 18}, ${initY + 18}), scale(-1)`);
	}
	else {
		convTension.setAttribute('transform', `translate(${initX}, ${initY}), scale(1)`);
	};
	convTension.alarm = function() {
		convTension.setAttribute('fill', 'red');
	};
	convTension.norm = function() {
		convTension.setAttribute('fill', 'gray');
	};
	return convTension;
}

newMotorDrum = function(elemId, initX, initY) {	
	let convMotor = document.createElementNS('http://www.w3.org/2000/svg', 'g');
	convMotor.id = elemId + '_m';
	convMotor.innerHTML = CONVEYOR_MOTOR_DRUM_SHAPE;
	convMotor.setAttribute('transform', `translate(${initX}, ${initY}), scale(1)`);
	convMotor.fill = 'none';
	convMotor.style.stroke = 'black';
	convMotor.setAttribute('stroke-width', STROKE_WIDTH);
	convMotor.notReady = function() {
		convMotor.setAttribute('fill', 'orange');
	};
	convMotor.ready = function() {
		convMotor.setAttribute('fill', 'blue');
	};
	convMotor.run = function() {
		convMotor.setAttribute('fill', 'green');
	};
	convMotor.alarm = function() {
		convMotor.setAttribute('fill', 'red');
	};
	return convMotor;
};

newConveyor = function(elemId, initX, initY, initLength, initAngle, initMirror, initScale) {
	
	conveyorJSON = {
		elemId: [
			'ATS_WORK',		//УПП в работе
			'SW_STATUS',	// положение АВ
			'ATS_RD',		//УПП готов
			'ES_ATV',		// АС АТВ
			'ES_NPU',		// АС МПУ
			'ES_EXT',		// АС доп стоп-кнопка 
			'ES_CAB',		// АС шкаф
			'ES_PULT',		// АС пульт
			'ALR_SPEED',	//ДКМС авария
			'ALR_DKSL1',
			'ALR_DKSL2',
			'WRN_DKSL1',
			'WRN_DKSL2',
			'ES_BLOCK',		// аварийная блокировка
			'GREEN_LP',		// лампа на пульте
			'RED_LP',		// лампа на пульте
			'StW1',
			'StW2'
		]
	};
	
	requestProcessor = function() {
		let req = new XMLHttpRequest();
		if (!readyFlag) {return;}
		req.open('POST', 'http://' + SERVER_LOCATION);
		req.onreadystatechange = function() {
			if(this.readyState === 4 && this.status === 200) {
				readyFlag = true;
				resp = JSON.parse(this.response);
				keys = Object.keys(resp);
				agrId = keys[0];
				params = resp[agrId];
//console.log(params);
				conveyor = mainUnit.getElementById(String(agrId));
				if (params.ATS_RD[0] === 1) {conveyor.motor.ready()} else {conveyor.motor.notReady()};
				if (params.ATS_WORK[0] === 1) {conveyor.motor.run()}; 
				if (params.SW_STATUS[0] === 0) {conveyor.motor.alarm()};
				if (params.ALR_SPEED[0] === 1) {conveyor.drum.alarm()} else {conveyor.drum.norm()};
				if (params.ES_NPU[0] === 1) {conveyor.ES_NPU.alarm()} else {conveyor.ES_NPU.hide()};
//				if (params.ES_PULT[0] === 1) {conveyor.ES_PULT.alarm()} else {conveyor.ES_PULT.norm()};
				if (params.ES_EXT[0] === 1) {conveyor.ES_EXT.alarm()} else {conveyor.ES_EXT.hide()};
				if (params.ES_ATV[0] === 1) {conveyor.ES_ATV.alarm()} else {conveyor.ES_ATV.hide()};
				if (params.WRN_DKSL1[0] === 1) 
					{conveyor.DKSL1.warning()}
				else
					if (params.ALR_DKSL1[0] === 1)
						{conveyor.DKSL1.alarm()}
					else {conveyor.DKSL1.hide()};
				if (params.WRN_DKSL2[0] === 1) 
					{conveyor.DKSL2.warning()}
				else
					if (params.ALR_DKSL2[0] === 1)
						{conveyor.DKSL1.alarm()}
					else {conveyor.DKSL2.hide()};
				}
			else {
				readyFlag = true;
			};
		};
		req.setRequestHeader('Content-type', 'application/json; charset=utf-8');
		req.send(JSON.stringify(conveyorJSON));
		readyFlag = false;
	};

	let convTape1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
	convTape1.setAttribute('x1', 9);
	convTape1.setAttribute('x2', 9 + initLength);
	convTape1.setAttribute('y1', 0);
	convTape1.setAttribute('y2', 0);
	let convTape2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
	convTape2.setAttribute('x1', 9);
	convTape2.setAttribute('x2', 9 + initLength);
	convTape2.setAttribute('y1', 18);
	convTape2.setAttribute('y2', 18);
	let conveyor = document.createElementNS('http://www.w3.org/2000/svg', 'g');
	
	conveyor.id = elemId;
	
	if (initMirror) {
		conveyor.drum = conveyor.appendChild(newTensionDrum(elemId, initLength, 0, true));
		conveyor.motor = conveyor.appendChild(newMotorDrum(elemId, 0, 0));
		conveyor.DKSL2 = conveyor.appendChild(newAd(initLength - 24, 7, 'ДКСЛ'));
		conveyor.ES_EXT = conveyor.appendChild(newAd(initLength - 24, 16, 'СТОП'));
		conveyor.DKSL1 = conveyor.appendChild(newAd(22, 7, 'ДКСЛ'));
		conveyor.ES_NPU = conveyor.appendChild(newAd(22, 16, 'СТОП'));
	}
	else {
		conveyor.motor = conveyor.appendChild(newMotorDrum(elemId, initLength, 0));
		conveyor.drum = conveyor.appendChild(newTensionDrum(elemId, 0, 0, false));
		conveyor.DKSL1 = conveyor.appendChild(newAd(initLength - 24, 7, 'ДКСЛ'));
		conveyor.ES_NPU = conveyor.appendChild(newAd(initLength - 24, 16, 'СТОП'));
		conveyor.DKSL2 = conveyor.appendChild(newAd(22, 7, 'ДКСЛ'));
		conveyor.ES_EXT = conveyor.appendChild(newAd(22, 16, 'СТОП'));
	};
	conveyor.ES_ATV = conveyor.appendChild(newAd(initLength/2, 10, 'АТВ'));
	conveyor.label = conveyor.appendChild(newAd(initLength * 0.65, 10, elemId));
	conveyor.appendChild(convTape1);
	conveyor.appendChild(convTape2);

	conveyor.setAttribute('transform', `translate(${initX}, ${initY}), scale(${initScale})`);
	conveyor.fill = 'none';
	conveyor.setAttribute('stroke', 'black');
	conveyor.setAttribute('stroke-width', STROKE_WIDTH);

	conveyor.notReady = function() {
		conveyor.setAttribute('fill', 'orange');
	};
	conveyor.ready = function() {
		conveyor.setAttribute('fill', 'blue');
	};
	conveyor.run = function() {
		conveyor.setAttribute('fill', 'green');
	};
	conveyor.alarm = function() {
		conveyor.setAttribute('fill', 'red');
	};
	conveyor.DKSL1.hide();
	conveyor.DKSL2.hide();
	conveyor.ES_NPU.hide();
	conveyor.ES_EXT.hide();
	conveyor.ES_ATV.hide();
	
	setInterval(requestProcessor, 5000);
	
	return conveyor;
};

//-----

//---Элеватор

const ELEVATOR_HEAD_SHAPE =
`<path d="M0,30 L0,13 A13,13 0 1,1 26,14 L35,26 L20,26 L20,30 L0,30 Z "/>`;
const ELEVATOR_SHAPE =
`<path d="M0,110 L35,110 L35,130 L12,130 L0,110 Z "/>
<circle cx="25" cy="120" r="3"/>
<path d="M23,116 L27,115 L23,114 L27,113 L23,112 L27,111 "/>
<rect x="23" y="116" width="4" height="5"/>
<rect x="23" y="110" width="4" height="1"/>`;


newElevator = function(elemId, initX, initY, initHeight, initMirror, initScale) {
	let elevator = document.createElementNS('http://www.w3.org/2000/svg', 'g');
	elevator.id = elemId;
	let elevatorHead = document.createElementNS('http://www.w3.org/2000/svg', 'g');
	elevatorHead.innerHTML = ELEVATOR_HEAD_SHAPE;
	if (initMirror) {
		elevatorHead.setAttribute('transform', `translate(35, ${ 0 - initHeight}), scale(-1, 1)`);
	}
	else {
		elevatorHead.setAttribute('transform', `translate(15, ${ 0 - initHeight}), scale(1)`);
	};
	elevator.motor = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
	elevator.motor.setAttribute('cx', 13);
	elevator.motor.setAttribute('cy', 12);
	elevator.motor.setAttribute('r', 8);
	elevatorHead.appendChild(elevator.motor);
	elevator.setAttribute('transform', `translate(${initX}, ${initY}), scale(${initScale})`);
	elevator.setAttribute('fill', 'none');
	elevator.style.stroke = 'black';
	elevator.setAttribute('stroke-width', STROKE_WIDTH);
	let elevatorTube= document.createElementNS('http://www.w3.org/2000/svg', 'rect');
	elevatorTube.setAttribute('x', 15);
	elevatorTube.setAttribute('y', 30 - initHeight);
	elevatorTube.setAttribute('width', 20);
	elevatorTube.setAttribute('height', 80 + initHeight);
	let elevatorFoot= document.createElementNS('http://www.w3.org/2000/svg', 'g');
	elevatorFoot.innerHTML = ELEVATOR_SHAPE;
	if (initMirror) {
		elevatorFoot.setAttribute('transform', `translate(50, 0), scale(-1, 1)`);
	}
	else {
		elevatorFoot.setAttribute('transform', `translate(0, 0), scale(1)`);
	};
	elevator.appendChild(elevatorHead);
	elevator.appendChild(elevatorTube);
	elevator.appendChild(elevatorFoot);
	elevator.run = function() {
		elevator.motor.setAttribute('fill', 'green');
	};
	return elevator;
};
//-----