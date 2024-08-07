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


// создание pix сетки
function drawPixelGrid(unit, stepX, stepY){
	if (unit) {
		let maxX = Number(unit.getAttribute('width'));
		let maxY = Number(unit.getAttribute('height'));
		if (stepX && (stepX > 0)) {
			for(let x = 0; x < maxX; x = x + stepX) {
				let line = document.createElementNS("http://www.w3.org/2000/svg", "line");
				line.setAttribute('x1', String(x));
				line.setAttribute('x2', String(x));
				line.setAttribute('y1', '0');
				line.setAttribute('y2', String(maxY));
				line.setAttribute('stroke', 'red');
				unit.appendChild(line);
				let txt = document.createElementNS("http://www.w3.org/2000/svg", "text");
				txt.setAttribute('y', '100');
				txt.setAttribute('x', String(x));
				txt.style.fill = 'red';
				txt.style.font = 'Arial';
				txt.style.fontSize = '20';
				txt.innerHTML = String(x);
				unit.appendChild(txt);
			};
		};
		if (stepY && (stepY > 0)) {
			for(let y = 0; y < maxY; y = y + stepY) {
				let line = document.createElementNS("http://www.w3.org/2000/svg", "line");
				line.setAttribute('y1', String(y));
				line.setAttribute('y2', String(y));
				line.setAttribute('x1', '0');
				line.setAttribute('x2', String(maxX));
				line.setAttribute('stroke', 'red');
				unit.appendChild(line);
				let txt = document.createElementNS("http://www.w3.org/2000/svg", "text");
				txt.setAttribute('x', '100');
				txt.setAttribute('y', String(y));
				txt.style.fill = 'red';
				txt.style.font = 'Arial';
				txt.style.fontSize = '20';
				txt.innerHTML = String(y);
				unit.appendChild(txt);
			};
		};
	};
}


