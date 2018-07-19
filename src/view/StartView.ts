//游戏的开始界面
class StartView extends ui.StartViewUI{
    //构造函数
    constructor()
    {
        super();
        
        this.init();
    }

    //初始化开始界面
    public init():void
    {
        this.buttonsManagement.visible=true;
        this.buttonsManagement.mouseEnabled=true;
        this.levelSelectedBox.visible=false;
        this.levelSelectedBox.mouseEnabled=false;
        this.levelSelectedBox.selectedIndex=-1;

        this.createEvents();
    }

    private createEvents():void
    {
        //开始界面单人的开始按钮
        this.onePlayerButton.on(Laya.Event.MOUSE_MOVE,this,function(){
            this.onePlayerButton.scale(1.1,1.1);
        });
        this.onePlayerButton.on(Laya.Event.MOUSE_OUT,this,function(){
            this.onePlayerButton.scale(1,1);
        });
        this.onePlayerButton.on(Laya.Event.CLICK,this,function(){
            this.levelSelectedBox.visible=true;
            this.levelSelectedBox.mouseEnabled=true;
            this.buttonsManagement.visible=false;
            this.buttonsManagement.mouseEnabled=false;
            Game.playerNum=1;                   
        });

        //开始界面双人的开始按钮
        this.twoPlayersButton.on(Laya.Event.MOUSE_MOVE,this,function(){
            this.twoPlayersButton.scale(1.1,1.1);
        });
        this.twoPlayersButton.on(Laya.Event.MOUSE_OUT,this,function(){
            this.twoPlayersButton.scale(1,1);
        });
        this.twoPlayersButton.on(Laya.Event.CLICK,this,function(){
            this.levelSelectedBox.visible=true;
            this.levelSelectedBox.mouseEnabled=true;
            this.buttonsManagement.visible=false;
            this.buttonsManagement.mouseEnabled=false;
            Game.playerNum=2;             
        });
    }

}
