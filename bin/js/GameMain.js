var Game;
(function (Game) {
    Game.MainHeight = 600;
    Game.MainWidth = 800;
    Game.serverResURL = "http://jjg15.iterator-traits.com/res"; //服务器资源路径
    Game.startBackGroundImage = "ui/background/StartBackGround.png"; //开始背景图
    Game.backgroundImage = "ui/background/BackGround .jpg"; //游戏背景图
    Game.endBackGroundImage = "ui/background/EndBackGround.jpg"; //结束背景图
    Game.helpBackGroundImage = "ui/background/HelpBackGround.png"; //帮助界面图
    Game.contentImage = "ui/background/ContentImage.png"; //帮助界面内容图
    Game.zodiacLightImage = "ui/else/light.png";
    Game.zodiacYellowImage = "ui/else/yellow.png";
    Game.stoneImage = "ui/else/stone.png";
    Game.fallingStoneImage = "ui/else/fallingStone.png";
})(Game || (Game = {}));
// 程序入口
var GameMain = /** @class */ (function () {
    function GameMain() {
        Laya.MiniAdpter.init();
        Laya.init(Game.MainWidth, Game.MainHeight);
        //设置屏幕自动平铺和旋转
        Laya.stage.scaleMode = Laya.Stage.SCALE_EXACTFIT;
        Laya.stage.screenMode = Laya.Stage.SCREEN_HORIZONTAL;
        //初始化界面管理器(开始界面为0，游戏界面为1，结束界面为2)
        GameMain.viewStack = new Laya.ViewStack();
        GameMain.viewStack.initItems();
        Laya.stage.addChild(GameMain.viewStack);
        //加载资源
        var resArray = [
            { url: Game.backgroundImage, type: Laya.Loader.IMAGE },
            { url: Game.startBackGroundImage, type: Laya.Loader.IMAGE },
            { url: Game.endBackGroundImage, type: Laya.Loader.IMAGE },
            { url: Game.helpBackGroundImage, type: Laya.Loader.IMAGE },
            { url: Game.contentImage, type: Laya.Loader.IMAGE },
            { url: "res/atlas/ui/button.atlas", type: Laya.Loader.ATLAS },
            { url: "res/atlas/ui/button.png", type: Laya.Loader.IMAGE },
            { url: "res/atlas/ui/blackhole.atlas", type: Laya.Loader.ATLAS },
            { url: "res/atlas/ui/blackhole.png", type: Laya.Loader.IMAGE },
            { url: "res/atlas/ui/star.atlas", type: Laya.Loader.ATLAS },
            { url: "res/atlas/ui/star.png", type: Laya.Loader.IMAGE },
            { url: "res/atlas/ui/else.atlas", type: Laya.Loader.ATLAS },
            { url: "res/atlas/ui/else.png", type: Laya.Loader.IMAGE },
            { url: Game.StoneCollisionSound, type: Laya.Loader.SOUND },
            { url: Game.NewLevelSound, type: Laya.Loader.SOUND },
            { url: Game.RewardSound, type: Laya.Loader.SOUND },
            { url: Game.BlackHoleCollisionSound, type: Laya.Loader.SOUND }
        ];
        Laya.loader.load(resArray, Laya.Handler.create(this, this.onLoaded)); //当资源加载完毕时，调用onLoaded
    }
    //加载资源完毕后，创建界面
    GameMain.prototype.onLoaded = function () {
        GameMain.gameView = new GameView();
        GameMain.startView = new StartView();
        GameMain.endView = new EndView();
        GameMain.helpView = new HelpView();
        GameMain.viewStack.addItem(GameMain.startView);
        GameMain.viewStack.addItem(GameMain.gameView);
        GameMain.viewStack.addItem(GameMain.endView);
        this.createEvents();
    };
    //创建各种响应事件
    GameMain.prototype.createEvents = function () {
        //开始界面游戏说明查看按钮
        GameMain.startView.helpButton.on(Laya.Event.MOUSE_MOVE, this, function () {
            GameMain.startView.helpButton.scale(1.1, 1.1);
        });
        GameMain.startView.helpButton.on(Laya.Event.MOUSE_OUT, this, function () {
            GameMain.startView.helpButton.scale(1, 1);
        });
        GameMain.startView.helpButton.on(Laya.Event.CLICK, this, this.toHelpView);
        //开始界面关卡选择
        GameMain.startView.levelSelectedBox.selectHandler = new Laya.Handler(this, this.selectLevel, [GameMain.startView.levelSelectedBox]);
        //帮助界面中返回开始界面按钮
        GameMain.helpView.returnButton.on(Laya.Event.CLICK, this, this.outHelpView);
        //游戏界面结束按钮
        GameMain.gameView.endButton.on(Laya.Event.CLICK, this, this.toEndView);
        //结束界面回到开始界面的按钮
        GameMain.endView.startButton.on(Laya.Event.MOUSE_MOVE, this, function () {
            GameMain.endView.startButton.scale(1.1, 1.1);
        });
        GameMain.endView.startButton.on(Laya.Event.MOUSE_OUT, this, function () {
            GameMain.endView.startButton.scale(1, 1);
        });
        GameMain.endView.startButton.on(Laya.Event.CLICK, this, this.toStartView);
    };
    //到游戏界面
    GameMain.prototype.selectLevel = function (cb) {
        if (cb.selectedLabel === null) {
            return;
        }
        var level = cb.selectedIndex * cb.selectedIndex + 1;
        GameMain.viewStack.selectedIndex = 1;
        GameMain.gameView.init();
        GameMain.gameView.enterLevel(level);
        GameMain.gameView.gameStart(); //开始游戏
    };
    //到结束界面
    GameMain.prototype.toEndView = function () {
        //Laya.timer.clear(GameMain.gameView, GameMain.gameView.onLoop);
        GameMain.gameView.gameEnd();
        GameMain.viewStack.selectedIndex = 2;
        GameMain.endView.init();
        GameMain.endView.showEnd();
    };
    //到开始界面
    GameMain.prototype.toStartView = function () {
        GameMain.startView.init();
        GameMain.viewStack.selectedIndex = 0;
    };
    //到帮助界面
    GameMain.prototype.toHelpView = function () {
        Laya.stage.addChild(GameMain.helpView);
        GameMain.helpView.init();
        GameMain.helpView.popup();
    };
    //离开帮助界面
    GameMain.prototype.outHelpView = function () {
        GameMain.helpView.close();
        Laya.stage.removeChild(GameMain.helpView);
        this.toStartView();
    };
    return GameMain;
}());
new GameMain();
//# sourceMappingURL=GameMain.js.map