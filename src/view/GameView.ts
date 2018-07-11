//游戏的主视图
class GameView extends ui.GameViewUI{
    private _smallBall: Ball;//小球
    private _bigBall: Ball;//大球
    private _arrow: Arrow;//控制方向的箭头区域
    constructor(){
        super();
        this._smallBall = new Ball(50, 343, 265, this.smallBallView);

        this._arrow = new Arrow(
            this.arrowView.getChildByName("left") as Laya.Image, 
            this.arrowView.getChildByName("right") as Laya.Image, 
            Laya.Handler.create(this, this.onTouch)
        );

    }
    
    //当触摸结束时调用
    onTouch(lastingTime: number):void{
        console.log("触摸结束,持续时间为"+lastingTime);
    }
    
}
