

function getCarClass() {
    let model = $prop('DataCorePlugin.GameData.CarModel');
    if (model == null) model = '';
    model = model.split('_');
    let className = '';
    
    for (let i = 0; i < model.length; i++) {
        if (model[i] == 'gt3' || model[i] == 'gt4') className = model[i];
    }
    
    return className;    
}

function isGT3() {
    return (getCarClass() == 'gt3') ? 1 : 0;
}
function isGT4() {
    return (getCarClass() == 'gt4') ? 1 : 0;
}


/*
 * DIRT
 */

function getDirtColor(dirt) {
	if (dirt < 1) {
	return '#FF7CFC00'; // lime
	}
	return '#FFF000000'; // red
}

function wGetDirtColor(position, side, part, nullValue) {
	// nullValue to return if no value
	position = tcase(position);
	if (side == null) { side = ''; } else { side = tcase(side); }
	if (part == null) { part = ''; } else { part = tcase(part); }
	var propertyName = 'DataCorePlugin.GameData.NewData.TyreDirt'+position+side;

	if ( gameHasProperty(propertyName) ) {
		return getDirtColor($prop(propertyName));
	} else if ( nullValue != null) {
		return nullValue;
	}

	return wGetTireColor(position,side,part);
}

/*
 * END DIRT
 */


/*
 * WEAR
 */
 
function getWearColor(wear) {
	if (wear < 1) {
		return '#FF7CFC00'; // lime
	}
	return '#00000000'; // black
}
function wGetWearColor(position, side, part, nullValue) {
	// nullValue to return if no value
	position = tcase(position);
	if (side == null) { side = ''; } else { side = tcase(side); }
	if (part == null) { part = ''; } else { part = tcase(part); }
	var propertyName = 'DataCorePlugin.GameData.NewData.TyreWear'+tcase(position)+tcase(side);
	
	if ( gameHasProperty(propertyName) ) {
		return getWearColor($prop(propertyName));
	} else if ( nullValue != null) {
		return nullValue;
	}

	return wGetTireColor(position,side,part);
}

/*
 * END WEAR
 */





/*
 * PRESSIONS
 */
 
pressureTab = {
     gt3: [ 25,     26.5,   26.9,   27.35,  27.65,  28,     29,     29.5,   30 ],
     gt4: [ 24,     25,     25.9,     26.5,   26.75,  27,     27.5,   27.8,   28],
};

function getPressure(position, side) {
	let pres = $prop('DataCorePlugin.GameData.NewData.TyrePressure'+position+side);
    return (pres != null) ? pres : 0;
}

function isPressureTireOk(pressure) {
    let carClass = getCarClass();
    if ( pressure <  pressureTab[carClass][2] ) return false;
    else if ( pressure > pressureTab[carClass][5] ) return false;
    return true;
}

function wGetPressureColor(position, side) {
	if (returnDummyColor()) { return defaultColor['dummycolor']; }
    
    let carClass = getCarClass();
	
	position = tcase(position);
	if (side == null) { side = ''; } else { side = tcase(side); }

	var pressure = getPressure(position, side);	
	if ( pressure <= pressureTab[carClass][0] ) {
		return '#FF00008B'; // bleu sombre
	} else if ( pressure <= pressureTab[carClass][1] ) {
		return '#FF0000FF'; // bleu
	} else if ( pressure <= pressureTab[carClass][2] ) {
		return '#FF00FFFF'; // cyan
	} else if ( pressure <= pressureTab[carClass][3] ) {
		return '#FF008000'; // green
	} else if ( pressure <= pressureTab[carClass][4] ) {
		return '#FF32CD32'; // lime green
	} else if ( pressure <= pressureTab[carClass][5] ) {
		return '#FF7CFC00'; // lime
	} else if ( pressure < pressureTab[carClass][6] ) {
		return '#FFFFFF00'; // yellow
	} else if ( pressure <= pressureTab[carClass][7] ) {
		return '#FFFF8C00'; // orange
	} else if ( pressure > pressureTab[carClass][8] ) {
		return '#FFFF0000'; // red
	}
	return '#00000000'; // black
}




/*
 * TEMPERATURE
 */

function isTemperatureTireOk(temperature) {
    if ( temperature < 75 ) return 0;
    else if ( temperature > 100 ) return 0;
    return 1;
}
 
function wGetTyreTemp(position, side, part, nullValue) { return wGetTireTemp(position, side, part, nullValue); }
function wGetTireTemp(position, side, part, nullValue) {
	// nullValue to return if no value
	position = tcase(position);
	if (side == null) { side = ''; } else { side = tcase(side); }
	if (part == null) { part = ''; } else { part = tcase(part); }
	var propertyName = 'DataCorePlugin.GameData.NewData.TyreTemperature'+position+side;
	
	if ( gameHasProperty(propertyName+part) ) {
		return $prop( propertyName+part );
	} else if ( nullValue != null) {
		return nullValue;
	}

	return $prop(propertyName);
}


function wGetTyreColor(position, side, part) { return wGetTireColor(position, side, part); }
function wGetTireColor(position, side, part) {
	return getTireColor( wGetTireTemp(position, side, part) );
}

function getTyreColor(temp) { return getTireColor(temp); }
function getTireColor(temp) {
	if (returnDummyColor()) { return defaultColor['dummycolor']; }

	temp = Math.round(temp);
	if ( temp <= 20 ) {
		return '#FF00008B'; //bleu sombre
	} else if ( temp <= 30 ) { 				// 20 	<  temp <= 	30 	: bleu
		return '#FF0000FF'; //bleu
	} else if ( temp < 70 ) { 				// 30 	<  temp <= 	75 	: cyan
		return '#FF00FFFF'; //cyan
	} else if ( temp <= 80 ) { 				// 75 	<  temp <= 	80 	: green
		return '#FF008000'; //green
	} else if ( temp <= 84 ) { 				// 80 	<  temp <= 	84 	: lime green
		return '#FF32CD32'; //lime green
	} else if ( temp <= 88 ) { 				// 84 	<  temp <= 	88 	: lime
		return '#FF7CFC00'; // lime
	} else if ( temp < 95 ) { 				// 88 	<  temp < 	95 	: yellow
		return '#FFFFFF00'; // yellow
	} else if ( temp <= 100 ) { 			// 95 	<= temp <=	100	: orange
		return '#FFFF8C00'; // orange
	} else if ( temp > 100 ) { 				// 100	<  temp 		: red
		return '#FFFF0000'; // red
	}
	return '#00000000'; // black
}

/*
 * END TEMPERATURE
 */
 
 
 