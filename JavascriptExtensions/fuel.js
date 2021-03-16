
// Full level is quantity in tank at start, or refill.
function wGetFullFuelLevel() {
	level = $prop('DataCorePlugin.GameData.NewData.Fuel');
	if ( root['maxFuel'] == null || root['maxFuel'] < level ) {
		root['maxFuel'] = level;
		return level;
	}
	return root['maxFuel'];
}

function isPositive(val) {
	if ( val > 0 ) { return 1; }
	return 0;
}

function getTimer(bT) {
	if ( root['timer'] == null || root['timer'] >= root['bTimer'] || bT != null ) {
		root['timer'] = 0;
	} else {
		root['timer']++;
	}
	
	return root['timer'];
}