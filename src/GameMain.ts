namespace Game{
    export const MainHeight:number = 600;
    export const MainWidth: number = 800;
    export const serverResURL = "http://jjg15.iterator-traits.com/res";//服务器资源路径
    export const startBackGroundImage = "ui/background/StartBackGround.png";//开始背景图
    export const backgroundImage = "ui/background/BackGround .jpg";//游戏背景图
    export const endBackGroundImage = "ui/background/EndBackGround.jpg";//结束背景图
    export const helpBackGroundImage="ui/background/HelpBackGround.jpg";//帮助界面图
    export const contentImage="ui/background/ContentImage.png";//帮助界面内容图
    export const zodiacLightImage:string= "ui/else/light.png";
    export const zodiacYellowImage: string= "ui/else/yellow.png";
    export const stoneImage: string = "ui/else/stone.png";
    export const fallingStoneImage: string = "ui/else/fallingStone.png";
}
// 程序入口
class GameMain{
    private static viewStack:Laya.ViewStack;//界面管理器

    private static gameView: GameView;//游戏界面
    private static startView:StartView;//开始界面
    private static endView:EndView;//结束界面
    private static helpView:HelpView;//帮助界面

    constructor()
    {
        Laya.MiniAdpter.init();
        Laya.init(Game.MainWidth,Game.MainHeight);
            
        //设置屏幕自动平铺和旋转
        Laya.stage.scaleMode = Laya.Stage.SCALE_EXACTFIT;
        Laya.stage.screenMode = Laya.Stage.SCREEN_HORIZONTAL;

        //初始化界面管理器(开始界面为0，游戏界面为1，结束界面为2)
        GameMain.viewStack=new Laya.ViewStack();
        GameMain.viewStack.initItems();
        Laya.stage.addChild(GameMain.viewStack);
        
        //加载资源
        let resArray: Array<any> = [
            {url: Game.backgroundImage, type:Laya.Loader.IMAGE},
            {url: Game.startBackGroundImage, type:Laya.Loader.IMAGE},
            {url: Game.endBackGroundImage, type:Laya.Loader.IMAGE},
            {url: Game.helpBackGroundImage, type:Laya.Loader.IMAGE},
            {url: Game.contentImage, type:Laya.Loader.IMAGE},                             

            {url: "res/atlas/ui/button.atlas", type:Laya.Loader.ATLAS},
            {url:"res/atlas/ui/button.png", type:Laya.Loader.IMAGE},

            {url: "res/atlas/ui/blackhole.atlas", type:Laya.Loader.ATLAS},
            {url:"res/atlas/ui/blackhole.png", type:Laya.Loader.IMAGE},
            
            {url: "res/atlas/ui/star.atlas", type:Laya.Loader.ATLAS},
            {url: "res/atlas/ui/star.png", type:Laya.Loader.IMAGE},
            
            {url:"res/atlas/ui/else.atlas", type:Laya.Loader.ATLAS},
            {url: "res/atlas/ui/else.png", type:Laya.Loader.IMAGE},

            {url:Game.StoneCollisionSound, type:Laya.Loader.SOUND},
            {url:Game.NewLevelSound, type:Laya.Loader.SOUND},
            {url:Game.RewardSound, type:Laya.Loader.SOUND},
            {url:Game.BlackHoleCollisionSound, type:Laya.Loader.SOUND}            
        ];
        Laya.loader.load(resArray, Laya.Handler.create(this, this.onLoaded));//当资源加载完毕时，调用onLoaded
    }

    //加载资源完毕后，创建界面
    onLoaded():void
    {
        GameMain.gameView = new GameView();
        GameMain.startView=new StartView();
        GameMain.endView=new EndView();
        GameMain.helpView=new HelpView();

        GameMain.viewStack.addItem(GameMain.startView);
        GameMain.viewStack.addItem(GameMain.gameView);
        GameMain.viewStack.addItem(GameMain.endView);

        this.createEvents();
    }

    //创建各种响应事件
    createEvents():void
    {
        //开始界面游戏说明查看按钮
        GameMain.startView.helpButton.on(Laya.Event.MOUSE_MOVE,this,function(){
            GameMain.startView.helpButton.scale(1.1,1.1);
        });
        GameMain.startView.helpButton.on(Laya.Event.MOUSE_OUT,this,function(){
            GameMain.startView.helpButton.scale(1,1);
        });
        GameMain.startView.helpButton.on(Laya.Event.CLICK,this,this.toHelpView);

        //开始界面关卡选择
        GameMain.startView.levelSelectedBox.selectHandler=new Laya.Handler(this,this.selectLevel,[GameMain.startView.levelSelectedBox]); 

        //帮助界面中返回开始界面按钮
        GameMain.helpView.returnButton.on(Laya.Event.CLICK,this,this.outHelpView); 

        //游戏界面结束按钮
        GameMain.gameView.endButton.on(Laya.Event.CLICK,this,this.toEndView);

        //结束界面回到开始界面的按钮
        GameMain.endView.startButton.on(Laya.Event.MOUSE_MOVE,this,function(){
            GameMain.endView.startButton.scale(1.1,1.1);
        });
        GameMain.endView.startButton.on(Laya.Event.MOUSE_OUT,this,function(){
            GameMain.endView.startButton.scale(1,1);
        });
        GameMain.endView.startButton.on(Laya.Event.CLICK,this,this.toStartView);              
    }

    //到游戏界面
    selectLevel(cb:Laya.ComboBox):void
    {
        let level=cb.selectedIndex*cb.selectedIndex+1;
        GameMain.gameView.init();
        GameMain.gameView.enterLevel(level);
        GameMain.viewStack.selectedIndex=1;
        GameMain.gameView.gameStart();//开始游戏
    }

    //到结束界面
    toEndView():void
    {
        Laya.timer.clear(GameMain.gameView, GameMain.gameView.onLoop);
        GameMain.viewStack.selectedIndex=2;
        GameMain.endView.init();
        GameMain.endView.showEnd();
    }

    //到开始界面
    toStartView():void
    {
        GameMain.startView.init();
        GameMain.viewStack.selectedIndex=0;
    }

    //到帮助界面
    toHelpView():void
    {
        Laya.stage.addChild(GameMain.helpView); 
        GameMain.helpView.init();  
        GameMain.helpView.popup();
    }

    //离开帮助界面
    outHelpView():void
    {
        GameMain.helpView.close();
        Laya.stage.removeChild(GameMain.helpView);   
        this.toStartView();
    }   

}
new GameMain();