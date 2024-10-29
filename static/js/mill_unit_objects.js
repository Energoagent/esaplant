
//Общие

//SERVER_LOCATION = 'vpn.energoagent.com:8787';
//SERVER_LOCATION = '192.168.22.11:8787';
//const SERVER_LOCATION = 'localhost:8787';
const SERVER_LOCATION = window.location.host;

//ДКСЛы ДКМС АТВ АТС

newEmergencyStop = function(ES) {
	ES.alarm = function() {
		ES.style.stroke = 'red';
		ES.style.fill = 'red';
		ES.style.display = '';
	};
	ES.warning = function() {
		ES.style.stroke = 'orange';
		ES.style.fill = 'orange';
		ES.style.display = '';
	};
	ES.norm = function() {
		ES.style.stroke = 'black';
		ES.style.fill = 'black';
		ES.style.display = 'none';
	};
	ES.noData = function() {
		ES.style.stroke = 'gray';
		ES.style.fill = 'gray';
		ES.style.display = '';
	};
	return ES;
}

// универсальная лампа red-green-orenge

newLamp = function(lamp) {
	if (lamp) {
		let lampType = lamp.getAttribute('class');
		lamp.red = function() {
			lamp.style.stroke = 'red';
			lamp.style.fill = 'red';
			lamp.style.display = '';
		};
		lamp.orange = function() {
			lamp.style.stroke = 'orange';
			lamp.style.fill = 'orange';
			lamp.style.display = '';
		};
		lamp.green = function() {
			lamp.style.stroke = 'green';
			lamp.style.fill = 'green';
			lamp.style.display = '';
		};
		lamp.turnOff = function() {
			lamp.style.stroke = 'gray';
			lamp.style.fill = 'gray';
			lamp.style.display = '';
		};
		lamp.hide = function() {
			lamp.style.stroke = 'black';
			lamp.style.fill = 'black';
			lamp.style.display = 'none';
		};
		lamp.turnOn = function() {
			lamp.hide()
			if (lampType == 'LAMP_RED') {lamp.red();};
			if (lampType == 'LAMP_GREEN') {lamp.green();};
			if (lampType == 'LAMP_ORANGE') {lamp.orange();};
		};
	};
	return lamp;
}

// моторы, барабаны

newActiveElement = function(el) {
	if (el) {
		el.red = function() {el.setAttribute('fill', 'red')};
		el.orange = function() {el.setAttribute('fill', 'orange')};
		el.green = function() {el.setAttribute('fill', 'green')};
		el.gray = function() {el.setAttribute('fill', 'green')};
		el.notReady = function() {el.setAttribute('fill', 'orange')};
		el.ready = function() {el.setAttribute('fill', 'green')};
		el.run = function() {el.setAttribute('fill', 'green')};
		el.alarm = function() {el.setAttribute('fill', 'red')};
		el.norm = function() {el.setAttribute('fill', 'gray')};
		el.hide = function() {
			el.style.stroke = 'black';
			el.style.fill = 'black';
			el.style.display = 'none';
		};
	};
	return el;
};


// ленточный транспортер


// еще один ленточный транспортер - 2

