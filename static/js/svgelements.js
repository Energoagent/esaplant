

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

const MILL_PARAMETERS_TABLE =
`
<div xmlns="http://www.w3.org/1999/xhtml">
<table class="parameters">
<tbody>
<tr><td>Состояние статора, Работа двигателя</td><td>Работа</td><td>Запуск</td><td></td></tr>
<tr><td>Стоп</td><td></td><td>Готовность</td><td></td></tr>
<tr><td>Срабатывание защиты</td><td></td><td>Аварийное состояние</td><td></td></tr>
<tr><td>Температура подшипника авария</td><td></td><td>Температура подшипника предупреждение</td><td></td></tr>
<tr><td>Температура подшипника 1.1</td><td>35 С</td><td>Температура подшипника 2.1</td><td>37 С</td></tr>
<tr><td>Температура подшипника 1.2</td><td></td><td>Температура подшипника 2.2</td><td></td></tr>
<tr><td>Температура подшипника 1.3</td><td></td><td>Температура подшипника 2.3</td><td></td></tr>
</tbody>
</table>
</div>
`

MILL_ROTATION_RIGHT =
`<path d="M4,30 L4,2 A2,2 0 0,1 6,0 L12,0 A2,2 0 0,1 14,2 L14,16 "/>
<line x1="0" y1="40" x2="4" y2="30"/>
<line x1="4" y1="30" x2="8" y2="40"/>
<line x1="0" y1="40" x2="8" y2="40"/>`

millRotationRight = function(elemId, initX, initY, initScale) {
	let elm = document.createElementNS('http://www.w3.org/2000/svg', 'g');
	elm.id = elemId + '_right';
	elm.innerHTML = MILL_ROTATION_RIGHT;
	elm.setAttribute('transform', `translate(${initX}, ${initY}), scale(${initScale})`);
	elm.setAttribute('fill', 'none');
	elm.setAttribute('stroke-width', '0.5');
	elm.style.stroke = 'green';
	return elm;
}

MILL_ROTATION_LEFT =
`<path d="M64,30 L64,2 A2,2 0 0,0 62,0 L56,0 A2,2 0 0,0 54,2 L54,16 "/>
<path d="M64,40 L60,30 L68,30 L64,40 "/>`

millRotationLeft = function(elemId, initX, initY, initScale) {
	let elm = document.createElementNS('http://www.w3.org/2000/svg', 'g');
	elm.id = elemId + '_left';
	elm.innerHTML = MILL_ROTATION_LEFT;
	elm.setAttribute('transform', `translate(${initX}, ${initY}), scale(${initScale})`);
	elm.setAttribute('fill', 'none');
	elm.setAttribute('stroke-width', '0.5');
	elm.style.stroke = 'blue';
	return elm;
}

newParameterBlock = function(paramId, initX, initY, labelText, labelX) {	
	let parameterBlock = document.createElementNS('http://www.w3.org/2000/svg', 'g');
	parameterBlock.id = paramId + '_block';

	let parameterName = document.createElementNS('http://www.w3.org/2000/svg', 'text');
	parameterName.id = paramId + '_label';
	parameterName.setAttribute('x', initX);
	parameterName.setAttribute('y', initY);
	parameterName.innerHTML = labelText;
	parameterName.setAttribute('class', 'parameters');

	let parameterValue = document.createElementNS('http://www.w3.org/2000/svg', 'text');
	parameterValue.id = paramId;
	parameterValue.setAttribute('x', initX + labelX);
	parameterValue.setAttribute('y', initY);
	parameterValue.innerHTML = 'x';
	parameterValue.setAttribute('class', 'parameters');
	parameterValue.style.stroke = 'red';

	parameterBlock.appendChild(parameterName);
	parameterBlock.appendChild(parameterValue);
	return parameterBlock;
}

newMillParameters = function(elemId, initX, initY) {	
	let millParameters = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');
	millParameters.innerHTML = MILL_PARAMETERS_TABLE;
	millParameters.setAttribute('x', initX);
	millParameters.setAttribute('y', initY);
	millParameters.setAttribute('width', 400);
	millParameters.setAttribute('height', 200);
	return millParameters;
}
				
