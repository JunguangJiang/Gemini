//与障碍物相关的参数
var BarrierParameter;
(function (BarrierParameter) {
    BarrierParameter.blackHolesNum = 5; //黑洞个数
    BarrierParameter.blackHoleWidth = 100; //黑洞宽度
    BarrierParameter.blackHoleHeight = 100; //黑洞高度
    BarrierParameter.blackHoleStr = "blackhole"; //黑洞对应标识符
    BarrierParameter.stonesNum = 10; //岩石个数
    BarrierParameter.stoneWidth = 50; //岩石宽度
    BarrierParameter.stoneHeight = 100; //岩石高度
    BarrierParameter.fallingStoneRate = 0.1; //坠落的陨石的比例
    BarrierParameter.stoneStr = "stone"; //岩石对应标识符
    BarrierParameter.zodiacNum = 12; //星座个数
    BarrierParameter.zodiacWidth = 75; //星座宽度
    BarrierParameter.zodiacHeight = 75; //星座高度
    BarrierParameter.zodiacStr = "zodiac"; //星座对应标识符    
})(BarrierParameter || (BarrierParameter = {}));
var BarriersManagement = /** @class */ (function () {
    function BarriersManagement(backgroundImage) {
        this._backgroundImage = backgroundImage;
        this.blackHoles = [];
        this.stones = [];
        this.zodiacs = [];
    }
    //生成障碍物
    BarriersManagement.prototype.produce = function (barrierType, zodiacNum) {
        if (zodiacNum === void 0) { zodiacNum = 0; }
        var item;
        switch (barrierType) {
            case BarrierParameter.blackHoleStr: //获取黑洞对象
                item = Laya.Pool.getItemByCreateFun(BarrierParameter.blackHoleStr, function () {
                    var blackhole = new BlackHole(this._backgroundImage, BarrierParameter.blackHoleWidth, BarrierParameter.blackHoleHeight, BarrierParameter.blackHoleStr);
                    console.log(1);
                    return blackhole;
                });
                this.blackHoles.push(item);
                break;
            case BarrierParameter.stoneStr: //获取岩石对象
                item = Laya.Pool.getItemByCreateFun(BarrierParameter.stoneStr, function () {
                    var stone = new Stone(this._backgroundImage, BarrierParameter.stoneWidth, BarrierParameter.stoneHeight, BarrierParameter.stoneStr, Math.random() < BarrierParameter.fallingStoneRate);
                    console.log(2);
                    return stone;
                });
                this.stones.push(item);
                break;
            case BarrierParameter.zodiacStr: //获取星座对象
                item = Laya.Pool.getItemByCreateFun(BarrierParameter.zodiacStr, function () {
                    var zodiac = new Zodiac(this._backgroundImage, BarrierParameter.zodiacWidth, BarrierParameter.zodiacHeight, BarrierParameter.zodiacStr, zodiacNum);
                    console.log(3);
                    return zodiac;
                });
                this.zodiacs.push(item);
                break;
            default:
                item = null;
                break;
        }
        return item;
    };
    //回收障碍物
    BarriersManagement.prototype.remove = function (barrier) {
        this._backgroundImage.removeChild(barrier.item); //从画布上移除应写在此处比较合适
        Laya.Pool.recover(barrier.name, barrier);
        switch (barrier.name) {
            case BarrierParameter.blackHoleStr: //回收黑洞对象
                this.blackHoles.splice(this.blackHoles.indexOf(barrier), 1);
                break;
            case BarrierParameter.stoneStr: //回收岩石对象   
                this.stones.splice(this.stones.indexOf(barrier), 1);
                break;
            case BarrierParameter.zodiacStr: //回收星座对象
                this.zodiacs.splice(this.zodiacs.indexOf(barrier), 1);
                break;
            default:
                break;
        }
    };
    //回收背景上所有障碍物
    BarriersManagement.prototype.removeFromBackground = function (backgroundImage) {
        while (this.blackHoles.length > 0) {
            console.log(this.blackHoles[0]);
            this.remove(this.blackHoles[0]);
        }
        while (this.stones.length > 0) {
            console.log(this.stones[0]);
            this.remove(this.stones[0]);
        }
        while (this.zodiacs.length > 0) {
            console.log(this.zodiacs[0]);
            this.remove(this.zodiacs[0]);
        }
    };
    //更新各障碍物在屏幕上的位置并绘制
    BarriersManagement.prototype.update = function () {
        //回收所有元素
        this.removeFromBackground(this._backgroundImage);
        //更新黑洞
        for (var i = 0; i < BarrierParameter.blackHolesNum; i++) {
            var blackhole = this.produce(BarrierParameter.blackHoleStr);
            blackhole.randomGenerate(this._backgroundImage);
            blackhole.init();
            blackhole.drawItem();
        }
        //更新岩石
        for (var i = 0; i < BarrierParameter.stonesNum; i++) {
            var stone = this.produce(BarrierParameter.stoneStr);
            stone.randomGenerate(this._backgroundImage);
            stone.init();
            stone.drawItem();
        }
        //更新星座
        for (var i = 0; i < BarrierParameter.zodiacNum; i++) {
            var zodiac = this.produce(BarrierParameter.zodiacStr, i % 12);
            zodiac.randomGenerate(this._backgroundImage);
            zodiac.init();
            zodiac.drawItem();
        }
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
    //清除所有的障碍物
    BarriersManagement.prototype.clear = function () {
        Laya.Pool.clearBySign(BarrierParameter.blackHoleStr); //清除黑洞对象
        Laya.Pool.clearBySign(BarrierParameter.stoneStr); //清除岩石对象
        Laya.Pool.clearBySign(BarrierParameter.zodiacStr); //清除星座对象
    };
    return BarriersManagement;
}());
//# sourceMappingURL=BarriersManagement.js.map