//可移动类的接口
var Movable = /** @class */ (function () {
    function Movable() {
        this._timer = new Timer();
    }
    //使静止
    Movable.prototype.stop = function () {
        this._vx = this._vy = this._ax = this._ay = 0;
    };
    Object.defineProperty(Movable.prototype, "vx", {
        //获取速度
        get: function () { return this._vx; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Movable.prototype, "vy", {
        get: function () { return this._vy; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Movable.prototype, "ax", {
        //获取加速度
        get: function () { return this._ax; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Movable.prototype, "ay", {
        get: function () { return this._ay; },
        enumerable: true,
        configurable: true
    });
    //对位置和速度进行更新
    Movable.prototype.update = function () {
        var deltaT = this._timer.get() / 1000.0 * 1.5;
        this.x = this.x + this._vx * deltaT;
        this.y = this.y + this._vy * deltaT;
        this._vx = this._vx + this._ax * deltaT;
        this._vy = this._vy + this._ay * deltaT;
        this._timer.start();
    };
    return Movable;
}());
//# sourceMappingURL=Movable.js.map