/*
    constructor: function(pName,pTop,pLeft,pWidth,pHeight) {
        this.Name = pName;
        
        if (pHeight != null) this.setHeight(pHeight); else this.setHeight(this.Height);
        if (pWidth != null) this.setWidth(pWidth); else this.setWidth(this.Width);
        if (pTop != null) this.setTop(pTop); else this.setTop(this.Top);
        if (pLeft != null) this.setLeft(pLeft); else this.setLeft(this.Left);
        
        this.createText();
    },
*/

root.map = Object.create(Box);
root.map.Top = 270;
root.map.Left = 2;
root.map.Width = 160;
root.map.Height = 50;
root.map.Visible = 1;
root.map.getMapVisibility = function () {
    if ( $prop('GameRawData.Physics.ignitionOn') && $prop('DataCorePlugin.GameData.MapAllowed') ) return this.Visible ;
    return false;
}

//('radar0',126,2,160,50)
root.radar = Object.create(Box);
root.radar.Top = 126;
root.radar.Left = 2;
root.radar.Width = 160;
root.radar.Height = 322;
root.radar.Visible = 0;
root.radar.getRadarVisibility = function () {
    if ( !$prop('GameRawData.Physics.ignitionOn') || $prop('IsInPitLane') ) { return false; }

    let bDis = $prop('PersistantTrackerPlugin.DriverBehind_00_Distance');
    let aDis = $prop('PersistantTrackerPlugin.DriverAhead_00_Distance');

    if ( this.checkOpponentsPos() > 0 ) { return 1; }
    return this.Visible;
}

root.radar.checkOpponentsPos = function() {
    
    for (let i = 0; i<2; i++) {
        let bDis = $prop('PersistantTrackerPlugin.DriverBehind_0'+i+'_Distance');
        let aDis = $prop('PersistantTrackerPlugin.DriverAhead_0'+i+'_Distance');
        
        // WTF?!
        if (bDis == 0 || aDis == 0) return 0;
        
        // opponent really near?       
        if ( bDis <= 20 || aDis >= -20) return 1;
        
        // opponent in radar area?
        else if ( bDis <= 40 || aDis >= -40) return 2;
    }
}

root.radar.getTop = function() {
    switch ( this.checkOpponentsPos() ) {
        case 2: this.Top = 126; break;
        case 1: this.Top = 270; break;
    }
    return this.Top;
}
root.radar.getHeight = function() {
    switch ( this.checkOpponentsPos() ) {
        case 2: this.Height = 322; break;
        case 1: this.Height = 178; break;
    }
    return this.Height;
}



