
// Text object. Same as box, but with Text property.
var TextBox = Object.create(Box, {
    CharWidth: { value: 6, enumerable: true, configurable: true, writable: true },
    TextWrapping: { value: 'NoWrap', enumerable: true, configurable: true, writable: false },
    TextColor: { value: '#FFFFFFFF', enumerable: true, configurable: true, writable: true },
    ShadowBlur: { value: 0, enumerable: true, configurable: true, writable: true },
    ShadowColor: { value: '#FFFFFFFF', enumerable: true, configurable: true, writable: true },
    ShadowDept: { value: 0, enumerable: true, configurable: true, writable: true },
    ShadowDirection: { value: 315, enumerable: true, configurable: true, writable: true },
    Monospace: { value: 0, enumerable: true, configurable: true, writable: true },
});

TextBox.setValue = function (pvalue) {
    this.Text = pvalue;
    this.Width = this.CharWidth * this.Text.lenght;
    this.Height = 16;
};
TextBox.setWrapping = function (pvalue) {
    switch (lcase(pvalue)) {
        case 'nowrap':
        case 1:
            this.TextWrapping = 1;
            break;
        case 'wrap':
        case 2:
            this.TextWrapping = 2;
            break;
        case 'wrapwithoverflow':
        case 0:
        default:
            this.TextWrapping = 0;
            break;            
    }
    
    /*
    createText: function() {        
        this.Text = Object.create(Text);
        this.Text.setValue(this.Name);
        this.Text.Rotated = -90;
    },*/
};







/*
 * Creating Left boxes.
 */
 /*
root.box = new Object();
root.box.Left = new Object();
root.box.Left = {
	'Fuel': new Box(),
	'Lap': new Box(),
	'Level': new Box(),
	'Done': new Box(),
	'Pos': new Box(),
};

lastBox = new Box();
lastBox.init('dummy', 4, 2, 160, 50);
lastBox.Border = 2;

for (elem in root.box.Left) {
    
    TopPos = lastBox.Top + lastBox.Height - lastBox.Border;
    root.box.Left[elem] = new Box();
    root.box.Left[elem].init(elem, TopPos, lastBox.Left, lastBox.Width, lastBox.Height);
    root.box.Left[elem].Border = lastBox.Border;
    
    lastBox = root.box.Left[elem];
}
*/
/*
 * End creating Left boxes.
 */