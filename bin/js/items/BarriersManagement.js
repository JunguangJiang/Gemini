/*class BarriersManagement{

    public blackHoles:BlackHole[];//存黑洞的数组
    public _blackHolesNum:number;//黑洞个数
    public _blackHoleWidth:number;//黑洞宽度
    public _blackHoleHeight:number;//黑洞高度
    public _blackHoleName:string;//黑洞对象的名称，默认为blackhole

    public stones:Stone[];//存陨石的数组
    public _stonesNum:number;//陨石个数
    public _stoneWidth:number;//陨石宽度
    public _stoneHeight:number;//陨石高度
    public _stoneName:string;//陨石类的名称，默认为stone
    public fallingStoneRate: number;//坠落的陨石的比例

    public zodiacs: Zodiac[];//存星座的数组
    public _zodiacNum: number;//星座个数
    public _zodiacWidth: number;//星座宽度
    public _zodiacHeight: number;//星座高度
    public _zodiacName:string;//星座名称，默认为zodiac
    
    private _backgroundImage:Laya.Image;//背景图

    constructor(backgroundImage:Laya.Image, fallingStoneRate:number=0,
    blackHolesNum:number=10,blackHoleWidth:number=100,blackHoleHeight:number=100,blackHoleName:string="blackhole",
    stonesNum:number=16,stoneWidth:number=50,stoneHeight:number=100,stoneName:string="stone",
    zodiacsNum: number=12, zodiacWidth:number=100, zodiacHeight:number=100, zodiacName:string="zodiac")
    {
        this._backgroundImage = backgroundImage;

        this.blackHoles=[];
        this._blackHolesNum=blackHolesNum;
        this._blackHoleWidth=blackHoleWidth;
        this._blackHoleHeight=blackHoleHeight;
        this._blackHoleName=blackHoleName;
        
        this.stones=[];
        this._stonesNum=stonesNum;
        this._stoneWidth=stoneWidth;
        this._stoneHeight=stoneHeight;
        this._stoneName=stoneName;

        this.zodiacs = [];
        this._zodiacNum = zodiacsNum;
        this._zodiacWidth = zodiacWidth;
        this._zodiacHeight = zodiacHeight;
        this._zodiacName = zodiacName;

        this.fallingStoneRate = fallingStoneRate;
    }

    //清除所有的障碍物
    private clear(){
        // this.blackHoles.slice(0);
        this.blackHoles = [];
        while(this._backgroundImage.removeChildByName(this._blackHoleName));

        // this.stones.slice(0);
        this.stones = [];
        while(this._backgroundImage.removeChildByName(this._stoneName));

        // this.zodiacs.slice(0);
        this.zodiacs = [];
        while(this._backgroundImage.removeChildByName(this._zodiacName));
    }

    //重新生成屏幕上所有障碍物
    public regenerateBarrier():void
    {
        //初始化
        this.clear();

        //生成黑洞数组
        for(let i=0;i<this._blackHolesNum;i++)
        {
            const blackhole:BlackHole=new BlackHole(this._backgroundImage,this._blackHoleWidth,this._blackHoleHeight,this._blackHoleName);
            blackhole.randomGenerate(this._backgroundImage);
            this.blackHoles.push(blackhole);
        }

        //生成陨石数组
        for(let i=0;i<this._stonesNum;i++)
        {
            let isFalling:boolean = Math.random()<=this.fallingStoneRate;
            const stone:Stone=new Stone(this._backgroundImage,this._stoneWidth,this._stoneHeight,this._stoneName, isFalling);
            stone.randomGenerate(this._backgroundImage);
            this.stones.push(stone);
        }

        //生成星座数组
        for(let i=0; i<this._zodiacNum; i++){
            const zodiac: Zodiac=new Zodiac(this._backgroundImage, this._zodiacWidth, this._zodiacHeight, this._zodiacName, i%12);
            zodiac.randomGenerate(this._backgroundImage);
            this.zodiacs.push(zodiac);
        }
    }

    //绘制各障碍物的动画或图像
    public drawBarriers():void
    {
        this.blackHoles.forEach(element => {
            element.drawItem();
        });

        this.stones.forEach(element => {
            element.drawItem();
        });

        this.zodiacs.forEach(element =>{
            element.drawItem();
        });
    }

    //刷新各障碍物的动画或图像
    public updateBarriers():void
    {
        this.blackHoles.forEach(element => {
            element.update();
        });

        this.stones.forEach(element => {
            element.update();
        });

        this.zodiacs.forEach(element =>{
            element.update();
        });
    }
}*/
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
    BarrierParameter.fallingStoneStr = "fallingstone"; //陨石对应标识符
    BarrierParameter.zodiacNum = 12; //星座个数
    BarrierParameter.zodiacWidth = 100; //星座宽度
    BarrierParameter.zodiacHeight = 100; //星座高度
    BarrierParameter.zodiacStr = "zodiac"; //星座对应标识符    
})(BarrierParameter || (BarrierParameter = {}));
var BarriersManagement = /** @class */ (function () {
    function BarriersManagement(backgroundImage) {
        this._backgroundImage = backgroundImage;
        this.blackHoles = [];
        this.stones = [];
        this.fallingStones = [];
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
                    return blackhole;
                });
                this.blackHoles.push(item);
                break;
            case BarrierParameter.stoneStr: //获取岩石对象
                item = Laya.Pool.getItemByCreateFun(BarrierParameter.stoneStr, function () {
                    var stone = new Stone(this._backgroundImage, BarrierParameter.stoneWidth, BarrierParameter.stoneHeight, BarrierParameter.stoneStr, false);
                    return stone;
                });
                this.stones.push(item);
                break;
            case BarrierParameter.fallingStoneStr: //获取陨石对象
                item = Laya.Pool.getItemByCreateFun(BarrierParameter.fallingStoneStr, function () {
                    var fallingStone = new Stone(this._backgroundImage, BarrierParameter.stoneWidth, BarrierParameter.stoneHeight, BarrierParameter.fallingStoneStr, true);
                    return fallingStone;
                });
                this.fallingStones.push(item);
                break;
            case BarrierParameter.zodiacStr: //获取星座对象
                item = Laya.Pool.getItemByCreateFun(BarrierParameter.zodiacStr, function () {
                    var zodiac = new Zodiac(this._backgroundImage, BarrierParameter.zodiacWidth, BarrierParameter.zodiacHeight, BarrierParameter.zodiacStr, zodiacNum);
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
        Laya.Pool.recover(barrier.name, barrier);
        switch (barrier.name) {
            case BarrierParameter.blackHoleStr: //回收黑洞对象
                this.blackHoles.splice(this.blackHoles.indexOf(barrier), 1);
                break;
            case BarrierParameter.stoneStr: //回收岩石对象   
                this.stones.splice(this.stones.indexOf(barrier), 1);
                break;
            case BarrierParameter.fallingStoneStr: //回收陨石对象
                this.fallingStones.splice(this.fallingStones.indexOf(barrier), 1);
                break;
            case BarrierParameter.zodiacStr: //回收星座对象
                this.zodiacs.splice(this.fallingStones.indexOf(barrier), 1);
                break;
            default:
                break;
        }
    };
    //回收背景上所有障碍物
    BarriersManagement.prototype.removeFromBackground = function (backgroundImage) {
        for (var _i = 0, _a = this.blackHoles; _i < _a.length; _i++) {
            var blackhole = _a[_i];
            this.remove(blackhole);
            backgroundImage.removeChild(blackhole.item);
        }
        for (var _b = 0, _c = this.stones; _b < _c.length; _b++) {
            var stone = _c[_b];
            this.remove(stone);
            backgroundImage.removeChild(stone.item);
        }
        for (var _d = 0, _e = this.fallingStones; _d < _e.length; _d++) {
            var fallingStone = _e[_d];
            this.remove(fallingStone);
            backgroundImage.removeChild(fallingStone.item);
        }
        for (var _f = 0, _g = this.zodiacs; _f < _g.length; _f++) {
            var zodiac = _g[_f];
            this.remove(zodiac);
            backgroundImage.removeChild(zodiac.item);
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
            blackhole.drawItem();
        }
        //更新岩石
        for (var i = 0; i < BarrierParameter.stonesNum * (1 - BarrierParameter.fallingStoneRate); i++) {
            var stone = this.produce(BarrierParameter.stoneStr);
            stone.randomGenerate(this._backgroundImage);
            stone.drawItem();
        }
        //更新陨石
        for (var i = 0; i < BarrierParameter.stonesNum * BarrierParameter.fallingStoneRate; i++) {
            var fallingStone = this.produce(BarrierParameter.fallingStoneStr);
            fallingStone.randomGenerate(this._backgroundImage);
            fallingStone.drawItem();
        }
        //更新星座
        for (var i = 0; i < BarrierParameter.zodiacNum; i++) {
            var zodiac = this.produce(BarrierParameter.zodiacStr, i % 12);
            zodiac.randomGenerate(this._backgroundImage);
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
        this.fallingStones.forEach(function (element) {
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
        Laya.Pool.clearBySign(BarrierParameter.fallingStoneStr); //清除陨石对象
        Laya.Pool.clearBySign(BarrierParameter.zodiacStr); //清除星座对象
    };
    return BarriersManagement;
}());
//# sourceMappingURL=BarriersManagement.js.map