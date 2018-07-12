//游戏的主视图
class GameView extends ui.GameViewUI{
    //管理黑洞、障碍物、小球等对象
    private _smallBall: Ball;//小球
    private _bigBall: Ball;//大球
    private _arrow: Arrow;//控制方向的箭头区域
    private _barrier:Barrier;//障碍物
    
    constructor(){
        super();

        //球的初始化
        this._smallBall = new Ball(50, 343, 265, this.smallBallView);
        //控制方向的箭头区域的初始化
        this._arrow = new Arrow(
            this.arrowView.getChildByName("left") as Laya.Image, 
            this.arrowView.getChildByName("right") as Laya.Image, 
            Laya.Handler.create(this, this.onTouch, null, false)
        );
        //障碍物初始化与绘制
        this._barrier=new Barrier(this.backgroundView);
        this._barrier.drawBarriers();


    }
    
    //当触摸结束时调用
    onTouch(lastingTime: number):void{
        console.log("触摸结束,持续时间为"+lastingTime);
    }
    
    //碰撞检测与处理
    collisionDetect():void{
        //分析当前球和其他物体的位置关系，并作出相应的处理
        //碰撞检测方式：获取Laya.Image的getBounds(),然后调用intersect方法判断是否发生碰撞
    }
}
