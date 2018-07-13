//球类
var Ball = /** @class */ (function () {
    function Ball(radius, x, y, image) {
        this._image = image;
        this._image.size(2 * radius, 2 * radius); //设置小球的半径
        this._radius = radius;
        this._image.visible = true;
        this._vx = this._vy = this._ax = this._ay = 0;
        this._timer = new Timer();
        this._forces = new Laya.Dictionary();
        this.x = x;
        this.y = y; //设置小球的位置
    }
    Object.defineProperty(Ball.prototype, "x", {
        //获取球的当前位置（球心）
        get: function () { return this._image.x + this.radius; },
        //设置球的当前位置(球心)
        set: function (x) { this._image.x = x - this.radius; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Ball.prototype, "y", {
        get: function () { return this._image.y + this.radius; },
        set: function (y) { this._image.y = y - this.radius; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Ball.prototype, "vx", {
        //获取球的速度
        get: function () { return this._vx; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Ball.prototype, "vy", {
        get: function () { return this._vy; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Ball.prototype, "radius", {
        //获取球的半径
        get: function () { return this._radius; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Ball.prototype, "image", {
        //获取球的图片
        get: function () { return this._image; },
        enumerable: true,
        configurable: true
    });
    //对小球增加受力，Fx/Fy分别为水平和数值方向的分量,name为该力的种类
    //认为小球的质量均为1
    Ball.prototype.setForce = function (Fx, Fy, name) {
        this.removeForce(name);
        this._ax += Fx;
        this._ay += Fy;
        this._forces.set(name, { Fx: Fx, Fy: Fy });
    };
    //移除小球上的力name
    Ball.prototype.removeForce = function (name) {
        var value = this._forces.get(name);
        if (value) {
            this._ax -= value.Fx;
            this._ay -= value.Fy;
            this._forces.remove(name);
        }
    };
    //碰撞会改变小球的速度分量，使原先的<Vx,Vy>变成<-Vx * xRatio, -Vy * yRatio>
    Ball.prototype.collide = function (xRatio, yRatio) {
        this._vx = this._vx * xRatio;
        this._vy = this._vy * yRatio;
    };
    //对小球的位置和速度进行更新
    Ball.prototype.update = function () {
        var deltaT = this._timer.get() / 1000.0;
        this.x = this.x + this._vx * deltaT;
        this.y = this.y + this._vy * deltaT;
        this._vx = this._vx + this._ax * deltaT;
        this._vy = this._vy + this._ay * deltaT;
        this._timer.start();
    };
    return Ball;
}());
//# sourceMappingURL=Ball.js.map