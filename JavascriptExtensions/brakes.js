


/*
 * BRAKES LIFE
 */
const discMaxLife = 32.0000038146973;
const padsMaxLife = [
	29.0000038146973,
	29.0000057220459,
	29.0000057220459,
	29.0000038146973
];
 
function getBrakeCompound(position,raw) {
	position = position.toLowerCase(position);
	pads = $prop('DataCorePlugin.GameRawData.Physics.'+position+'BrakeCompound');
	
	if (raw != null && raw > 0) { pads++; }
	return pads;
	
	/*
	value	type		comment								maxLife
	0		aggressive	qualif or sprint pads; about 1h		29.0000038146973
	1 		good		2-3h races							29.0000057220459
	2 		moderate	wet and endurance races				29.0000057220459
	3 		test		don’t use							29.0000038146973
	*/
}

function wGetDiscLife(position, side, max) {
	position = tcase(position);
	if (side == null) { side = ''; } else { side = tcase(side); }
	var propertyName = 'DataCorePlugin.GameRawData.Physics.discLife'+getBrakeRealName(position, side);
	
	var value = 31;
	if ( ! gameHasProperty(propertyName) ) { return value; }
	value = $prop(propertyName);
	
	if (max != null && max > 0) {
		value = getProportionalValue(value, max, discMaxLife);
	}

	return value;
}

function wGetPadsLife(position, side, max) {
	var maxLife = 0;
	var value = 0;

	// Doesn't get or calculate anything if ignition off.
	if ( $prop('GameRawData.Physics.ignitionOn') ) {
		position = tcase(position);
		if (side == null) { side = ''; } else { side = tcase(side); }

		// Making propertyName generating brake name.
		var propertyName = 'DataCorePlugin.GameRawData.Physics.padLife'+getBrakeRealName(position, side);
		maxLife = padsMaxLife[ getBrakeCompound(position,1) ];

		if (max == null) { max = maxLife; }
		
		// Check if we know game property give value.
		if ( gameHasProperty(propertyName) ) {
			value = $prop(propertyName);
		}

		if (max != null && max > 0) {
			value = getProportionalValue(value, max, maxLife);
		}
	} else {
		if (max == null) { max = padsMaxLife[0]; } 
		value = max;
	}

	return value;
}

/*
 * END BRAKES LIFE
 */

function getBrakeRealName(position, side) {
	position = tcase(position);
	if (side == null) { side = ''; } else { side = tcase(side); }
	var brakeNumber = '0';

	switch (position) {
		case 'Front':
			switch (side) {
				case 'Left':
					brakeNumber = '1'; break;
				case 'Right':
					brakeNumber = '2'; break;
			}
		case 'Rear':
			switch (side) {
				case 'Left':
					brakeNumber = '3'; break;
				case 'Right':
					brakeNumber = '4'; break;
			}
	}
	return '0'+brakeNumber;
}

/*
 * BRAKES COLORS
 */

function wGetBrakeColor(position, side) {
	if (returnDummyColor()) { return defaultColor['dummycolor']; }
    

	position = tcase(position);
	if (side == null) { side = ''; } else { side = tcase(side); }
	return getBrakeColor( $prop('DataCorePlugin.GameData.NewData.BrakeTemperature'+position+side) );
}
function wGetBrakeInvertedColor(position, side) {
	position = tcase(position);
	if (side == null) { side = ''; } else { side = tcase(side); }
	return invertColor( wGetBrakeColor(position,side) );
}

function getBrakeColor(temp) {
	if (returnDummyColor()) { return defaultColor['dummycolor']; }
    	
	if ( temp <= 80 ) {
		return '#FF00008B'; // bleu sombre
	} else if ( temp < 200 ) {
		return '#FF0000FF'; // bleu
	} else if ( temp < 600 ) {
		return '#FF00FFFF'; // cyan
	} else if ( temp < 660 ) {
		return '#FF008000'; // green
	} else if ( temp <= 740 ) {
		return '##FF32CD32'; // lime green
	}  else if ( temp <= 800 ) {
		return '#FF7CFC00'; // lime
	} else if ( temp <= 850 ) {
		return '#FFFFFF00'; // yellow
	}  else if ( temp < 900 ) {
		return '#FFFF8C00'; // orange
	} else if ( temp >= 900 ) {
		return '#FFFF0000'; // red
	}
	return '#00000000'; // black
}

/*
 * END BRAKES COLORS
 */