newConveyor2 = function(conveyor) {

	requestProcessor = function() {
		let req = new XMLHttpRequest();
		req.open('GET', 'http://' + SERVER_LOCATION + '/data?AGR=' + conveyor.id);
		req.onreadystatechange = function() {
			if(this.readyState === 4 && this.status === 200) {
				resp = JSON.parse(this.response);
				keys = Object.keys(resp);
				agrId = keys[0];
				params = resp[agrId];
				if (params) {
					conveyor = document.getElementById(agrId);
					if (params.ATS_RD[0] == 1) {conveyor.motor.green()} else {conveyor.motor.orange()};
					if (params.ATS_RD[2] == 'InValid') {conveyor.motor.gray()};
					if (params.ATS_WORK[0] == 1) {conveyor.belt.green()}; 
					if (params.ATS_WORK[2] == 'InValid') {conveyor.belt.gray()}; 
					if (params.SW_STATUS[0] == 0) {conveyor.motor.alarm()};
					if (params.SW_STATUS[2] == 'InValid') {conveyor.motor.gray()};
					if (params.ALR_SPEED[0] == 1) {conveyor.belt.alarm()} else {conveyor.belt.norm()};
					if (params.ALR_SPEED[2] == 'InValid') {conveyor.belt.gray()};
					conveyor.DKSL1.norm();
					if (params.WRN_DKSL1[0] == 1) {conveyor.DKSL1.warning()};
					if (params.ALR_DKSL1[0] == 1) {conveyor.DKSL1.alarm()}
					if (params.WRN_DKSL1[2] == 'InValid') {conveyor.DKSL1.noData()};
					if (params.ALR_DKSL1[2] == 'InValid') {conveyor.DKSL1.noData()}
					conveyor.DKSL2.norm();
					if (params.WRN_DKSL2[0] == 1) {conveyor.DKSL2.warning()};
					if (params.ALR_DKSL2[0] == 1) {conveyor.DKSL2.alarm()}
					if (params.WRN_DKSL2[2] == 'InValid') {conveyor.DKSL2.noData()};
					if (params.ALR_DKSL2[2] == 'InValid') {conveyor.DKSL2.noData()}
					if (params.ES_MPU[0] == 1) {conveyor.localES.alarm()} else {conveyor.localES.norm()};
					if (params.ES_MPU[2] == 'InValid') {conveyor.localES.noData()};
					if (params.ES_ATV[0] == 1) {conveyor.stopCable.alarm()} else {conveyor.stopCable.norm()};
					if (params.ES_ATV[2] == 'InValid') {conveyor.stopCable.noData()};
					if (params.ES_EXT[0] == 1) {conveyor.additionalES.alarm()} else {conveyor.additionalES.norm()};
					if (params.ES_EXT[2] == 'InValid') {conveyor.additionalES.noData()};
//					if (conveyor.lampWork) {if (params.GREEN_LP[0] === 1) {conveyor.lampWork.green()}};
//					if (conveyor.lampAlarm) {if (params.RED_LP[0] === 1) {conveyor.lampAlarm.orange()}};
				};
			};
		};
		req.send();
	};


	conveyor.motor = newActiveElement(conveyor.getElementsByClassName('CONVEYOR_MOTOR_DRUM_2')[0]);
	conveyor.belt = newActiveElement(conveyor.getElementsByClassName('CONVEYOR_BELT')[0]);
	conveyor.DKSL1 = newEmergencyStop(conveyor.getElementsByClassName('BELT_SENSOR')[0]);
	conveyor.DKSL2 = newEmergencyStop(conveyor.getElementsByClassName('BELT_SENSOR')[1]);
	conveyor.stopCable = newEmergencyStop(conveyor.getElementsByClassName('EMERGENCY_STOP')[0]);
	conveyor.localES = newEmergencyStop(conveyor.getElementsByClassName('EMERGENCY_STOP')[1]);
	conveyor.additionalES = newEmergencyStop(conveyor.getElementsByClassName('EMERGENCY_STOP')[2]);
	
	setInterval(requestProcessor, 5000);
	
	return conveyor;
};


// элеватор

newElevator = function(elevator) {
	
	requestProcessor = function() {
		let req = new XMLHttpRequest();
		req.open('GET', 'http://' + SERVER_LOCATION + '/data?AGR=' + elevator.id);
		req.onreadystatechange = function() {
			if(this.readyState === 4 && this.status === 200) {
				resp = JSON.parse(this.response);
				keys = Object.keys(resp);
				agrId = keys[0];
				params = resp[agrId];
				if (params) {
					elevator = document.getElementById(agrId);
					if (params.ATS_RD[0] === 1) {elevator.motor.ready()} else {elevator.notReady()};
					if (params.ATS_WORK[0] === 1) {elevator.motor.run()}; 
					if (params.SW_STATUS[0] === 0) {elevator.motor.alarm()};
					if (params.ES_MPU[0] === 1) {elevator.localES.alarm()} else {elevator.localES.norm()};
					if (params.ES_EXT[0] === 1) {elevator.additionalES.alarm()} else {elevator.additionalES.norm()};
					if (elevator.lampWork) {if (params.GREEN_LP[0] === 1) {elevator.lampWork.green()}};
					if (elevator.lampAlarm) {if (params.RED_LP[0] === 1) {elevator.lampAlarm.orange()}};
				};
			};
		};
		req.send();
	};

	elevator.motor = newActiveElement(elevator.getElementsByClassName('DRIVER_ANGLE_REDUCER_SHAPE')[0]);
	elevator.chainBreakSensor = newActiveElement(elevator.getElementsByClassName('CHAIN_BREAK_SENSOR')[0]);
	elevator.tray = newActiveElement(elevator.getElementsByClassName('ELEVATOR_INPUT_TRAY')[0]);
	elevator.localES = newEmergencyStop(elevator.getElementsByClassName('ES')[0]);
	elevator.additionalES = newEmergencyStop(elevator.getElementsByClassName('ES')[1]);
	elevator.lampAlarm = newLamp(document.getElementById(elevator.id + '_ALARM'));
	elevator.lampWork = newLamp(document.getElementById(elevator.id + '_WORK'));
	
	setInterval(requestProcessor, 5000);
	
	return elevator;
};

