var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
//游戏的主视图
var GameView = /** @class */ (function (_super) {
    __extends(GameView, _super);
    function GameView() {
        var _this = _super.call(this) || this;
        _this._smallBall = new Ball(100, 343, 265, _this.smallBallView);
        _this._arrow = new Arrow(_this.arrowView.getChildByName("left"), _this.arrowView.getChildByName("right"), Laya.Handler.create(_this, _this.onTouch));
        return _this;
    }
    //当触摸结束时调用
    GameView.prototype.onTouch = function (lastingTime) {
        console.log("触摸结束,持续时间为" + lastingTime);
    };
    return GameView;
}(ui.GameViewUI));
//# sourceMappingURL=GameView.js.map