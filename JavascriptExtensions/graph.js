// not used: lag

/*
 * GRAPH TEMPERATURE
 */

/*
Each elemet is a Box 1px Height.
When that Box is at first position, her Width is updated.
Then each new rendering update increase position, making Box moving up,
and Top Box taking her place.



Since each object has his own instance of js, we don’t need to create all
Box at same time. Just let each Box create his own js Object to work with.
*/

var GraphLine = Object.create(Box, {
    Height: { value: 1, enumerable: true, configurable: false, writable: false },
    minTop: { value: 0, enumerable: true, configurable: true, writable: true },
    maxTop: { value: 10, enumerable: true, configurable: true, writable: true },
    maxWidth: { value: 10, enumerable: true, configurable: true, writable: true },
    position: { value: 0, enumerable: true, configurable: true, writable: true },
    Visible: { value: 1, enumerable: true, configurable: true, writable: true },
    RenderingSkip: { value: 31, enumerable: true, configurable: true, writable: true },
    Opacity: { value: 100, enumerable: true, configurable: true, writable: true },
});

GraphLine.movingLine = function () {
    //return 55;
    this.Top++;
    if (this.Top > this.maxTop) {
        this.Top = this.minTop;
        this.refresh();
        this.BackgroundColor = wGetTireColor(this.Position, this.Side);
    };
    return this.Top;
};
// Width calc
GraphLine.refresh = function () {
    let minTemp = 30;
    let maxTemp = 130;
    
    let maxTemp = (maxTemp-minTemp);
    let temp = Math.round(wGetTireTemp('Front', 'Left')) - minTemp;
    if (temp > maxTemp ) temp = maxTemp;
    this.Width = (this.maxWidth/maxTemp)*temp;
};

root['tireGraph'] = new Object();
//let tireHeight = 210;
//let tireBorder = 2; // so Height = 206
root.tireGraph['property'] = new Object();

// Container properties.
root.tireGraph.property['Top'] = 5;
root.tireGraph.property['Left'] = 5;
root.tireGraph.property['Height'] = 210;
root.tireGraph.property['Width'] = 130;
root.tireGraph.property['Border'] = 2;

// Four tires graphs.
root.tireGraph['Box'] = new Object();
root.tireGraph.Box['Front'] = new Object();
root.tireGraph.Box['Rear'] = new Object();
root.tireGraph.Box.Front['Left'] = new Object();
root.tireGraph.Box.Front['Right'] = new Object();
root.tireGraph.Box.Rear['Left'] = new Object();
root.tireGraph.Box.Rear['Right'] = new Object();



 function getGraphValue(position, side, timeIndex, tValue) {
    position = tcase(position);
    side = tcase(side);
    
    if ( timeIndex >= root.tireGraph.property['Height'] - (2*root.tireGraph.property['Border']) ) {
        return 0;
    }
 
    Name = 'graphLine'+timeIndex;
 
    if (    root.tireGraph.Box[position][side][Name] == null
            || root.tireGraph.Box[position][side][Name] == undefined ) {
        let top = root.tireGraph.property['Top'];
        let left = root.tireGraph.property['Left'];
        let width = root.tireGraph.property['Width'];
        let height = root.tireGraph.property['Height'];
        let border = root.tireGraph.property['Border'];

        // creating Box
        root.tireGraph.Box[position][side][Name] = Object.create(GraphLine);
        root.tireGraph.Box[position][side][Name].Name = Name;
        root.tireGraph.Box[position][side][Name].Left = left + border;
        root.tireGraph.Box[position][side][Name].Position = position;
        root.tireGraph.Box[position][side][Name].Side = side;
        
        root.tireGraph.Box[position][side][Name].refresh();
                
        // set minimum Top position
        root.tireGraph.Box[position][side][Name].minTop = top + border;
        root.tireGraph.Box[position][side][Name].maxTop = top + height - (2*border);
        root.tireGraph.Box[position][side][Name].maxWidth = width - (2*border);
        // first position, who is timeIndex pixels above minTop.
        root.tireGraph.Box[position][side][Name].Top = root.tireGraph.Box[position][side][Name].minTop + timeIndex;
        
        root.tireGraph.Box[position][side][Name].setBorder(0);
        root.tireGraph.Box[position][side][Name].BackgroundColor = '#FFFFFFFF';
    } else { root.tireGraph.Box[position][side][Name].movingLine(); }
    
    if ( root.tireGraph.Box[position][side][Name][tValue] != null ) {
        return root.tireGraph.Box[position][side][Name][tValue];
    } else {
        return tValue+' doesn’t exist';
    }
 
    return 0;
}

 
 /*
return getGraphValue(0, 'Width',);
return getGraphValue(0, 'Top');
return getGraphValue(0, 'Left');
*/
 


/*
 * END GRAPH TEMPERATURE
 */

