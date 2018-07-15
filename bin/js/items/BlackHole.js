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
        this.item.loadAnimation(Game.serverResURL + "/GameAnimation/BlackHole.ani");
        this.item.scaleX = this._width / 100;
        this.item.scaleY = this._height / 100;
        this.item.play();
    };
    //判断球是否与黑洞相撞，0为不相撞，1为相撞
    BlackHole.prototype.detectCollisions = function (ball) {
        var ballRec = new Laya.Rectangle(ball.x - ball.radius, ball.y - ball.radius, ball.radius * 2, ball.radius * 2);
        //判断球是否进入黑洞
        var inBlackhole = 0;
        var itemRec = this.item.getBounds();
        itemRec = itemRec.setTo(itemRec.x + itemRec.width / 10, itemRec.y + itemRec.height / 10, itemRec.width * 4 / 5, itemRec.height * 4 / 5);
        if (itemRec.intersects(ballRec)) {
            inBlackhole = 1;
        }
        return inBlackhole;
    };
    return BlackHole;
}(Barrier));
//# sourceMappingURL=BlackHole.js.map