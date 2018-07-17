//障碍物类
var Barrier = /** @class */ (function () {
    function Barrier(backgroundImage, blackHolesNum, stonesNum, blackHoleWidth, blackHoleHeight, stoneWidth, stoneHeight) {
        if (blackHolesNum === void 0) { blackHolesNum = 5; }
        if (stonesNum === void 0) { stonesNum = 15; }
        if (blackHoleWidth === void 0) { blackHoleWidth = 100; }
        if (blackHoleHeight === void 0) { blackHoleHeight = 100; }
        if (stoneWidth === void 0) { stoneWidth = 50; }
        if (stoneHeight === void 0) { stoneHeight = 100; }
        this.blackHoles = [];
        this.stones = [];
        this._blackHolesNum = blackHolesNum;
        this._stonesNum = stonesNum;
        this._blackHoleWidth = blackHoleWidth;
        this._blackHoleHeight = blackHoleHeight;
        this._stoneWidth = stoneWidth;
        this._stoneHeight = stoneHeight;
        this.updateBarrier(backgroundImage);
    }
    //更新屏幕上各障碍物的位置
    Barrier.prototype.updateBarrier = function (backgroundImage) {
        var _this = this;
        //初始化
        this.blackHoles.slice(0);
        this.stones.slice(0);
        while (backgroundImage.removeChildByName("blackhole"))
            ;
        while (backgroundImage.removeChildByName("stone"))
            ;
        //黑洞的位置
        var blackHoleDistance = backgroundImage.height / this._blackHolesNum;
        for (var i = 0; i < this._blackHolesNum; i++) {
            var blackhole = new Laya.Animation();
            blackhole.width = this._blackHoleWidth;
            blackhole.height = this._blackHoleHeight;
            blackhole.name = "blackhole";
            blackhole.x = Math.min(backgroundImage.width - this._blackHoleWidth, Math.random() * backgroundImage.width);
            blackhole.y = Math.min((i + Math.random()) * blackHoleDistance, backgroundImage.height - this._blackHoleHeight - 100); //在y方向基本承均匀分布
            this.blackHoles.push(blackhole);
            backgroundImage.addChild(blackhole);
        }
        //陨石的位置（需设置不与黑洞重叠）
        var stoneDistance = backgroundImage.height / this._stonesNum;
        var _loop_1 = function (i) {
            var stone = new Laya.Image();
            stone.width = this_1._stoneWidth;
            stone.height = this_1._stoneHeight;
            stone.name = "stone";
            //随机生成坐标并检测是否会与黑洞重叠
            var overlap, x, y, testRec; //用于测试的矩形范围
            testRec = new Laya.Sprite();
            testRec.width = this_1._blackHoleWidth + 2 * this_1._stoneWidth;
            testRec.height = this_1._blackHoleHeight + 2 * this_1._stoneHeight;
            while (true) {
                x = Math.min(backgroundImage.width - this_1._stoneWidth, Math.random() * backgroundImage.width);
                y = Math.min((i + Math.random()) * stoneDistance, backgroundImage.height - this_1._stoneHeight - 100);
                overlap = 0;
                this_1.blackHoles.forEach(function (element) {
                    testRec.x = element.x - _this._stoneWidth;
                    testRec.y = element.y - _this._stoneHeight;
                    if (testRec.hitTestPoint(x, y)) {
                        overlap = overlap + 1;
                    }
                });
                if (!overlap) {
                    break;
                }
            }
            stone.x = x;
            stone.y = y;
            this_1.stones.push(stone);
            backgroundImage.addChild(stone);
        };
        var this_1 = this;
        for (var i = 0; i < this._stonesNum; i++) {
            _loop_1(i);
        }
    };
    //绘制各障碍物的动画或图像
    Barrier.prototype.drawBarriers = function () {
        var _this = this;
        this.blackHoles.forEach(function (element) {
            element.loadAnimation(Game.serverResURL + "/GameAnimation/BlackHole.ani");
            element.scaleX = _this._blackHoleWidth / 100;
            element.scaleY = _this._blackHoleHeight / 100;
            element.play();
        });
        this.stones.forEach(function (element) {
            element.loadImage("res/atlas/ui/stone.png");
            element.scaleX = _this._stoneWidth / 108;
            element.scaleY = _this._stoneHeight / 191;
        });
    };
    return Barrier;
}());
//# sourceMappingURL=Barrier.js.map