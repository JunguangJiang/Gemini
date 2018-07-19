//游戏提示栏
class Tips{
    constructor(public text:Laya.Text){

    }

    //设置文本内容
    public setText(tips:string):void{
        this.text.text = tips;
        Laya.timer.once(5000, this, this.unsetText,[], false);
    }
    
    //清楚文本内容
    private unsetText():void{
        this.text.text = "";
    }
}