//一对箭头
var Arrow = /** @class */ (function () {
    function Arrow(left, right, touchCalledBack) {
        this._lastingTime = 0;
        this._arrows = new Array(2);
        this._arrows[0] = left;
        this._arrows[1] = right;
        this._touchCalledBack = touchCalledBack;
        for (var i = 0; i < 2; i++) {
            this._arrows[i].visible = true;
            this._arrows[i].on(Laya.Event.MOUSE_DOWN, this, this.onMouseDown, [i]);
            this._arrows[i].on(Laya.Event.MOUSE_UP, this, this.onMouseUp, [i]);
        }
    }
    //当触摸到箭头时触发
    Arrow.prototype.onMouseDown = function (type) {
    };
    //当不再触摸箭头时触发
    Arrow.prototype.onMouseUp = function (type) {
        this._touchCalledBack.runWith(this._lastingTime); //触摸完成时，返回触摸的持续时间
    };
    return Arrow;
}());
//# sourceMappingURL=Arrow.js.map