// бункеры грануляции

newGrainBunker = function(bunker) {
	
	requestProcessor = function() {
		let req = new XMLHttpRequest();
		req.open('GET', 'http://' + SERVER_LOCATION + '/data?AGR=' + bunker.id);
		req.onreadystatechange = function() {
			if(this.readyState === 4 && this.status === 200) {
				resp = JSON.parse(this.response);
				keys = Object.keys(resp);
				agrId = keys[0];
				params = resp[agrId];
				if (params) {
					bunker = document.getElementById(agrId);
					if (params.HIGH[0] === 1) {
						bunker.hiLevel.fillBlue()
						bunker.hiSensor.green();
						bunker.lowSensor.gray();
					}
					else if (params.LOW[0] === 1) {
						bunker.hiSensor.gray();
						bunker.middleLevel.fillBlue()
						bunker.lowSensor.green();
					}
					else if (params.LOW[0] === 0) {
						bunker.hiSensor.gray();
						bunker.lowLevel.fillRed()
						bunker.lowSensor.red();
					}
					else {
						bunker.lowLevel.hide();
						bunker.hiLevel.hide()
						bunker.hiSensor.hide();
						bunker.lowSensor.hide();
					};
				};
			};
		};
		req.send();
	};

	newLevelIndicator = function(ind) {
		if (ind) {
			ind.setAttribute('fill-opacity', 0.2);
			ind.setAttribute('stroke-opacity', 0.2);
			ind.fillBlue = function() {
				ind.style.stroke = 'blue';
				ind.style.fill = 'blue';
				ind.style.display = '';
			};
			ind.fillRed = function() {
				ind.style.stroke = 'red';
				ind.style.fill = 'red';
				ind.style.display = '';
			};
			ind.hide = function() {
				ind.style.stroke = 'black';
				ind.style.fill = 'black';
				ind.style.display = 'none';
			};
		};
		return ind;
	};
	
	newLevelSensor = function(sensor) {
		if (sensor) {
			sensor.red = function() {
				sensor.setAttribute('fill', 'red');
				sensor.style.display = '';
			};
			sensor.green = function() {
				sensor.setAttribute('fill', 'green');
				sensor.style.display = '';
			};
			sensor.gray = function() {
				sensor.setAttribute('fill', 'gray');
				sensor.style.display = '';
				};
			sensor.hide = function() {
				sensor.style.fill = 'black';
				sensor.style.display = 'none';
			};
		};
		return sensor;
	};
	
	let svgClass = bunker.getAttribute('class');
	bunker.hiSensor = newLevelSensor(bunker.getElementsByClassName('LEVEL_SENSOR')[0]);
	bunker.lowSensor = newLevelSensor(bunker.getElementsByClassName('LEVEL_SENSOR')[1]);

	bunker.lowLevel = newLevelIndicator(bunker.getElementsByClassName(svgClass + '_LOW')[0]);
	bunker.middleLevel = newLevelIndicator(bunker.getElementsByClassName(svgClass + '_MIDDLE')[0]);
	bunker.hiLevel = newLevelIndicator(bunker.getElementsByClassName(svgClass + '_HI')[0]);
	if (bunker.lowLevel) {bunker.lowLevel.hide()};
	if (bunker.middleLevel) {bunker.middleLevel.hide()};
	if (bunker.hiLevel) {bunker.hiLevel.hide()};
//	if (bunker.hiSensor) {bunker.hiSensor.hide()};
//	if (bunker.lowSensor) {bunker.lowSensor.hide()};
	
	setInterval(requestProcessor, 5000);
	
	return bunker;
};


