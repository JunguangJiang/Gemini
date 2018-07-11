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
        //球的初始化
        _this._smallBall = new Ball(50, 343, 265, _this.smallBallView);
        //控制方向的箭头区域的初始化
        _this._arrow = new Arrow(_this.arrowView.getChildByName("left"), _this.arrowView.getChildByName("right"), Laya.Handler.create(_this, _this.onTouch, null, false));
        return _this;
        //
    }
    //当触摸结束时调用
    GameView.prototype.onTouch = function (lastingTime) {
        console.log("触摸结束,持续时间为" + lastingTime);
    };
    //碰撞检测与处理
    GameView.prototype.collisionDetect = function () {
        //分析当前球和其他物体的位置关系，并作出相应的处理
        //碰撞检测方式：获取Laya.Image的getBounds(),然后调用intersect方法判断是否发生碰撞
    };
    return GameView;
}(ui.GameViewUI));
//# sourceMappingURL=GameView.js.map