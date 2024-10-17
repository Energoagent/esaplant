
//Общие

//SERVER_LOCATION = 'vpn.energoagent.com:8787';
//SERVER_LOCATION = '192.168.22.11:8787';
const SERVER_LOCATION = 'localhost:8787';

// метка

newAd = function(adSVG) {
	let ad = adSVG;
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
		ad.style.display = 'none';
	};
	return ad;
}

//------


// ленточный транспортер

newConveyor = function(conveyorSVG) {

	requestProcessor = function() {
		let req = new XMLHttpRequest();
		req.open('GET', 'http://' + SERVER_LOCATION + '/data?AGR=' + conveyorSVG.id);
		req.onreadystatechange = function() {
			if(this.readyState === 4 && this.status === 200) {
				resp = JSON.parse(this.response);
				keys = Object.keys(resp);
				agrId = keys[0];
				params = resp[agrId];
				if (params) {
					conveyor = document.getElementById(agrId);
					if (params.ATS_RD[0] === 1) {conveyor.sensor.ready()} else {conveyor.sensor.notReady()};
					if (params.ATS_WORK[0] === 1) {conveyor.sensor.run()}; 
					if (params.SW_STATUS[0] === 0) {conveyor.sensor.alarm()};
					if (params.ALR_SPEED[0] === 1) {conveyor.drum.alarm()} else {conveyor.drum.norm()};
					conveyor.DKSL1.hide();
					if (params.WRN_DKSL1[0] === 1) {conveyor.DKSL1.warning()};
					if (params.ALR_DKSL1[0] === 1) {conveyor.DKSL1.alarm()}
					conveyor.DKSL2.hide();
					if (params.WRN_DKSL2[0] === 1) {conveyor.DKSL2.warning()};
					if (params.ALR_DKSL2[0] === 1) {conveyor.DKSL2.alarm()}
					conveyor.AS.hide();
					if (params.ES_MPU[0] === 1) {conveyor.AS.alarm()};
					if (params.ES_ATV[0] === 1) {conveyor.AS.alarm()};
					if (params.ES_EXT[0] === 1) {conveyor.AS.alarm()};
					if (params.ES_ATV[0] === 1) {conveyor.AS.alarm()};
				};
			};
		};
		req.send();
	};

	newsensorDrum = function(sensorSVG) {
		sensorSVG.notReady = function() {sensorSVG.setAttribute('fill', 'orange')};
		sensorSVG.ready = function() {sensorSVG.setAttribute('fill', 'blue')};
		sensorSVG.run = function() {sensorSVG.setAttribute('fill', 'green')};
		sensorSVG.alarm = function() {sensorSVG.setAttribute('fill', 'red')};
		return sensorSVG;
	};

	newTensionDrum = function(tensionSVG) {
		tensionSVG.alarm = function() {tensionSVG.setAttribute('fill', 'red')};
		tensionSVG.norm = function() {tensionSVG.setAttribute('fill', 'gray')};
		return tensionSVG;
	}

	let conveyor = conveyorSVG;
	conveyor.sensor = newsensorDrum(conveyor.getElementsByClassName('CONVEYOR_sensor_DRUM_SHAPE')[0]);
	conveyor.drum = newTensionDrum(conveyor.getElementsByClassName('CONVEYOR_TENSION_DRUM_SHAP')[0]);
	conveyor.DKSL1 = newAd(conveyor.getElementsByClassName('LABEL')[0]);
	conveyor.DKSL2 = newAd(conveyor.getElementsByClassName('LABEL')[1]);
	conveyor.AS = newAd(conveyor.getElementsByClassName('LABEL')[2]);
	conveyor.notReady = function() {conveyor.sensor.notReady()};
	conveyor.ready = function() {conveyor.sensor.ready()};
	conveyor.run = function() {conveyor.sensor.run()};
	conveyor.alarm = function() {conveyor.sensor.alarm()};
	
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
					if (params.ATS_RD[0] === 1) {elevator.ready()} else {elevator.notReady()};
					if (params.ATS_WORK[0] === 1) {elevator.run()}; 
					if (params.SW_STATUS[0] === 0) {elevator.alarm()};
					elevator.AS.hide();
					if (params.ES_MPU[0] === 1) {elevator.AS.alarm()};
					if (params.ES_EXT[0] === 1) {elevator.AS.alarm()};
//					elevator.norm();
//					if (params.... === 1) {elevator.clogged()};
//					if (params.... === 1) {elevator.chainBreak()};
				};
			};
		};
		req.send();
	};

	newsensor = function(sensor) {
		sensor.notReady = function() {sensor.setAttribute('fill', 'orange')};
		sensor.ready = function() {sensor.setAttribute('fill', 'blue')};
		sensor.run = function() {sensor.setAttribute('fill', 'green')};
		sensor.alarm = function() {sensor.setAttribute('fill', 'red')};
		return sensor;
	};

	newChainBreakSensor = function(sensor) {
		sensor.alarm = function() {sensor.setAttribute('fill', 'red')};
		sensor.norm = function() {sensor.setAttribute('fill', 'gray')};
		return sensor;
	}

	newInputTray = function(tray) {
		tray.alarm = function() {tray.setAttribute('fill', 'red')};
		tray.norm = function() {tray.setAttribute('fill', 'gray')};
		return tray;
	}

	elevator.sensor = newsensor(elevator.getElementsByClassName('DRIVER_ANGLE_REDUCER_SHAPE')[0]);
	elevator.chainBreakSensor = newChainBreakSensor(elevator.getElementsByClassName('CHAIN_BREAK_SENSOR')[0]);
	elevator.tray = newInputTray(elevator.getElementsByClassName('ELEVATOR_INPUT_TRAY')[0]);
	elevator.AS = newAd(elevator.getElementsByClassName('LABEL')[0]);
	elevator.notReady = function() {elevator.sensor.notReady()};
	elevator.ready = function() {elevator.sensor.ready()};
	elevator.run = function() {elevator.sensor.run()};
	elevator.alarm = function() {elevator.sensor.alarm()};
	
	setInterval(requestProcessor, 5000);
	
	return elevator;
};

