var BarriersManagement = /** @class */ (function () {
    function BarriersManagement(backgroundImage, fallingStoneRate, blackHolesNum, blackHoleWidth, blackHoleHeight, blackHoleName, stonesNum, stoneWidth, stoneHeight, stoneName, zodiacsNum, zodiacWidth, zodiacHeight, zodiacName) {
        if (fallingStoneRate === void 0) { fallingStoneRate = 0; }
        if (blackHolesNum === void 0) { blackHolesNum = 10; }
        if (blackHoleWidth === void 0) { blackHoleWidth = 100; }
        if (blackHoleHeight === void 0) { blackHoleHeight = 100; }
        if (blackHoleName === void 0) { blackHoleName = "blackhole"; }
        if (stonesNum === void 0) { stonesNum = 16; }
        if (stoneWidth === void 0) { stoneWidth = 50; }
        if (stoneHeight === void 0) { stoneHeight = 100; }
        if (stoneName === void 0) { stoneName = "stone"; }
        if (zodiacsNum === void 0) { zodiacsNum = 12; }
        if (zodiacWidth === void 0) { zodiacWidth = 100; }
        if (zodiacHeight === void 0) { zodiacHeight = 100; }
        if (zodiacName === void 0) { zodiacName = "zodiac"; }
        this._backgroundImage = backgroundImage;
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
        /* 星座的初始化 */
        this.zodiacs = [];
        this._zodiacNum = zodiacsNum;
        this._zodiacWidth = zodiacWidth;
        this._zodiacHeight = zodiacHeight;
        this._zodiacName = zodiacName;
        this.fallingStoneRate = fallingStoneRate;
    }
    //清除所有的障碍物
    BarriersManagement.prototype.clear = function () {
        // this.blackHoles.slice(0);
        this.blackHoles = [];
        while (this._backgroundImage.removeChildByName(this._blackHoleName))
            ;
        // this.stones.slice(0);
        this.stones = [];
        while (this._backgroundImage.removeChildByName(this._stoneName))
            ;
        // this.zodiacs.slice(0);
        this.zodiacs = [];
        while (this._backgroundImage.removeChildByName(this._zodiacName))
            ;
    };
    //重新生成屏幕上所有障碍物
    BarriersManagement.prototype.regenerateBarrier = function () {
        //初始化
        this.clear();
        //生成黑洞数组
        for (var i = 0; i < this._blackHolesNum; i++) {
            var blackhole = new BlackHole(this._backgroundImage, this._blackHoleWidth, this._blackHoleHeight, this._blackHoleName);
            blackhole.randomGenerate(this._backgroundImage);
            this.blackHoles.push(blackhole);
        }
        //生成陨石数组
        for (var i = 0; i < this._stonesNum; i++) {
            var isFalling = Math.random() <= this.fallingStoneRate;
            var stone = new Stone(this._backgroundImage, this._stoneWidth, this._stoneHeight, this._stoneName, isFalling);
            stone.randomGenerate(this._backgroundImage);
            this.stones.push(stone);
        }
        //生成星座数组
        for (var i = 0; i < this._zodiacNum; i++) {
            var zodiac = new Zodiac(this._backgroundImage, this._zodiacWidth, this._zodiacHeight, this._zodiacName, i % 12);
            zodiac.randomGenerate(this._backgroundImage);
            this.zodiacs.push(zodiac);
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
        this.zodiacs.forEach(function (element) {
            element.drawItem();
        });
    };
    //刷新各障碍物的动画或图像
    BarriersManagement.prototype.updateBarriers = function () {
        this.blackHoles.forEach(function (element) {
            element.update();
        });
        this.stones.forEach(function (element) {
            element.update();
        });
        this.zodiacs.forEach(function (element) {
            element.update();
        });
    };
    return BarriersManagement;
}());
//# sourceMappingURL=BarriersManagement.js.map