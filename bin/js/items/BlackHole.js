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
var BlackHole = /** @class */ (function (_super) {
    __extends(BlackHole, _super);
    function BlackHole(backgroundImage, width, height, name) {
        var _this = _super.call(this, backgroundImage, width, height, name) || this;
        _this.item = new Laya.Animation();
        return _this;
    }
    //绘制item
    BlackHole.prototype.drawItem = function () {
        this.item.loadAnimation("res/GameAnimation/BlackHole.ani");
        this.item.scaleX = this._width / 60;
        this.item.scaleY = this._height / 60;
        this.item.play();
    };
    //判断球是否与黑洞相撞，0为不相撞，1为相撞
    BlackHole.prototype.detectCollisions = function (ball) {
        if (this._bounds === null) {
            this._bounds = this.getInnerBounds(this.item.getBounds(), 0.25, 0.25);
        }
        if (this._isTouched)
            return false; //如果已经碰撞，则不再判断
        //判断球是否进入黑洞
        return this._bounds.intersects(ball.animation.getBounds());
    };
    return BlackHole;
}(Barrier));
//# sourceMappingURL=BlackHole.js.map