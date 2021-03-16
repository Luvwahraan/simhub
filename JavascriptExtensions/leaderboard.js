

function getLeaderLap() {
    let leaderLap = drivercurrentlap(1);
    
    let sessionPassedTime = timespantoseconds( $prop('GameRawData.Realtime.SessionTime') );
    if (sessionPassedTime < 180) {
        let bestTime = timespantoseconds( $prop('PersistantTrackerPlugin.AllTimeBest') );
        let estimatedLapsDone = Math.round(sessionPassedTime / bestTime);

        if (leaderLap >= estimatedLapsDone*1.8) {
            leaderLap = estimatedLapsDone;
        }
    }

    return leaderLap;
}