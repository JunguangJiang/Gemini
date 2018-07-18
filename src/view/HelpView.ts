//游戏的帮助界面
class HelpView extends ui.HelpViewUI{

    private prevY:number=0;
    //构造函数
    constructor()
    {
        super();
       
        this.init();
    }

    public init():void
    {
        this.contentImage.y=30;
        this.contentImageMask.y=0;
        //设置拖动查看事件
        this.contentImage.on(Laya.Event.MOUSE_DOWN,this,this.startScrollText);
    }

    //开始滚动图像
    private startScrollText(e:Event):void
    {
        this.prevY=this.contentImage.mouseY;
        this.on(Laya.Event.MOUSE_MOVE,this,this.scrollText);
        this.on(Laya.Event.MOUSE_UP,this,this.finishScrollText);

    }

    //停止拖动图像
    private finishScrollText(e:Event):void
    {
        this.off(Laya.Event.MOUSE_MOVE,this,this.scrollText);
        this.off(Laya.Event.MOUSE_UP,this,this.finishScrollText);
    }

    //拖动图像
    private scrollText(e:Event):void
    {
        let nowY:number=this.contentImage.mouseY;
        this.contentImage.y+=nowY-this.prevY;
        this.contentImageMask.y+=this.prevY-nowY;
        this.prevY=nowY;
    }

}
