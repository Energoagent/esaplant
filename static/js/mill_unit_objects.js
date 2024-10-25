
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
		lamp.hyde = function() {
			lamp.style.stroke = 'black';
			lamp.style.fill = 'black';
			lamp.style.display = 'none';
		};
		lamp.turnOn = function() {
			lamp.hyde()
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
		el.notReady = function() {el.setAttribute('fill', 'orange')};
		el.ready = function() {el.setAttribute('fill', 'blue')};
		el.run = function() {el.setAttribute('fill', 'green')};
		el.alarm = function() {el.setAttribute('fill', 'red')};
		el.norm = function() {el.setAttribute('fill', 'gray')};
	};
	return el;
};


// ленточный транспортер

newConveyor = function(conveyor) {

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
					if (params.ATS_RD[0] === 1) {conveyor.motor.ready()} else {conveyor.motor.notReady()};
					if (params.ATS_WORK[0] === 1) {conveyor.motor.run()}; 
					if (params.SW_STATUS[0] === 0) {conveyor.motor.alarm()};
					if (params.ALR_SPEED[0] === 1) {conveyor.drum.alarm()} else {conveyor.drum.norm()};
					conveyor.DKSL1.norm();
					if (params.WRN_DKSL1[0] === 1) {conveyor.DKSL1.warning()};
					if (params.ALR_DKSL1[0] === 1) {conveyor.DKSL1.alarm()}
					conveyor.DKSL2.norm();
					if (params.WRN_DKSL2[0] === 1) {conveyor.DKSL2.warning()};
					if (params.ALR_DKSL2[0] === 1) {conveyor.DKSL2.alarm()}
					if (params.ES_MPU[0] === 1) {conveyor.localES.alarm()} else {conveyor.localES.norm()};
					if (params.ES_ATV[0] === 1) {conveyor.stopCable.alarm()} else {conveyor.stopCable.norm()};
					if (params.ES_EXT[0] === 1) {conveyor.additionalES.alarm()} else {conveyor.additionalES.norm()};
					if (conveyor.lampWork) {if (params.GREEN_LP[0] === 1) {conveyor.lampWork.green()}};
					if (conveyor.lampAlarm) {if (params.RED_LP[0] === 1) {conveyor.lampAlarm.orange()}};
				};
			};
		};
		req.send();
	};


	conveyor.motor = newActiveElement(conveyor.getElementsByClassName('CONVEYOR_MOTOR_DRUM')[0]);
	conveyor.drum = newActiveElement(conveyor.getElementsByClassName('CONVEYOR_TENSION_DRUM')[0]);
	conveyor.DKSL1 = newEmergencyStop(conveyor.getElementsByClassName('TAPE_BREAK_SENSOR')[0]);
	conveyor.DKSL2 = newEmergencyStop(conveyor.getElementsByClassName('TAPE_BREAK_SENSOR')[1]);
	conveyor.stopCable = newEmergencyStop(conveyor.getElementsByClassName('ES')[0]);
	conveyor.localES = newEmergencyStop(conveyor.getElementsByClassName('ES')[1]);
	conveyor.additionalES = newEmergencyStop(conveyor.getElementsByClassName('ES')[2]);
	conveyor.lampAlarm = newLamp(document.getElementById(conveyor.id + '_ALARM'));
	conveyor.lampWork = newLamp(document.getElementById(conveyor.id + '_WORK'));
	
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
					if (params.HIGH[0] === 0) {bunker.hiLevel.fillBlue()}
					else if (params.LOW[0] === 0) {bunker.lowLevel.fillBlue()}
						else if (params.LOW[0] === 1) {bunker.lowLevel.fillRed()}
							else {
								bunker.lowLevel.hyde();
								bunker.hiLevel.hyde()
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
			ind.hyde = function() {
				ind.style.stroke = 'black';
				ind.style.fill = 'black';
				ind.style.display = 'none';
			};
		};
		return ind;
	};
	
	newLevelSensor = function(sensor) {
		if (sensor) {
			sensor.red = function() {sensor.setAttribute('fill', 'red')};
			sensor.green = function() {sensor.setAttribute('fill', 'green')};
			sensor.gray = function() {sensor.setAttribute('fill', 'gray')};
			sensor.hyde = function() {
				sensor.style.stroke = 'black';
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
	if (bunker.lowLevel) {bunker.lowLevel.hyde()};
	if (bunker.middleLevel) {bunker.middleLevel.hyde()};
	if (bunker.hiLevel) {bunker.hiLevel.hyde()};
	if (bunker.hiSensor) {bunker.hiSensor.hyde()};
	if (bunker.lowSensor) {bunker.lowSensor.hyde()};
	
	setInterval(requestProcessor, 5000);
	
	return bunker;
};


