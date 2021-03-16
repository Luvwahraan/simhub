
function isInPit() {
    return $prop('DataCorePlugin.GameData.IsInPitLane');
}
function pitLimiterOn() {
    return $prop('DataCorePlugin.GameRawData.Physics.PitLimiterOn');
}

function getInfo() {
    let infoText = '';

    /*let FLP = getPressure('Front', 'Left');
    let FLT = wGetTireTemp('Front', 'Left', '', 0);
    
    let FRP = getPressure('Front', 'Right');
    let FRT = wGetTireTemp('Front', 'Right', '', 0);
    
    let RLP = getPressure('Rear', 'Left');
    let RLT = wGetTireTemp('Rear', 'Left', '', 0);
    
    let RRP = getPressure('Rear', 'Right');
    let RRT = wGetTireTemp('Rear', 'Right', '', 0);*/

    // pit checks
    if ( isInPit() && pitLimiterOn() ) { infoText = 'PITLANE'; }
    else if ( $prop('IsInPitLane') ) { infoText = 'LIMIT50'; }
    
    // fuel
    else if ( $prop('DataCorePlugin.GameData.CarSettings_FuelAlertActive') ) { infoText = 'LOW FUEL'; }
  
    // tires
    /*else if ( (!isPressureTireOk(FLP)) || (!isPressureTireOk(FRP))
           || (!isPressureTireOk(RLP)) || (!isPressureTireOk(RRP)) ) { infoText = "CHECK\nPRESSURES"; }
    else if ( !isTemperatureTireOk(FLP) || !isTemperatureTireOk(FRP)
           || !isTemperatureTireOk(RLP) || !isTemperatureTireOk(RRP) ) { infoText = "CHECK\nTEMPS"; }*/

    return infoText;
}

function checkPenaltyLapsLeft() {
    let completedLaps = $prop('DataCorePlugin.GameRawData.Graphics.CompletedLaps');
    if ( root.penalty.laps == null) {
        root.penalty.laps = 3;
        root.penalty.currentLap = completedLaps;
    } else if ( root.penalty.currentLap != completedLaps ) {
        root.penalty.laps--;
        root.penalty.currentLap = completedLaps;
    }
}

function getPenaltyInfo(justCheck) {
    // justCheck is to return penalty bool: 1 if there is penalty, 0 if not.
 
    if (root['penalty'] == null) root['penalty'] = new Object();

    let penalty = $prop('DataCorePlugin.GameRawData.Graphics.Penalty');
    let penaltyTime = $prop('DataCorePlugin.GameRawData.Graphics.PenaltyTime');
    let message = ''; // info message returned
    
    // DataCorePlugin.GameRawData.Graphics.Penalty
    // 30 DT for speeding at start
    
    switch (penalty) {
    case null: // no penalty
    case 0:
        if (justCheck != null) { return 0; }
        if (root.penalty.laps != null) { message = 'Penalty cleared'; }
        root.penalty.laps = null;
        break;
        
    case 'ACC_PostRaceTime':
        message = 'Race END'+"\n";
        break;
       
    case 5: // ACC_Disqualified_Cutting
        if (justCheck != null) { return 1; }
        message = "Track limits:Disqualified"+"\n";
        break;
        
    case 11: // ACC_Disqualified_PitSpeeding
        if (justCheck != null) { return 1; }
        message = "PitSpeeding:Disqualified"+"\n";
        break;
        
    case 30: // ACC_DriveThrough_StartSpeeding
        message = 'DT for StartSpeeding'+"\n";
        checkPenaltyLapsLeft();
        break;
        
    case 1: // ACC_DriveThrough_PitSpeeding
        if (justCheck != null) { return 1; }
        checkPenaltyLapsLeft();
        message = "DT for PitSpeeding\n";
        break;
        
    case 10: // ACC_StopAndGo_30_PitSpeeding
        if (justCheck != null) { return 1; }
        if (penaltyTime > 0) {
            message = 'DT for StartSpeeding'+"\n";
            checkPenaltyLapsLeft();
        }
        break;
        
    default:
    }

    if (root.penalty.laps != null) {
        message += root.penalty.laps+'L left';
    }
    
    return message;
}


