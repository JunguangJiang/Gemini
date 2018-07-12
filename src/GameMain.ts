// 程序入口
class GameMain{
    public static gameView: GameView;
    constructor()
    {
        Laya.MiniAdpter.init();
        Laya.init(800,600);
        
        //设置屏幕自动平铺和旋转
        Laya.stage.scaleMode = Laya.Stage.SCALE_EXACTFIT;
        Laya.stage.screenMode = Laya.Stage.SCREEN_HORIZONTAL;    
        
        //加载资源
        let resArray: Array<any> = [
            {url: "ui/background/BackGround.jpg", type:Laya.Loader.IMAGE},
            {url: "res/atlas/ui/blackhole.atlas", type:Laya.Loader.ATLAS},
            {url: "res/atlas/ui/star.atlas", type:Laya.Loader.ATLAS},
            {url:"res/atlas/ui/arrow.atlas", type:Laya.Loader.ATLAS},
            {url:"res/atlas/ui/stone.atlas", type:Laya.Loader.ATLAS}
        ];
        Laya.loader.load(resArray, Laya.Handler.create(this, this.onLoaded));//当资源加载完毕时，调用onLoaded
    }

    //加载资源完毕后，游戏的开始界面
    onLoaded():void{
        GameMain.gameView = new GameView();//暂时将游戏主界面作为游戏的开始界面
        Laya.stage.addChild(GameMain.gameView);
    }
}
new GameMain();