newMill = function(elemId, initX, initY, initScale) {
	const PBP = {x: 1, y: -30};
	let mill = document.createElementNS('http://www.w3.org/2000/svg', 'g');
	mill.id = elemId + '_mill';
	mill.innerHTML = MILL_SHAPE;
	mill.appendChild(millRotationLeft('1_6_rotation', 100, 1, 1));
	mill.appendChild(millRotationRight('1_6_rotation', 100, 1, 1));
	mill.appendChild(newParameterBlock('1_6_TMP_ACD', PBP.x, PBP.y, 'Температура подшипника авария', 100));
	mill.appendChild(newParameterBlock('1_6_RUN', PBP.x, PBP.y + 6, 'Работа двигателя', 100));
	mill.appendChild(newParameterBlock('1_6_DEF', PBP.x, PBP.y + 12, 'Срабатывание защиты', 100));
	mill.appendChild(newParameterBlock('1_6_ACD', PBP.x, PBP.y + 18, 'Аварийное состояние', 100));
	mill.appendChild(newParameterBlock('1_6_P1_1_TMP', PBP.x, PBP.y + 24, 'Температура подшипника 1-1', 85));
	mill.appendChild(newParameterBlock('1_6_P1_2_TMP', PBP.x + 95, PBP.y + 24, '1-2', 10));
	mill.appendChild(newParameterBlock('1_6_P1_3_TMP', PBP.x + 115, PBP.y + 24, '1-3', 10));
	mill.appendChild(newParameterBlock('1_6_P2_1_TMP', PBP.x + 200, PBP.y + 24, 'Температура подшипника 2-1', 85));
	mill.appendChild(newParameterBlock('1_6_P2_2_TMP', PBP.x + 296, PBP.y + 24, '2-2', 10));
	mill.appendChild(newParameterBlock('1_6_P2_3_TMP', PBP.x + 315, PBP.y + 24, '2-3', 10));
//	mill.appendChild(newMillParameters('1_6', 1, 100));
	mill.setAttribute('transform', `translate(${initX}, ${initY}), scale(${initScale})`);
	mill.setAttribute('fill', 'none');
	mill.setAttribute('stroke-width', '0.5');
	mill.style.stroke = 'black';
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


newDriverReducer = function(elemId, initX, initY, initScale) {
	let elm = document.createElementNS('http://www.w3.org/2000/svg', 'g');
	elm.id = elemId + '_driver';
	elm.innerHTML = DRIVER_REDUCER;
	elm.setAttribute('transform', `translate(${initX}, ${initY}), scale(${initScale})`);
	elm.setAttribute('fill', 'none');
	elm.setAttribute('stroke-width', '0.5');
	elm.style.stroke = 'black';
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

newDriver6kV = function(elemId, initX, initY, initScale) {
	let elm = document.createElementNS('http://www.w3.org/2000/svg', 'g');
	elm.id = elemId + '_DRiver6kV';
	elm.innerHTML = DRIVER_6_KV;
	elm.setAttribute('transform', `translate(${initX}, ${initY}), scale(${initScale})`);
	elm.setAttribute('fill', 'none');
	elm.setAttribute('stroke-width', '0.5');
	elm.style.stroke = 'black';
	return elm;
}

const OILER =
`<path d="M12,7 L32,7 L32,14 L12,14 L12,7 Z "/>
<path d="M32,7 A18,18 0 0,0 12,7 "/>
<path d="M12,7 L2,4 L0,4 L12,13 "/>
<path d="M28,5 L28,2 A2,2 0 0,1 30,0 L34,0 A2,2 0 0,1 36,2 L36,7 L32,14 "/>`

newOiler = function(elemId, initX, initY, initScale, mirror) {
	let os = document.createElementNS('http://www.w3.org/2000/svg', 'g');
	os.id = elemId;
	os.innerHTML = OILER;
	os.setAttribute('transform', `translate(${initX}, ${initY}), scale(${mirror? -initScale: initScale}, ${initScale})`);
	os.setAttribute('fill', 'none');
	os.setAttribute('stroke-width', '0.5');
	os.style.stroke = 'black';
	return os;
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
	os.setAttribute('transform', `translate(${initX}, ${initY}), scale(${initScale})`);
	os.setAttribute('fill', 'none');
	os.setAttribute('stroke-width', '0.5');
	os.style.stroke = 'black';
	return os;
}
