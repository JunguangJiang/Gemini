// 程序入口
var GameMain = /** @class */ (function () {
    function GameMain() {
        Laya.MiniAdpter.init();
        Laya.init(800, 600);
        //设置屏幕自动平铺和旋转
        Laya.stage.scaleMode = Laya.Stage.SCALE_EXACTFIT;
        Laya.stage.screenMode = Laya.Stage.SCREEN_HORIZONTAL;
        //加载资源
        var resArray = [
            { url: "ui/background/BackGround.jpg", type: Laya.Loader.IMAGE },
            { url: "res/atlas/ui/blackhole.atlas", type: Laya.Loader.ATLAS },
            { url: "res/atlas/ui/star.atlas", type: Laya.Loader.ATLAS },
            { url: "res/atlas/ui/arrow.atlas", type: Laya.Loader.ATLAS },
            { url: "res/atlas/ui/stone.atlas", type: Laya.Loader.ATLAS },
            { url: "res/atlas/ui/score.atlas", type: Laya.Loader.ATLAS }
        ];
        Laya.loader.load(resArray, Laya.Handler.create(this, this.onLoaded)); //当资源加载完毕时，调用onLoaded
    }
    //加载资源完毕后，游戏的开始界面
    GameMain.prototype.onLoaded = function () {
        //仅用于开发阶段
        GameMain.gameView = new GameView(); //将游戏主界面作为游戏的开始界面
        Laya.stage.addChild(GameMain.gameView);
        GameMain.gameView.gameStart(); //开始游戏
        //仅用于开发阶段
    };
    return GameMain;
}());
new GameMain();
//# sourceMappingURL=GameMain.js.map