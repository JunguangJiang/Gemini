//计时器类
var Timer = /** @class */ (function () {
    function Timer() {
        this._stockTime = 0;
        this.start();
    }
    //开始计时
    Timer.prototype.start = function () {
        this._isRunning = true;
        this._oldTime = new Date().getTime();
    };
    //获得从上次计时开始后所经过的时间
    Timer.prototype.get = function () {
        if (this._isRunning) {
            this.pause();
            this.start();
        }
        return this._stockTime;
    };
    //暂停
    Timer.prototype.pause = function () {
        if (this._isRunning) {
            this._stockTime += (new Date().getTime() - this._oldTime);
            this._isRunning = false;
        }
    };
    //停止
    Timer.prototype.stop = function () {
        this._isRunning = false;
        this._stockTime = 0;
    };
    return Timer;
}());
//# sourceMappingURL=Timer.js.map