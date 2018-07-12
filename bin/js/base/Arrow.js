//一对箭头
var Arrow = /** @class */ (function () {
    function Arrow(left, right, touchStart, touchEnd) {
        this._arrows = new Array(2);
        this._arrows[0] = left;
        this._arrows[1] = right;
        this._touchStart = touchStart;
        this._touchEnd = touchEnd;
        for (var i = 0; i < 2; i++) {
            this._arrows[i].visible = true;
            this._arrows[i].on(Laya.Event.MOUSE_DOWN, this, this.onMouseDown, [i]);
            this._arrows[i].on(Laya.Event.MOUSE_UP, this, this.onMouseUp, [i]);
        }
    }
    //当触摸到箭头时触发
    Arrow.prototype.onMouseDown = function (type) {
        this._touchStart.runWith({
            type: type === 0 ? "left" : "right"
        });
    };
    //当不再触摸箭头时触发
    Arrow.prototype.onMouseUp = function (type) {
        this._touchEnd.runWith({
            type: type === 0 ? "left" : "right"
        });
    };
    return Arrow;
}());
//# sourceMappingURL=Arrow.js.map