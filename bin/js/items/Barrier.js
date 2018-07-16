//障碍物抽象类
var Barrier = /** @class */ (function () {
    function Barrier(backgroundImage, width, height, name) {
        this._width = width;
        this._height = height;
        this._name = name;
        this._isTouched = false;
        this._bounds = null;
    }
    //item随机生成在背景某处
    Barrier.prototype.randomGenerate = function (backgroundImage) {
        var _this = this;
        if (this.item) {
            this.item.width = this._width; //不确定要不要在这里设置尺寸！！
            this.item.height = this._height;
            this.item.name = this._name;
            //随机生成坐标并检测是否会与其他物体重叠
            var overlap_1, x_1, y_1, testRec_1; //用于测试的矩形范围
            testRec_1 = new Laya.Sprite();
            while (true) {
                x_1 = Math.min(backgroundImage.width - this._width, Math.random() * backgroundImage.width);
                y_1 = Math.min(backgroundImage.height - this._height - 150, Math.random() * backgroundImage.height);
                overlap_1 = 0;
                backgroundImage._childs.forEach(function (element) {
                    testRec_1.width = element.width + 2 * _this._width;
                    testRec_1.height = element.height + 2 * _this._height;
                    testRec_1.x = element.x - _this._width;
                    testRec_1.y = element.y - _this._height;
                    if (testRec_1.hitTestPoint(x_1, y_1)) {
                        overlap_1 = overlap_1 + 1;
                    }
                });
                if (!overlap_1) {
                    break;
                }
            }
            this.item.x = x_1;
            this.item.y = y_1;
            backgroundImage.addChild(this.item);
        }
    };
    ;
    //更新item的位置等
    Barrier.prototype.update = function () { }; //默认情况下什么都不做
    //获得图片区域内的一个有效区域,xScale和yScale分别为水平和竖直方向的缩放率
    Barrier.prototype.getInnerBounds = function (itemRec, xScale, yScale) {
        itemRec = itemRec.setTo(itemRec.x + itemRec.width * (1 - xScale) / 2, itemRec.y + itemRec.height * (1 - yScale) / 2, itemRec.width * xScale, itemRec.height * yScale);
        return itemRec;
    };
    return Barrier;
}());
//# sourceMappingURL=Barrier.js.map