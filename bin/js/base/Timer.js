//计时器类
var Timer = /** @class */ (function () {
    function Timer() {
        this.start();
    }
    //开始计时
    Timer.prototype.start = function () {
        this._oldTime = new Date().getTime();
    };
    //获得从上次计时开始后所经过的时间
    Timer.prototype.get = function () {
        return new Date().getTime() - this._oldTime;
    };
    return Timer;
}());
//# sourceMappingURL=Timer.js.map