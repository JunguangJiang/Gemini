var BarriersManagement = /** @class */ (function () {
    function BarriersManagement(backgroundImage, blackHolesNum, blackHoleWidth, blackHoleHeight, blackHoleName, stonesNum, stoneWidth, stoneHeight, stoneName) {
        if (blackHolesNum === void 0) { blackHolesNum = 5; }
        if (blackHoleWidth === void 0) { blackHoleWidth = 100; }
        if (blackHoleHeight === void 0) { blackHoleHeight = 100; }
        if (blackHoleName === void 0) { blackHoleName = "blackhole"; }
        if (stonesNum === void 0) { stonesNum = 15; }
        if (stoneWidth === void 0) { stoneWidth = 50; }
        if (stoneHeight === void 0) { stoneHeight = 100; }
        if (stoneName === void 0) { stoneName = "stone"; }
        /*黑洞初始化*/
        this.blackHoles = [];
        this._blackHolesNum = blackHolesNum;
        this._blackHoleWidth = blackHoleWidth;
        this._blackHoleHeight = blackHoleHeight;
        this._blackHoleName = blackHoleName;
        /*陨石初始化*/
        this.stones = [];
        this._stonesNum = stonesNum;
        this._stoneWidth = stoneWidth;
        this._stoneHeight = stoneHeight;
        this._stoneName = stoneName;
        //更新所有障碍物
        this.updateBarrier(backgroundImage);
    }
    //更新屏幕上所有障碍物
    BarriersManagement.prototype.updateBarrier = function (backgroundImage) {
        //初始化
        this.blackHoles.slice(0);
        while (backgroundImage.removeChildByName(this._blackHoleName))
            ;
        this.stones.slice(0);
        while (backgroundImage.removeChildByName(this._stoneName))
            ;
        //生成黑洞数组
        for (var i = 0; i < this._blackHolesNum; i++) {
            var blackhole = new BlackHole(backgroundImage, this._blackHoleWidth, this._blackHoleHeight, this._blackHoleName);
            blackhole.randomGenerate(backgroundImage);
            this.blackHoles.push(blackhole);
        }
        //生成陨石数组
        for (var i = 0; i < this._stonesNum; i++) {
            var stone = new Stone(backgroundImage, this._stoneWidth, this._stoneHeight, this._stoneName);
            stone.randomGenerate(backgroundImage);
            this.stones.push(stone);
        }
    };
    //绘制各障碍物的动画或图像
    BarriersManagement.prototype.drawBarriers = function () {
        this.blackHoles.forEach(function (element) {
            element.drawItem();
        });
        this.stones.forEach(function (element) {
            element.drawItem();
        });
    };
    return BarriersManagement;
}());
//# sourceMappingURL=BarriersManagement.js.map