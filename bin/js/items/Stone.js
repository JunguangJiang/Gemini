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
var Game;
(function (Game) {
    Game.stoneImage = "res/atlas/ui/stone.png";
    Game.fallingStoneImage = "res/atlas/ui/fallingStone.png";
    Game.fallingStoneSpeed = 5; //陨石下落的平均速度
})(Game || (Game = {}));
var Stone = /** @class */ (function (_super) {
    __extends(Stone, _super);
    function Stone(backgroundImage, width, height, name, isFalling) {
        if (isFalling === void 0) { isFalling = false; }
        var _this = _super.call(this, backgroundImage, width, height, name) || this;
        _this.item = new Laya.Image();
        _this.isFalling = isFalling;
        _this._fallingStoneSpeed = Math.random() % Game.fallingStoneSpeed / 2 + Game.fallingStoneSpeed;
        _this._up = 0;
        _this._down = backgroundImage.height;
        return _this;
    }
    //绘制item
    Stone.prototype.drawItem = function () {
        if (!this.isFalling) {
            this.item.loadImage(Game.stoneImage);
            this.item.scaleX = this._width / 108;
            this.item.scaleY = this._height / 191;
        }
        else {
            this.item.loadImage(Game.fallingStoneImage);
            this.item.scaleX = this._width / 600;
            this.item.scaleY = this._height / 800;
        }
    };
    //判断球是否与陨石相撞，0为不相撞，1为碰撞
    Stone.prototype.detectCollisions = function (ball) {
        if (this._isTouched) {
            return;
        }
        var ballRec = new Laya.Rectangle(ball.x - ball.radius, ball.y - ball.radius, ball.radius * 2, ball.radius * 2);
        var itemRec = this.item.getBounds();
        itemRec = itemRec.setTo(itemRec.x + itemRec.width / 10, itemRec.y + itemRec.height / 10, itemRec.width * 4 / 5, itemRec.height * 4 / 5);
        if (!itemRec.intersects(ballRec)) {
            return 0;
        }
        else {
            return 1;
        }
    };
    //不断更新陨石的位置，只有当_isFalling为真时，位置才会改变
    Stone.prototype.update = function () {
        if (this.isFalling) {
            this.item.y += this._fallingStoneSpeed;
            if (this.item.y >= this._down + this._height) {
                this.item.y = this._up - this._height;
            }
        }
    };
    return Stone;
}(Barrier));
//# sourceMappingURL=Stone.js.map