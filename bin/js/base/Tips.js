//游戏提示栏
var Tips = /** @class */ (function () {
    function Tips(text) {
        this.text = text;
    }
    //设置文本内容
    Tips.prototype.setText = function (tips) {
        this.text.text = tips;
        Laya.timer.once(5000, this, this.unsetText, [], false);
    };
    //清楚文本内容
    Tips.prototype.unsetText = function () {
        this.text.text = "";
    };
    return Tips;
}());
//# sourceMappingURL=Tips.js.map