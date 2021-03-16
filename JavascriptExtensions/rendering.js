
const maxFPS = 60;
const renderingTime = {
    'default': {
        'default':  300,    // default value
        'time':     250,    // Lap updates
        'wheel':    350,    // temperatures, pressions, lifetimes, … 
        'graphic':  750,    // interfaces and organizing colors
        'command':  50,     // graphics cursors, like throttle or RPM
    },
    'idle': {
        'default':  500,
        'time':     1500,
        'wheel':    1500,
        'graphic':  500,
        'command':  1000,
    },
};

root.renderingSkip = new Object();
root.renderingSkip['default'] = new Object();
root.renderingSkip['idle'] = new Object();

function skippingTest() {
    var retString = '';
    for (var rStatus in renderingTime) {
        for (var oType in renderingTime[rStatus]) {
            var rT = getRenderingTime(oType,rStatus);
            retString += '['+ rStatus +"] "+ oType +"\tt["+ format(rT, '000') +']';
            
            var rS = getRenderingSkip(oType, rStatus);
            retString += ',\trSkip:['+ rS;/**/
            
            retString += "]\n";
        }
        retString += "\n";
    }
    
    return retString;
    return 'This is a really long text, about to be cutted.';
}


/*
 * Internal tests.
 */
function isStatusExists(rStatus) {
    if ( renderingTime[rStatus] == null 
            || renderingTime[rStatus] == undefined ) {
        return 0;
    }
    return 1;
}
function isRenderingTimeExists(objectType, renderingStatus) {
	if ( renderingTime[renderingStatus][objectType] == null
            || renderingTime[renderingStatus][objectType] == undefined) {
        return 0;
    }
    return 1;
}
function isRenderingSkipExists(objectType, renderingStatus) {
	if ( root.renderingSkip[renderingStatus][objectType] == null
            || root.renderingSkip[renderingStatus][objectType] == undefined) {
        return 0;
    }
    return 1;
}

/*
 * END Internal tests.
 */
 


function getRenderingTime(objectType, renderingStatus) {
    if ( !isStatusExists(renderingStatus) ) {
        renderingStatus = 'default';
    }
	if ( isRenderingTimeExists(objectType, renderingStatus) ) {
        return renderingTime[renderingStatus]['default'];
    }
    return renderingTime[renderingStatus][objectType];
}


/* Checks if objectType exists and already got data.
 * Unless get referred time and renderingSkip, and calculate.
 */
function getRenderingSkip(objectType, rStatus) {
    // Checks if exists and format.
    objectType = lcase(objectType);
    rStatus = lcase( rStatus );
    var renderingStatus = 'default';

    // Don’t need to get times if ignition off.
    if ( (rStatus == null || rStatus == '') && !$prop('GameRawData.Physics.ignitionOn') ) {
        renderingStatus = 'idle';
    } else { renderingStatus = rStatus; };
    
    // if unknown renderingSkip return it, else lets find time and calculate.
    if ( isRenderingSkipExists(objectType, renderingStatus) ) {
        return root.renderingSkip[renderingStatus][objectType];
    }

    // if rendering skip isn't in hash, lets find time and calc skip.
    var objectTime = getRenderingTime(objectType, renderingStatus);
    root.renderingSkip[renderingStatus][objectType] = time2Skip(objectTime);
    
    return root.renderingSkip[renderingStatus][objectType];
}

// return waiting time by renderingSkip
function time2Skip(t) {
    // seconds to ms
    t /= 1000;
    
    // Don’t need too much rendering.
    var FPS = $prop('DataCorePlugin.DataUpdateFps');  
    if (FPS > maxFPS) {
        FPS += FPS - maxFPS;
    }
    
    var oneFrameTime = 1/FPS;
    var nbFrames = t/oneFrameTime;
    var skipped = FPS - nbFrames;

    return Math.round( FPS - skipped );
}

