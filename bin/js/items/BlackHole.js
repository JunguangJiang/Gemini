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
        return _super.call(this, backgroundImage, width, height, name) || this;
    }
    //item随机生成在背景某处
    BlackHole.prototype.randomGenerate = function (backgroundImage) {
        var _this = this;
        this.item = new Laya.Animation();
        this.item.width = this._width; //不确定要不要在这里设置尺寸！！
        this.item.height = this._height;
        this.item.name = this._name;
        //随机生成坐标并检测是否会与其他物体重叠
        var overlap, x, y, testRec; //用于测试的矩形范围
        testRec = new Laya.Sprite();
        while (true) {
            x = Math.min(backgroundImage.width - this._width, Math.random() * backgroundImage.width);
            y = Math.min(backgroundImage.height - this._height - 150, Math.random() * backgroundImage.height);
            overlap = 0;
            backgroundImage._childs.forEach(function (element) {
                testRec.width = element.width + 2 * _this._width;
                testRec.height = element.height + 2 * _this._height;
                testRec.x = element.x - _this._width;
                testRec.y = element.y - _this._height;
                if (testRec.hitTestPoint(x, y)) {
                    overlap = overlap + 1;
                }
            });
            if (!overlap) {
                break;
            }
        }
        this.item.x = x;
        this.item.y = y;
        backgroundImage.addChild(this.item);
        this.index = backgroundImage.getChildIndex(this.item);
    };
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