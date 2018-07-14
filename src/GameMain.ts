// 程序入口
class GameMain{
    private static viewStack:Laya.ViewStack;//界面管理器

    private static gameView: GameView;//游戏界面
    private static startView:ui.StartViewUI;//开始界面

    constructor()
    {
        Laya.MiniAdpter.init();
        Laya.init(800,600);
        
        //设置屏幕自动平铺和旋转
        Laya.stage.scaleMode = Laya.Stage.SCALE_EXACTFIT;
        Laya.stage.screenMode = Laya.Stage.SCREEN_HORIZONTAL;

        //初始化界面管理器(开始界面为0，游戏界面为1，结束界面为2)
        GameMain.viewStack=new Laya.ViewStack();
        GameMain.viewStack.initItems();
        Laya.stage.addChild(GameMain.viewStack);
        
        //加载资源
        let resArray: Array<any> = [
            {url: "ui/background/BackGround.jpg", type:Laya.Loader.IMAGE},
            {url: "ui/background/StartBackGround.png", type:Laya.Loader.IMAGE},           
            {url: "res/atlas/ui/blackhole.atlas", type:Laya.Loader.ATLAS},
            {url: "res/atlas/ui/star.atlas", type:Laya.Loader.ATLAS},
            {url:"res/atlas/ui/arrow.atlas", type:Laya.Loader.ATLAS},
            {url:"res/atlas/ui/stone.atlas", type:Laya.Loader.ATLAS},
            {url:"res/atlas/ui/score.atlas", type:Laya.Loader.ATLAS},
            {url:"res/atlas/ui/button.atlas", type:Laya.Loader.ATLAS}            
        ];
        Laya.loader.load(resArray, Laya.Handler.create(this, this.onLoaded));//当资源加载完毕时，调用onLoaded
    }

    //加载资源完毕后，创建界面
    onLoaded():void
    {
        GameMain.gameView = new GameView();
        GameMain.startView=new ui.StartViewUI();

        GameMain.viewStack.addItem(GameMain.startView);
        GameMain.viewStack.addItem(GameMain.gameView);

        this.createEvents();
    }

    //创建各种响应事件
    createEvents():void
    {
        //开始界面的开始按钮
        GameMain.startView.startButtonView.on(Laya.Event.MOUSE_MOVE,this,function(){
            GameMain.startView.startButtonView.scale(1.1,1.1);
        });
        GameMain.startView.startButtonView.on(Laya.Event.MOUSE_OUT,this,function(){
            GameMain.startView.startButtonView.scale(1,1);
        });
        GameMain.startView.startButtonView.on(Laya.Event.CLICK,this,this.toGameView);
        //开始界面的排行榜按钮
        GameMain.startView.rankButtonView.on(Laya.Event.MOUSE_MOVE,this,function(){
            GameMain.startView.rankButtonView.scale(1.1,1.1);
        });
        GameMain.startView.rankButtonView.on(Laya.Event.MOUSE_OUT,this,function(){
            GameMain.startView.rankButtonView.scale(1,1);
        });
        //开始界面的存储按钮
        GameMain.startView.saveButtonView.on(Laya.Event.MOUSE_MOVE,this,function(){
            GameMain.startView.saveButtonView.scale(1.1,1.1);
        });
        GameMain.startView.saveButtonView.on(Laya.Event.MOUSE_OUT,this,function(){
            GameMain.startView.saveButtonView.scale(1,1);
        });        
    }

    //到游戏界面
    toGameView():void
    {
        GameMain.viewStack.selectedIndex=1;
        GameMain.gameView.gameStart();//开始游戏
    }

}
new GameMain();