//сито барабан

newSeparatorDrum = function(drum) {
	
	requestProcessor = function() {
		let req = new XMLHttpRequest();
		req.open('GET', 'http://' + SERVER_LOCATION + '/data?AGR=' + drum.id);
		req.onreadystatechange = function() {
			if(this.readyState === 4 && this.status === 200) {
				resp = JSON.parse(this.response);
				keys = Object.keys(resp);
				agrId = keys[0];
				params = resp[agrId];
				if (params) {
					separator = document.getElementById(agrId);
					if (params.ATS_RD[0] === 1) {separator.sensor.ready()} else {separator.sensor.notReady()};
					if (params.ATS_WORK[0] === 1) {separator.sensor.run()}; 
					if (params.SW_STATUS[0] === 0) {separator.sensor.alarm()};
				};
			};
		};
		req.send();
	};

	newsensor = function(sensor) {
		sensor.notReady = function() {sensor.setAttribute('fill', 'orange')};
		sensor.ready = function() {sensor.setAttribute('fill', 'blue')};
		sensor.run = function() {sensor.setAttribute('fill', 'green')};
		sensor.alarm = function() {sensor.setAttribute('fill', 'red')};
		return sensor;
	};

	drum.sensor = newsensor(drum.getElementsByClassName('sensor_REDUCER_SHAPE')[0]);
	drum.AS = newAd(drum.getElementsByClassName('LABEL')[0]);
	drum.FS = newAd(drum.getElementsByClassName('LABEL')[1]);
	drum.notReady = function() {drum.sensor.notReady()};
	drum.ready = function() {drum.sensor.ready()};
	drum.run = function() {drum.sensor.run()};
	drum.alarm = function() {drum.sensor.alarm()};
	
	setInterval(requestProcessor, 5000);
	
	return drum;
};

//бункер

newBunker = function(bunker) {
	
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
//					if (params.ATS_RD[0] === 1) {separator.sensor.ready()} else {separator.sensor.notReady()};
				};
			};
		};
		req.send();
	};

	newSensor = function(sensor) {
		sensor.fillYes = function() {sensor.setAttribute('fill', 'orange')};
		sensor.fillNo = function() {sensor.setAttribute('fill', 'red')};
		return sensor;
	};

	bunker.sensorTop = newsensor(drum.getElementsByClassName('LEVEL_SENSOR')[0]);
	bunker.sensorLow = newsensor(drum.getElementsByClassName('LEVEL_SENSOR')[1]);
	
	setInterval(requestProcessor, 5000);
	
	return bunker;
};
