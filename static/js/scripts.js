// масштабирование SVG сообразно body
function svgScale() {
	h = window.innerHeight;
	w = window.innerWidth;
	let elem = document.querySelector('svg'); 
	if(elem) { 
		elem.style.width = w *0.95;
		elem.style.height = h * 0.95;
	};
};


// запрос от сервера SCADA и вывод в HTML параметров (переменных)
let unitId = '';

let readyFlag = true; // флаг готовности запроса

function displayParameters() {
	var req = new XMLHttpRequest();
	if (!readyFlag) {return;}
	req.open("POST", "http://" + window.location.host + "/parameter/?page=" + String(unitId));
	req.onreadystatechange = function() {
		if(this.readyState === 4 && this.status === 200) {
			readyFlag = true;
			parameters = JSON.parse(this.response);
			for(let i=0; i < parameters.length; i++) {
				let elem = document.getElementById(parameters[i].ID);
				if(elem) {
					elem.innerText = parameters[i].Value;
					elem.style.color = parameters[i].color;
				};
			};
		}
		else {
			readyFlag = true;
		};
	};
	req.send();
	readyFlag = false;
} 



function parametersChart(id) {
	unitId = id;
	setInterval(displayParameters,
	5000
	)
}


// запрос от сервера SCADA и вывод в HTML событий разного вида (тревоги и тд)

function displayEvents(eventType, eventTable, eventColor) {
	if (!readyFlag) {return;}
	var req = new XMLHttpRequest();
	req.open("POST", "http://" + window.location.host + "/" + eventType);
	req.onreadystatechange = function() {
		if(this.readyState === 4 && this.status === 200) {
			readyFlag = true;
			evs = JSON.parse(this.response);
			if (evs) {
				let dataTable = document.getElementById(eventTable);
				if (dataTable) {
					let tableBody = dataTable.getElementsByTagName('tbody')[0];
					let rows = tableBody.getElementsByTagName('tr');
					for (let i = 0; true; i++) {							// бесконечный цикл со счетчиком
						if (i < evs.length) {    						// в пределах массива тревог
							if (i < rows.length) {   						// если в таблице есть существующие строки, то меняем их содержимое
								cells = rows[i].getElementsByTagName('td')
								cells[0].innerText = evs[i].t_raise;
								cells[1].innerText = evs[i].m_raise;
							}
							else { 											 // если в таблице закончились строки, то добавляем новые
								var newRow = tableBody.insertRow();
								newRow.insertCell().appendChild(document.createTextNode(evs[i].t_raise));
								newRow.insertCell().appendChild(document.createTextNode(evs[i].m_raise));
							}
							rows[i].style.color = eventColor;
						}
						else {													// если тревоги закончились и остались лишние ячейки - удаляем
							if (i < rows.lengh) {
								tableBody.deleteRow(i);
							}
							else break;											// завершаем цикл
						}
					}	
				}
			}
		}
		else readyFlag = true;
	}
	readyFlag = false;
	req.send();
} 

function displayAlarms() {
	displayEvents('alarms', 'alarmTable', 'red');
}

function alarmsChart(delay) {
	setInterval(displayAlarms, 5000);
}

function displayWarnings() {
	displayEvents('warnings', 'warningTable', 'yellow');
}

function warningsChart() {
	setTimeout( () => setInterval(displayWarnings, 5000), 2000);
}

function docRequest() {
	var req = new XMLHttpRequest();
	let requestDocJSON = {
		'reportType':input_doc.value,
		'start_date':start_date.value,
		'start_time':start_time.value,
		'end_date':end_date.value,	
		'end_time':end_time.value
	}
	req.open("POST", "http://" + window.location.host + "/docs");
	req.onreadystatechange = 
		function() {
			if(this.readyState === 4 && this.status === 200) {
				docSet = JSON.parse(this.response);
				if (docSet) {
					let docTable = document.getElementById('docTable');
					let tableBody = docTable.getElementsByTagName('tbody')[0];
					for (doc of docSet) {
						let newRow = tableBody.insertRow();
						newRow.insertCell().appendChild(document.createTextNode(doc.ReportDate));
						e = document.createElement('a');
						e.href = doc.ReportFileName;
						e.target = '_blank';
						e.appendChild(document.createTextNode(doc.ReportName));
						newRow.insertCell().appendChild(e);
					}
				}
			}
		};
	req.setRequestHeader('Content-type', 'application/json; charset=utf-8');
	req.send(JSON.stringify(requestDocJSON));
}

