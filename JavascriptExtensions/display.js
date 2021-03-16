
// Non editable box: layer
function Layer() {}
Layer.prototype = {    
    Name: '',
    // position
    Top: 0,
    Left: 0,
    Right: 0,   // generated from Left
    Bottom: 0,  // generated from Top
    
    // Size
    Width: 160,
    Height: 50,
    Visible: true,
    
    BlinkDelay: 250,
    BlinkEnabled: 0,
    Opacity: 100,
    
    Text: null,
    
    constructor: function(pName,pTop,pLeft,pWidth,pHeight) {
        this.Name = pName;
        
        if (pHeight != null) this.setHeight(pHeight); else this.setHeight(this.Height);
        if (pWidth != null) this.setWidth(pWidth); else this.setWidth(this.Width);
        if (pTop != null) this.setTop(pTop); else this.setTop(this.Top);
        if (pLeft != null) this.setLeft(pLeft); else this.setLeft(this.Left);
    },
    
    // sizes
    setBorder: function(value) {
        if (value <= 0) { return false; }
        this.Border = value;
        return true;
    },
    setWidth: function(value) {
        if (value <= 0) { return false; }
        this.Width = value;
        return true;
    },    
    setHeight: function(value) {
        if (value <= 0) { return false; }
        this.Height = value;
        return true;
    },
    
    // Vertical position
    setTop: function(value) {
        if (value < 0) { return false; }
        this.Top = value;
        this.Bottom = this.Top + this.Height;
        return true;
    },
    setBottom: function(value) {
        if (value < 0) { return false; }
        this.Bottom = value;
        this.Top = this.Bottom - this.Height;
        return true;
    },   

    // Horizontal position
    setLeft: function(value) {
        if (value < 0) { return false; }
        this.Left = value;
        this.Right = this.Left + this.Width;
        return true;
    },    
    setRight: function(value) {
        if (value < 0) { return false; }
        this.Right = value;
        this.Left = this.Right - this.Width;
        return true;
    },
};


// Same as layer, but with more properties.
var Box = Object.create(Layer, {
    Rotated: { value: 0, enumerable: true, configurable: true, writable: true },
    
    BlinkDelay:  { value: 250, enumerable: true, configurable: true, writable: true },
    BlinkEnabled: { value: 0, enumerable: true, configurable: true, writable: true },
    BlurRadius: { value: 0, enumerable: true, configurable: true, writable: true },

    BackgroundColor: { value: '#00000000', enumerable: true, configurable: true, writable: true },
    BorderColor: { value: '#FFFFFFFF', enumerable: true, configurable: true, writable: true },
    
    // Border Width
    Border: { value: 0, enumerable: true, configurable: true, writable: true },
    BorderTop: { value: 0, enumerable: true, configurable: true, writable: true },
    BorderLeft: { value: 0, enumerable: true, configurable: true, writable: true },
    BorderRight: { value: 0, enumerable: true, configurable: true, writable: true },
    BorderBottom: { value: 0, enumerable: true, configurable: true, writable: true },
    // Border Radius
    Radius: { value: 0, enumerable: true, configurable: true, writable: true },
    RadiusTopLeft: { value: 0, enumerable: true, configurable: true, writable: true },
    RadiusTopRight: { value: 0, enumerable: true, configurable: true, writable: true },
    RadiusBottomLeft: { value: 0, enumerable: true, configurable: true, writable: true },
    RadiusBottomRight: { value: 0, enumerable: true, configurable: true, writable: true },
    
    RenderingSkip: { value: 0, enumerable: true, configurable: true, writable: true },
    Rotation: { value: 0, enumerable: true, configurable: true, writable: true },
});

Box.setBorder = function (pvalue) {
        this.Border = pvalue;
        for ( b in Array(this.BorderTop, this.BorderBottom, this.BorderLeft, this.BorderRight) ) {
            b = this.Border;
        }
};

Box.setRadius = function (pvalue) {
        this.Radius = pvalue;
        for ( b in Array(this.RadiusTopLeft, this.RadiusTopRight, this.RadiusBottomLeft, this.RadiusBottomRight) ) {
            b = this.Radius;
        }
};
 





 
    