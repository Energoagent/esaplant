
//Общие

//SERVER_LOCATION = 'vpn.energoagent.com:8787';
//SERVER_LOCATION = '192.168.22.11:8787';
const SERVER_LOCATION = 'localhost:8787';

const STROKE_WIDTH = '1.0';


// метка
newAd = function(initX, initY, labelText) {	
	let ad = document.createElementNS('http://www.w3.org/2000/svg', 'text');
	ad.id = '';
	ad.setAttribute('x', initX);
	ad.setAttribute('y', initY);
	ad.innerHTML = labelText;
	ad.setAttribute('class', 'parameters');
	ad.alarm = function() {
		ad.style.stroke = 'red';
		ad.style.fill = 'red';
		ad.style.display = '';
	};
	ad.warning = function() {
		ad.style.stroke = 'orange';
		ad.style.fill = 'orange';
		ad.style.display = '';
	};
	ad.norm = function() {
		ad.style.stroke = 'black';
		ad.style.fill = 'black';
		ad.style.display = '';
	};
	ad.hide = function() {
		ad.id = '';
		ad.style.display = 'none';
	};
	ad.setText = function(newLabelText) {
		ad.innerHTML = newLabelText;
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
//	elm.setAttribute('class', 'parameters');
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

newMill = function(elemId, initX, initY) {
	const PBP = {x: 1, y: -30};

	requestProcessor = function() {
		let req = new XMLHttpRequest();
		req.open('GET', 'http://' + SERVER_LOCATION + '/data?AGR=' + elemId);
		req.onreadystatechange = function() {
			if(this.readyState === 4 && this.status === 200) {
				resp = JSON.parse(this.response);
				keys = Object.keys(resp);
				agrId = keys[0];
				params = resp[agrId];
console.log(params);
				mill = mainUnit.getElementById(agrId);
				if (mill) {
					if (params.MILL_WORK[0] === 1) {mill.driver6Kv.run()} else {mill.driver6Kv.notReady()};
					mill.PRESSURE_1.setText(params.PRESSURE_1[0][0] + 'кПа');
					mill.P1_1_temperature.setText(params.P1_1_TEMP[0] + 'C°');
					mill.P1_2_temperature.setText(params.P1_2_TEMP[0] + 'C°');
					mill.P1_3_temperature.setText(params.P1_3_TEMP[0] + 'C°');
					mill.PRESSURE_2.setText(params.PRESSURE_2[0][0] + 'кПа');
					mill.P2_1_temperature.setText(params.P2_1_TEMP[0] + 'C°');
					mill.P2_2_temperature.setText(params.P2_2_TEMP[0] + 'C°');
					mill.P2_3_temperature.setText(params.P2_3_TEMP[0] + 'C°');
					if (params.BLK_1_601[0] === 1) {mill.os_1_601.block()} else {mill.os_1_601.norm()};
					if (params.BLK_1_602[0] === 1) {mill.os_1_602.block()} else {mill.os_1_602.norm()};
					if (params.BLK_CHAIN_INSTALL[0] === 1) {mill.fenceControl.alarm()} else {mill.chainControl.hide()};
					if (params.FENCE_REM[0] === 1) {mill.fenceControl.alarm()} else {mill.fenceControl.hide()};
				};
			};
		};
		req.send();
	};
	
	let mill = document.createElementNS('http://www.w3.org/2000/svg', 'g');
	mill.id = elemId;
	mill.innerHTML = MILL_SHAPE;
	mill.secondDriver = mill.appendChild(newDriverReducer(PBP.x - 15, PBP.y + 85));
	mill.driver6Kv = mill.appendChild(newDriver6kV(PBP.x - 80, PBP.y + 55));
	mill.chainControl = mill.appendChild(newAd(PBP.x - 85, PBP.y + 105, 'цепь установлена'));
	mill.fenceControl = mill.appendChild(newAd(PBP.x - 85, PBP.y + 115, 'ограждение снято'));
	mill.rotationLeft = mill.appendChild(millRotation(MILL_ROTATION_LEFT, PBP.x + 160, PBP.y + 30));
	mill.rotationLeft.hide();
	mill.rotationRigth = mill.appendChild(millRotation(MILL_ROTATION_RIGHT, PBP.x + 100, PBP.y + 30));
	mill.rotationRigth.hide();
//	mill.temperatureAccident = mill.appendChild(newAd(PBP.x, PBP.y, 'Температура подшипника авария'));
//	mill.driverRun = mill.appendChild(newAd(PBP.x, PBP.y + 6, 'Работа двигателя'));
	mill.driverProtection = mill.appendChild(newAd(PBP.x + 120, PBP.y + 60, 'Срабатывание защиты'));
	mill.accidentState = mill.appendChild(newAd(PBP.x + 120, PBP.y + 70, 'Аварийное состояние'));
	mill.PRESSURE_1 = mill.appendChild(newAd(PBP.x + 30, PBP.y + 40, 'кПа'));
	mill.P1_1_temperature = mill.appendChild(newAd(PBP.x + 70, PBP.y + 50, '0 C°'));
	mill.P1_2_temperature = mill.appendChild(newAd(PBP.x + 70, PBP.y + 60, '0 C°'));
	mill.P1_3_temperature = mill.appendChild(newAd(PBP.x + 70, PBP.y + 70, '0 C°'));
	mill.PRESSURE_2 = mill.appendChild(newAd(PBP.x + 260, PBP.y + 40, 'кПа'));
	mill.P2_1_temperature = mill.appendChild(newAd(PBP.x + 240, PBP.y + 50, '0 C°'));
	mill.P2_2_temperature = mill.appendChild(newAd(PBP.x + 240, PBP.y + 60, '0 C°'));
	mill.P2_3_temperature = mill.appendChild(newAd(PBP.x + 240, PBP.y + 70, '0 C°'));
	mill.os_1_601 = mill.appendChild(newOilStation('', 65, 52, 1));
	mill.os_1_602 = mill.appendChild(newOilStation('', 220, 52, 1));
	mill.label = mill.appendChild(newAd(PBP.x + 120, PBP.y + 50, elemId));
	mill.setAttribute('transform', `translate(${initX}, ${initY}), scale(1)`);
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
	os.setAttribute('transform', `translate(${initX}, ${initY}), scale(1)`);
	os.setAttribute('fill', 'none');
	os.setAttribute('stroke-width', STROKE_WIDTH);
	os.style.stroke = 'black';
	os.block = function(){
		os.style.stroke = 'red';
	};
	os.norm = function(){
		os.style.stroke = 'green';
	};
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

newTensionDrum = function(initX, initY, initAngle) {	
	let convTension = document.createElementNS('http://www.w3.org/2000/svg', 'g');
	convTension.innerHTML = CONVEYOR_TENSION_DRUM_SHAPE;
	convTension.setAttribute('fill', 'none');
	convTension.setAttribute('stroke-width', STROKE_WIDTH);
	convTension.setAttribute('stroke', 'black');
	convTension.setAttribute('transform', `translate(${initX}, ${initY}) rotate(${initAngle}, 9, 9)`);
	convTension.alarm = function() {
		convTension.setAttribute('fill', 'red');
	};
	convTension.norm = function() {
		convTension.setAttribute('fill', 'gray');
	};
	return convTension;
}

newConveyor = function(elemId, initMotorX, initMotorY, initDrumX, initDrumY) {
	
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
		]
	};
	
	requestProcessor = function() {
		let req = new XMLHttpRequest();
		req.open('GET', 'http://' + SERVER_LOCATION + '/data?AGR=' + elemId);
		req.onreadystatechange = function() {
			if(this.readyState === 4 && this.status === 200) {
				resp = JSON.parse(this.response);
				keys = Object.keys(resp);
				agrId = keys[0];
				params = resp[agrId];
				conveyor = mainUnit.getElementById(agrId);
				if (conveyor) {
					if (params.ATS_RD[0] === 1) {conveyor.motor.ready()} else {conveyor.motor.notReady()};
					if (params.ATS_WORK[0] === 1) {conveyor.motor.run()}; 
					if (params.SW_STATUS[0] === 0) {conveyor.motor.alarm()};
					if (params.ALR_SPEED[0] === 1) {conveyor.drum.alarm()} else {conveyor.drum.norm()};
					if (params.ES_MPU[0] === 1) {conveyor.ES_MPU.alarm()} else {conveyor.ES_MPU.hide()};
					if (params.ES_ATV[0] === 1) {conveyor.ES_ATV.alarm()} else {conveyor.ES_ATV.hide()};
					if (params.ES_EXT[0] === 1) {conveyor.ES_EXT.alarm()} else {conveyor.ES_EXT.hide()};
					if (params.ES_ATV[0] === 1) {conveyor.ES_ATV.alarm()} else {conveyor.ES_ATV.hide()};
					conveyor.DKSL1.hide();
					if (params.WRN_DKSL1[0] === 1) {conveyor.DKSL1.warning()};
					if (params.ALR_DKSL1[0] === 1) {conveyor.DKSL1.alarm()}
					conveyor.DKSL2.hide();
					if (params.WRN_DKSL2[0] === 1) {conveyor.DKSL2.warning()};
					if (params.ALR_DKSL2[0] === 1) {conveyor.DKSL2.alarm()}
				};
			};
		};
		req.send();
	};

	newMotorDrum = function(initX, initY) {	
		let motor = document.createElementNS('http://www.w3.org/2000/svg', 'g');
		motor.innerHTML = CONVEYOR_MOTOR_DRUM_SHAPE;
		motor.setAttribute('transform', `translate(${initX}, ${initY})`);
		motor.fill = 'none';
		motor.style.stroke = 'black';
		motor.setAttribute('stroke-width', STROKE_WIDTH);
		motor.notReady = function() {motor.setAttribute('fill', 'orange')};
		motor.ready = function() {motor.setAttribute('fill', 'blue')};
		motor.run = function() {motor.setAttribute('fill', 'green')};
		motor.alarm = function() {motor.setAttribute('fill', 'red')};
		return motor;
	};


	let motorCP = {'x': initMotorX + 9, 'y': initMotorY + 9, 'dx': initDrumX - initMotorX, 'dy': initDrumY - initMotorY};
	let drumCP = {'x': initDrumX + 9, 'y': initDrumY + 9};
	let initAngle = 0;
	if (motorCP.dx !== 0) {initAngle = Math.atan(motorCP.dy / motorCP.dx)};
	let dl = 0;
	if (initAngle > 0) 
		{dl = motorCP.dy / Math.tan((Math.PI - initAngle) / 2)}
		else {dl = - motorCP.dy / Math.tan((Math.PI + initAngle) / 2)};
	initAngle = initAngle * 180 / Math.PI;
//console.log(elemId, motorCP, drumCP, initAngle, dl);

	let convTape1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
	convTape1.setAttribute('x1', motorCP.x);
	convTape1.setAttribute('x2', drumCP.x + dl);
	convTape1.setAttribute('y1', motorCP.y - 9);
	convTape1.setAttribute('y2', motorCP.y - 9);
	convTape1.setAttribute('transform', `rotate(${initAngle}, ${motorCP.x}, ${motorCP.y})`);

	let convTape2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
	convTape2.setAttribute('x1', motorCP.x);
	convTape2.setAttribute('x2', drumCP.x + dl);
	convTape2.setAttribute('y1', motorCP.y + 9);
	convTape2.setAttribute('y2', motorCP.y + 9);
	convTape2.setAttribute('transform', `rotate(${initAngle}, ${motorCP.x}, ${motorCP.y})`);

	let conveyor = document.createElementNS('http://www.w3.org/2000/svg', 'g');
	
	conveyor.id = elemId;
	

	conveyor.motor = conveyor.appendChild(newMotorDrum(motorCP.x - 9, motorCP.y - 9));
	conveyor.drum = conveyor.appendChild(newTensionDrum(drumCP.x - 9, drumCP.y - 9, initAngle + 180));

	conveyor.DKSL1 = conveyor.appendChild(newAd(initMotorX + 24, initMotorY + 7, 'ДКСЛ'));
	conveyor.ES_MPU = conveyor.appendChild(newAd(initMotorX + 24, initMotorY + 16, 'АС'));
	conveyor.DKSL2 = conveyor.appendChild(newAd(initDrumX - 24, initDrumY + 7, 'ДКСЛ'));
	conveyor.ES_EXT = conveyor.appendChild(newAd(initDrumX - 24, initDrumY + 16, 'АС'));
	conveyor.ES_ATV = conveyor.appendChild(newAd((initDrumX - initMotorX) * 0.5 + initMotorX, (initDrumY - initMotorY) * 0.5 + initMotorY + 10, 'АТВ'));
	conveyor.label = conveyor.appendChild(newAd((initDrumX - initMotorX) * 0.5 - 15 + initMotorX, (initDrumY - initMotorY) * 0.5 + initMotorY + 10, elemId));
	conveyor.appendChild(convTape1);
	conveyor.appendChild(convTape2);

	conveyor.fill = 'none';
	conveyor.setAttribute('stroke', 'black');
	conveyor.setAttribute('stroke-width', STROKE_WIDTH);

	conveyor.notReady = function() {conveyor.motor.notReady()};
	conveyor.ready = function() {conveyor.motor.ready()};
	conveyor.run = function() {conveyor.motor.run()};
	conveyor.alarm = function() {conveyor.motor.alarm()};
	
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

newElevator = function(elemId, initX, initY, initHeight, initMirror) {
	elevatorJSON = {
		elemId: [
			'ATS_WORK',		//УПП в работе
			'SW_STATUS',	// положение АВ
			'ATS_RD',		//УПП готов
			'ES_NPU',		// АС МПУ
			'ES_EXT',		// АС доп стоп-кнопка 
			'ES_CAB',		// АС шкаф
			'ES_PULT',		// АС пульт
			'ES_BLOCK',		// аварийная блокировка
			'GREEN_LP',		// лампа на пульте
			'RED_LP',		// лампа на пульте
		]
	};
	
	requestProcessor = function() {
		let req = new XMLHttpRequest();
		req.open('GET', 'http://' + SERVER_LOCATION + '/data?AGR=' + elemId);
		req.onreadystatechange = function() {
			if(this.readyState === 4 && this.status === 200) {
				resp = JSON.parse(this.response);
				keys = Object.keys(resp);
				agrId = keys[0];
				params = resp[agrId];
				elevator = mainUnit.getElementById(agrId);
				if (elevator) {
					if (params.ATS_RD[0] === 1) {elevator.ready()} else {elevator.notReady()};
					if (params.ATS_WORK[0] === 1) {elevator.run()}; 
					if (params.SW_STATUS[0] === 0) {elevator.alarm()};
					if (params.ES_MPU[0] === 1) {elevator.ES_MPU.alarm()} else {elevator.ES_MPU.hide()};
					if (params.ES_EXT[0] === 1) {elevator.ES_EXT.alarm()} else {elevator.ES_EXT.hide()};
					elevator.norm();
//					if (params.... === 1) {elevator.clogged()};
//					if (params.... === 1) {elevator.chainBreak()};
				};
			};
		};
		req.send();
	};


	let elevator = document.createElementNS('http://www.w3.org/2000/svg', 'g');
	elevator.id = elemId;
	let elevatorHead = document.createElementNS('http://www.w3.org/2000/svg', 'g');
	elevatorHead.innerHTML = ELEVATOR_HEAD_SHAPE;
	if (initMirror) {elevatorHead.setAttribute('transform', `translate(35, ${ 0 - initHeight}), scale(-1, 1)`)}
	else {elevatorHead.setAttribute('transform', `translate(15, ${ 0 - initHeight}), scale(1)`)};
	elevator.motor = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
	elevator.motor.setAttribute('cx', 13);
	elevator.motor.setAttribute('cy', 12);
	elevator.motor.setAttribute('r', 8);
	elevatorHead.appendChild(elevator.motor);
	elevator.setAttribute('transform', `translate(${initX}, ${initY}), scale(1)`);
	elevator.setAttribute('fill', 'none');
	elevator.style.stroke = 'black';
	elevator.setAttribute('stroke-width', STROKE_WIDTH);
	let elevatorTube= document.createElementNS('http://www.w3.org/2000/svg', 'rect');
	elevatorTube.setAttribute('x', 15);
	elevatorTube.setAttribute('y', 30 - initHeight);
	elevatorTube.setAttribute('width', 20);
	elevatorTube.setAttribute('height', 80 + initHeight);
	elevator.foot = document.createElementNS('http://www.w3.org/2000/svg', 'g');
	elevator.foot.innerHTML = ELEVATOR_SHAPE;
	if (initMirror) {elevator.foot.setAttribute('transform', `translate(50, 0), scale(-1, 1)`)}
	else {elevator.foot.setAttribute('transform', `translate(0, 0), scale(1)`)};
	elevator.head = elevator.appendChild(elevatorHead);
	elevator.tube = elevator.appendChild(elevatorTube);
	elevator.appendChild(elevator.foot);
	elevator.label = elevator.appendChild(newAd(16, 50, elemId));
	elevator.ES_MPU = elevator.appendChild(newAd(18, 28 - initHeight, 'АС'));
	elevator.ES_EXT = elevator.appendChild(newAd(18, 107, 'АС'));
	elevator.ready = function() {elevator.motor.setAttribute('fill', 'blue')};
	elevator.notReady = function() {elevator.motor.setAttribute('fill', 'orange')};
	elevator.run = function() {elevator.motor.setAttribute('fill', 'green')};
	elevator.alarm = function() {elevator.motor.setAttribute('fill', 'red')};
	elevator.clogged = function() {elevator.foot.setAttribute('fill', 'red')};
	elevator.chainBreak = function() {elevator.tube.setAttribute('fill', 'red')};
	elevator.norm = function() {
		elevator.tube.setAttribute('fill', 'none');
		elevator.foot.setAttribute('fill', 'none');
	};

	setInterval(requestProcessor, 5000);

	return elevator;
};
//-----

//---Бункер

const BUNKER_SHAPE = `<path d="M50,40 L30,70 L20,70 L0,40 L50,40 "/><path d="M0,0 L50,0 L50,40 L0,40 L0,0 Z "/>`;

newBunker = function(elemId, initX, initY) {
	
	requestProcessor = function() {
		let req = new XMLHttpRequest();
		req.open('GET', 'http://' + SERVER_LOCATION + '/data?AGR=' + elemId);
		req.onreadystatechange = function() {
			if(this.readyState === 4 && this.status === 200) {
				resp = JSON.parse(this.response);
				keys = Object.keys(resp);
				agrId = keys[0];
				params = resp[agrId];
				bunker = mainUnit.getElementById(agrId);
				if (bunker) {
				};
			};
		};
		req.send();
	};

	let bunker = document.createElementNS('http://www.w3.org/2000/svg', 'g');
	bunker.id = elemId;
	bunker.setAttribute('transform', `translate(${initX}, ${initY}), scale(1)`);
	bunker.setAttribute('fill', 'none');
	bunker.style.stroke = 'black';
	bunker.setAttribute('stroke-width', STROKE_WIDTH);
	let bunkerCase = document.createElementNS('http://www.w3.org/2000/svg', 'g');
	bunkerCase.innerHTML = BUNKER_SHAPE;
	bunker.bcase = bunker.appendChild(bunkerCase);
	let levelMeter = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
	levelMeter.setAttribute('x', 10);
	levelMeter.setAttribute('y', 0);
	levelMeter.setAttribute('width', 5);
	levelMeter.setAttribute('height', 70);
	levelMeter.setAttribute('fill', 'green');
	levelMeter.style.stroke = 'green';
	bunker.levelMeter = bunker.appendChild(levelMeter);
	bunker.label = bunker.appendChild(newAd(20, 20, elemId));
	bunker.fill = function(level) {
		levelMeter.setAttribute('height', level * 70);
		levelMeter.setAttribute('y', (1 - level) * 70);
	};

	setInterval(requestProcessor, 5000);

	return bunker;
};

//------------

//---Классификатор

const CLASSIFER_SHAPE =` 
<path d="M34,66 L50,66 L50,26 L34,26 L34,66 Z "/>
<path d="M34,66 L50,66 L45,78 L39,78 L34,66 Z "/>
<path d="M39,78 L45,78 L45,94 L39,94 L39,78 Z "/>
<path d="M0,66 L16,66 L16,26 L0,26 L0,66 Z "/>
<path d="M0,66 L16,66 L11,78 L5,78 L0,66 Z "/>
<path d="M5,78 L11,78 L11,94 L5,94 L5,78 Z "/>
<path d="M39,78 L30,103 L20,103 L11,78 "/>
<path d="M13,73 L36,73 "/>
<line x1="35" y1="8" x2="15" y2="8"/>
<line x1="33" y1="10" x2="33" y2="28"/>
<line x1="30" y1="10" x2="30" y2="14"/>
<line x1="30" y1="26" x2="30" y2="28"/>
<line x1="17" y1="10" x2="17" y2="28"/>
<line x1="20" y1="10" x2="20" y2="14"/>
<line x1="20" y1="26" x2="20" y2="28"/>
<path d="M20,17 L20,23 A1,1 0 0,0 21,24 L29,24 A1,1 0 0,0 30,23 L30,17 A1,1 0 0,0 29,16 L21,16 A1,1 0 0,0 20,17 Z "/>
<path d="M20,17 L20,19 L18,19 L18,17 L20,17 Z "/>
<path d="M20,21 L20,23 L18,23 L18,21 L20,21 Z "/>
<path d="M30,30 L30,33 L20,33 L20,30 L30,30 Z "/>
<path d="M29,2 L29,1 A1,1 0 0,0 28,0 L22,0 A1,1 0 0,0 21,1 L21,2 L29,2 Z "/>
<path d="M35,26 L35,5 A3,3 0 0,0 32,2 L18,2 A3,3 0 0,0 15,5 L15,26 "/>
<path d="M16,30 L34,30 "/>
<path d="M36,73 L13,73 "/>
<path d="M16,33 L34,33 "/>`;


newClassifer = function(elemId, initX, initY) {
	
	requestProcessor = function() {
		let req = new XMLHttpRequest();
		req.open('GET', 'http://' + SERVER_LOCATION + '/data?AGR=' + elemId);
		req.onreadystatechange = function() {
			if(this.readyState === 4 && this.status === 200) {
				resp = JSON.parse(this.response);
				keys = Object.keys(resp);
				agrId = keys[0];
				params = resp[agrId];
				classifer = mainUnit.getElementById(agrId);
				if (classifer) {
				};
			};
		};
		req.send();
	};

	let classifer = document.createElementNS('http://www.w3.org/2000/svg', 'g');
	classifer.id = elemId;
	classifer.setAttribute('transform', `translate(${initX}, ${initY}), scale(1)`);
	classifer.setAttribute('fill', 'none');
	classifer.style.stroke = 'black';
	classifer.setAttribute('stroke-width', STROKE_WIDTH);
	classifer.innerHTML = CLASSIFER_SHAPE;
	classifer.label = classifer.appendChild(newAd(20, 50, elemId));

	setInterval(requestProcessor, 5000);

	return classifer;
};

//------------

//------- шнековый транспортер

newScrew = function(elemId, initMotorX, initMotorY, initSupplyX, initSupplyY) {
	
	conveyorJSON = {
		elemId: [
			'ATS_WORK',		//УПП в работе
			'SW_STATUS',	// положение АВ
			'ATS_RD',		//УПП готов
			'ES_ATV',		// не используется
			'ES_NPU',		// АС МПУ
			'ES_EXT',		// АС доп стоп-кнопка 
			'ES_CAB',		// АС шкаф
			'ES_PULT',		// АС пульт
			'ALR_SPEED',	// не используется
			'ALR_DKSL1',	// не используется
			'ALR_DKSL2',	// не используется
			'WRN_DKSL1',	// не используется
			'WRN_DKSL2',	// не используется
			'ES_BLOCK',		// аварийная блокировка
			'GREEN_LP',		// лампа на пульте
			'RED_LP',		// лампа на пульте
		]
	};
	
	requestProcessor = function() {
		let req = new XMLHttpRequest();
		req.open('GET', 'http://' + SERVER_LOCATION + '/data?AGR=' + elemId);
		req.onreadystatechange = function() {
			if(this.readyState === 4 && this.status === 200) {
				resp = JSON.parse(this.response);
				keys = Object.keys(resp);
				agrId = keys[0];
				params = resp[agrId];
				let screw = mainUnit.getElementById(agrId);
				if (screw) {
					if (params.ATS_RD[0] === 1) {screw.motor.ready()} else {screw.motor.notReady()};
					if (params.ATS_WORK[0] === 1) {screw.motor.run()}; 
					if (params.SW_STATUS[0] === 0) {screw.motor.alarm()};
					if (params.ES_MPU[0] === 1) {screw.ES_MPU.alarm()} else {screw.ES_MPU.hide()};
					if (params.ES_EXT[0] === 1) {screw.ES_EXT.alarm()} else {screw.ES_EXT.hide()};
				};
			};
		};
		req.send();
	};

	newMotor = function(initX, initY) {	
		let motor = document.createElementNS('http://www.w3.org/2000/svg', 'g');
		motor.innerHTML = `<circle cx="5" cy="5" r="5"/><circle cx="5" cy="5" r="2"/>`;
		motor.setAttribute('transform', `translate(${initX}, ${initY})`);
		motor.fill = 'none';
		motor.style.stroke = 'black';
		motor.setAttribute('stroke-width', STROKE_WIDTH);
		motor.notReady = function() {motor.setAttribute('fill', 'orange')};
		motor.ready = function() {motor.setAttribute('fill', 'blue')};
		motor.run = function() {motor.setAttribute('fill', 'green')};
		motor.alarm = function() {motor.setAttribute('fill', 'red')};
		return motor;
	};

	let motorCP = {'x': initMotorX + 5, 'y': initMotorY + 5, 'dx': initSupplyX - initMotorX, 'dy': initSupplyY - initMotorY};
	let initAngle = 0;
	if (motorCP.dx !== 0) {initAngle = Math.atan(motorCP.dy / motorCP.dx)};
	let dl = 0;
	if (initAngle > 0) 
		{dl = motorCP.dy / Math.tan((Math.PI - initAngle) / 2)}
		else {dl = - motorCP.dy / Math.tan((Math.PI + initAngle) / 2)};
	initAngle = initAngle * 180 / Math.PI;

	let screwЕnclosure = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
	screwЕnclosure.setAttribute('points', `${motorCP.x},${motorCP.y + 5} ${initSupplyX},${motorCP.y + 5} ${initSupplyX},${motorCP.y - 5} ${motorCP.x},${motorCP.y - 5}`);
	screwЕnclosure.setAttribute('fill', 'none');
//	if (motorCP.dx >= 0) {screwЕnclosure.setAttribute('transform', `rotate(${initAngle}, ${motorCP.x}, ${motorCP.y})`)}
//	else {screwЕnclosure.setAttribute('transform', `rotate(${initAngle + 2 * (90 - initAngle)}, ${motorCP.x}, ${motorCP.y})`)};
	screwЕnclosure.setAttribute('transform', `rotate(${initAngle}, ${motorCP.x}, ${motorCP.y})`);

	let screw = document.createElementNS('http://www.w3.org/2000/svg', 'g');
	
	screw.id = elemId;
	
	screw.motor = screw.appendChild(newMotor(motorCP.x - 5, motorCP.y - 5));

	screw.ES_MPU = screw.appendChild(newAd(initMotorX + 24, initMotorY + 16, 'АС'));
	screw.ES_EXT = screw.appendChild(newAd(initSupplyX - 24, initSupplyY + 16, 'АС'));
	screw.label = screw.appendChild(newAd((initSupplyX - initMotorX) * 0.5 - 15 + initMotorX, (initSupplyY - initMotorY) * 0.5 + initMotorY + 10, elemId));
	screw.appendChild(screwЕnclosure);

	screw.fill = 'none';
	screw.setAttribute('stroke', 'black');
	screw.setAttribute('stroke-width', STROKE_WIDTH);

	screw.notReady = function() {screw.motor.notReady()};
	screw.ready = function() {screw.motor.ready()};
	screw.run = function() {screw.motor.run()};
	screw.alarm = function() {screw.motor.alarm()};
	
	setInterval(requestProcessor, 5000);
	
	return screw;
};
