const sectorColor = [
    '#FFE4FFBA',
    '#FFB4DAFF',
    '#FFFFB8B8'];
const defaultColor = {
	'text': 				'#FFFFFFFF',
	'time': 				'#FFFFFFFF',
	'bestTime':				'#FF32CD32',
    
    'param':               '#FFFFFFFF',
    'paramChanged':        '#FFFF0000',

	'background': 			'#FF000000',
	'foreground': 			'#FFFFFFFF',
    
    'penalty':              '#FFB22222', // firebrick
    
	'pitlane':	            '#FFFFFFFF',
	'backgroundPitlane':	'#FF191970',
   
	'ignitionOff':          '#FF454545',
	'backgroundIgnitionOff':'#FF000000',
    
    'needle':               '#FF23237F',

    'player':               '#FF416B41',
    'player_radar':         '#FF00FF00',
    'warn_radar':           '#FFFF0000',
    'opponent':             '#FFFFFFFF',

	'broken':  				'#FF000000',
	'invalidLap':			'#FF720000',

	'minigrad':  			'#64FFFFFF',
	'redline':				'#FFFF0000',
    'gearup':               '#FF98FB98',
    'backgauge':            '#FF808080',
    'fggauge':              '#FFFFFFFF',
    'rpmbar':               '#FF008000',
    
	'dummycolor': 			'#FF292929',
	'transparent': 			'#00000000',
    
    'better':               '#FFFFA500',
    'worse':                '#FF4A4AFF',
};

/*
frame					main screen border lines
 */
 
function getRaceState() {
    var stateName = '';
    
    if ( !$prop('GameRawData.Physics.ignitionOn') ) {
        return 'ignitionOff'
    }
}

function returnDummyColor() {
	return ! $prop('GameRawData.Physics.ignitionOn');
}




/*
 * Graphic base colors
 */
function getForegroundColor(objectName, paramValue) {
	objectName = lcase(objectName);
	if ( ! $prop('GameRawData.Physics.ignitionOn') ) { return defaultColor['ignitionOff']; }
	//if ( $prop('IsInPitLane') ) { return defaultColor['pitlane']; }
    
    switch (objectName) {
        case 'player_radar':
            let bDis = $prop('PersistantTrackerPlugin.DriverBehind_00_Distance');
            let aDis = $prop('PersistantTrackerPlugin.DriverAhead_00_Distance');
            if ( bDis <= 9 || aDis >= -9) {
                return defaultColor['warn_radar'];
            } else if ( bDis <= 15 || aDis >= -15) {
                return defaultColor['player_radar'];
            }
            return defaultColor['player'];
        case 'frame':
            return sectorColor[$prop('DataCorePlugin.GameData.CurrentSectorIndex')-1];
        case 'param':
            if (paramValue != null) {
                if ( root.param['param'] != paramValue ) {
                    root.param['param'] = paramValue;
                    root.param.paramCount =  6;
                }
            }
            if (root.param.paramCount > 0) {
                root.param.paramCount--;
                return defaultColor['paramChanged']; 
            }
            return defaultColor['param'];;
    }

	if ( defaultColor[objectName] != null) { return defaultColor[objectName]; }
	return defaultColor['foreground'];
}

function getBackgroundColor(objectName) {
	if ( ! $prop('GameRawData.Physics.ignitionOn')) { return defaultColor['backgroundIgnitionOff']; }
    
    switch (objectName) {
        case 'info':
            if (getPenaltyInfo()) { return defaultColor['penalty']; }
            switch (getInfo()) {
                case 'PITLANE': return defaultColor['background'];
                case 'LIMIT50': return defaultColor['redline'];
            }
    }

	if ( $prop('IsInPitLane') ) { return defaultColor['backgroundPitlane']; }
    
    


	let objN = 'background'+lcase(objectName);
	if ( defaultColor[objN] != null) { return defaultColor[objN]; }
	
	return defaultColor['background'];
}

/*
 * END Graphic base colors
 */
 
 
 

/*
 * Colors calculations
 */

var hex = function(x) {
    x = x.toString(16);
    return (x.length == 1) ? '0' + x : x;
};

function averageColor(color1, color2, ratio) {
	if (ratio == null || ratio >=1 || ratio <= 0) { ratio = 0.5; }
	else { ratio = 1 - ratio; }

	var r = Math.ceil(parseInt(color1.substring(1,4), 16) * ratio + parseInt(color2.substring(1,4), 16) * ratio);
	var g = Math.ceil(parseInt(color1.substring(4,7), 16) * ratio + parseInt(color2.substring(4,7), 16) * ratio);
	var b = Math.ceil(parseInt(color1.substring(7,10), 16) * ratio + parseInt(color2.substring(7,10), 16) * ratio);
	return '#' + hex(r) + hex(g) + hex(b);
}

function invertColor(color) {
	var r = parseInt(color.substring(1,4), 16);
	var g = parseInt(color.substring(4,7), 16);
	var b = parseInt(color.substring(7,10), 16);
	return '#' + hex(4095-r) + hex(4095-g) + hex(4095-b);
} 

function contrastColor(color) {
	var d = 0;
	var r = parseInt(color.substring(1,4), 16);
	var g = parseInt(color.substring(4,7), 16);
	var b = parseInt(color.substring(7,10), 16);

    // Counting the perceptive luminance - human eye favors green color... 
    //var luminance = ( 0.2126 * r + 0.7152 * g + 0.0722 * b);
    var luminance = ( 0.299 * r + 0.587 * g + 0.114 * b)/4096;

    if (luminance > 0.5) {
       d = 0; // bright colors - black font
    } else {
       d = 4095; // dark colors - white font
	}

    return '#' + hex(d) + hex(d) + hex(d);
} 

/*
 * END Colors calculations
 */
