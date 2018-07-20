//游戏的帮助界面
class HelpView extends ui.HelpViewUI{

    private prevY:number=0;
    //构造函数
    constructor()
    {
        super();
        this.contentImage.scrollRect=new Laya.Rectangle(0,0,600,330);   
        this.init();
    }

    public init():void
    {
        this.contentImage.y=50;
        this.contentImage.scrollRect.y=0;
        //设置拖动查看事件
        this.contentImage.on(Laya.Event.MOUSE_DOWN,this,this.startScrollText);
    }

    //开始拖动图像
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
        this.contentImage.scrollRect.y+=this.prevY-nowY;
        //设置拖动范围
        this.contentImage.scrollRect.y=Math.max(-50,this.contentImage.scrollRect.y);
        this.contentImage.scrollRect.y=Math.min(this.contentImage.height-200,this.contentImage.scrollRect.y);
        this.prevY=nowY;
    }

}
