//球类
var Ball = /** @class */ (function () {
    function Ball(radius, x, y, image) {
        this._image = image;
        this._image.size(radius, radius); //设置小球的半径
        this._image.pos(x, y); //设置小球的位置
        this._image.visible = true;
    }
    Object.defineProperty(Ball.prototype, "x", {
        //获取球的当前位置
        get: function () {
            return this._image.x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Ball.prototype, "y", {
        get: function () {
            return this._image.y;
        },
        enumerable: true,
        configurable: true
    });
    //对小球进行施力,x/y分别为水平和数值方向的分量,t为施力的持续时间
    Ball.prototype.force = function (x, y, t) {
    };
    //对小球施加冲量，x/y分别为水平和数值方向的分量
    Ball.prototype.momentum = function (x, y) {
    };
    //每过单位时间，对小球的位置进行更新
    Ball.prototype.updatePosition = function () {
    };
    return Ball;
}());
//# sourceMappingURL=Ball.js.map