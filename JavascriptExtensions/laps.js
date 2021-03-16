root['completedLaps'] = 0;


 
function getCurrentLapString() {
    var cLaps = $prop('DataCorePlugin.GameData.CompletedLaps');
    var newLap = false;

    if ( root['completedLaps'] < cLaps ) {
        root['completedLaps'] = cLaps;
        newLap = true;
    }
    
    if (newLap) {
        return $prop('DataCorePlugin.GameData.LastLapTime');
    }
    
    return $prop('DataCorePlugin.GameData.CurrentLapTime');
}

 
function checkLap() {
    if ( isincreasing(300, $prop('CurrentLap')) ) {
        newLap = 1;
    }
    
    if (newLap) {}
    
    newLap = 1;
    return 0;
}

/*


if ($prop('GameRawData.Graphics.isValidLap')) {
    
   
}



if ( isincreasing(20000, $prop('CurrentLap')) ) {
	return 'L';
	return $prop('LastLapTime');
}

return 'C';
return format($prop('CurrentLapTime'));

// format: mm\:ss\.fff
*/