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
// 星座类
var Zodiac = /** @class */ (function (_super) {
    __extends(Zodiac, _super);
    function Zodiac(backgroundImage, width, height, name, type) {
        var _this = _super.call(this, backgroundImage, width, height, name) || this;
        _this._type = type;
        _this.item = new Laya.Clip();
        _this.item.clipX = 3;
        _this.item.clipY = 4;
        _this.item.index = type % 12;
        _this.init();
        return _this;
    }
    //绘制item
    Zodiac.prototype.drawItem = function () {
        console.log("drawing zodiac:" + this._isTouched);
        if (!this._isTouched) {
            this.item.skin = Game.zodiacLightImage;
            this.item.alpha = 0.3;
        }
        else {
            this.item.skin = Game.zodiacYellowImage;
            this.item.alpha = 0.7;
        }
        this.item.scaleX = this._width / 100;
        this.item.scaleY = this._height / 100;
    };
    //判断小球是否与星座相接触
    Zodiac.prototype.detectCollisions = function (ball) {
        if (this._bounds === null) {
            this._bounds = this.getInnerBounds(this.item.getBounds(), 0.8, 0.8);
            // console.log("星座:" + this._bounds+" 是否碰到:"+this._isTouched);
        }
        if (!this._isTouched && this._bounds.intersects(ball.animation.getBounds())) {
            // console.log("碰到星座");
            this._isTouched = true;
            this.drawItem();
            return true;
        }
        return false;
    };
    return Zodiac;
}(Barrier));
//# sourceMappingURL=Zodiac.js.map