//游戏的一些参数
namespace Game{
    export const interval:number = 100;//刷新时间(单位：毫秒)
    export const gravity:number = 10;//重力加速度
    export const liftCoefficient:number = 800;//升力系数,升力=liftCoefficient/(球心距离^2)
    export const dragCoefficient:number = 0.0001;//阻力系数，阻力=-dragCoefficient*速度
    export const attractionCoefficient:number=10;//球之间的引力系数


}

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
        this._bigBall = new Ball(25, 343, 265, this.bigBallView);
        this._smallBall = new Ball(15, 200, 200, this.smallBallView);

        //控制方向的箭头区域的初始化
        this._arrow = new Arrow(
            this.arrowView.getChildByName("left") as Laya.Image, 
            this.arrowView.getChildByName("right") as Laya.Image, 
            Laya.Handler.create(this, this.onTouchStart, null, false),
            Laya.Handler.create(this, this.onTouchEnd, null, false)
        );
        //障碍物初始化与绘制
        this._barrier=new Barrier(this.backgroundView);
        this._barrier.drawBarriers();

        
    }

    //游戏开始
    gameStart():void{
        console.log("游戏开始");
        Laya.timer.loop(Game.interval, this, this.onLoop);
        
        //给球施加重力
        this._bigBall.setForce(0, Game.gravity, "gravity");
        this._smallBall.setForce(0, Game.gravity, "gravity");
    }

    //游戏结束
    gameEnd():void{
        console.log("游戏结束");
        Laya.timer.clear(this, this.onLoop);
    }

    //需要每隔单位时间进行一次调用的函数请写入以下函数体
    onLoop():void{
        this.detectCollisions();//碰撞检测与处理
        this.updateForces();//更新大小球的受力
        this._bigBall.update();//更新大球的位置和速度
        this._smallBall.update();//更新小球的位置和速度
        this.updateBackground();//根据当前球的位置更新背景
    }

    //根据当前球的位置更新背景
    updateBackground():void{

    }

    //碰撞检测与处理
    detectCollisions():void{
        //分析当前球和其他物体的位置关系，并作出相应的处理
        //碰撞检测方式：获取Laya.Image的getBounds(),然后调用intersect方法判断是否发生碰撞
    }   

    //更新球的受力，主要是两个球之间的作用力
    updateForces():void{
        let distance:number = Math.sqrt(
            Math.pow((this._bigBall.x - this._smallBall.x), 2)+
            Math.pow((this._bigBall.y - this._smallBall.y), 2)
        );//球的距离平方
        let minDistance:number = this._bigBall.radius+this._smallBall.radius;
        let effectiveDistance = Math.max(distance, minDistance);

        //首先处理球靠近产生的升力
        let lift:number = Game.liftCoefficient / (effectiveDistance);
        this._bigBall.setForce(0, -lift, "lift");
        this._smallBall.setForce(0, -lift, "lift");

        //处理由于球运动产生的阻力
        this._bigBall.setForce(
            -Math.pow(this._bigBall.vx,3) * Game.dragCoefficient, 
            -Math.pow(this._bigBall.vy,3) * Game.dragCoefficient, 
            "drag");
        this._smallBall.setForce(
            -Math.pow(this._smallBall.vx,3) * Game.dragCoefficient, 
            -Math.pow(this._smallBall.vy,3) * Game.dragCoefficient, 
            "drag");

        //处理两个小球之间的引力
        let attraction:number = Game.attractionCoefficient / (Math.pow(effectiveDistance, 3));
        if(distance < minDistance){//当距离过近时
            console.log("distance="+distance);
            console.log("radius="+minDistance);
            attraction = - attraction;//引力变成了斥力
        }
        this._bigBall.setForce(
            (this._smallBall.x-this._bigBall.x)*attraction,
            (this._smallBall.y-this._bigBall.y)*attraction,
            "attraction"
        )
        this._smallBall.setForce(
            (this._bigBall.x-this._smallBall.x)*attraction,
            (this._bigBall.y-this._smallBall.y)*attraction,
            "attraction"
        )
    }

    //当触摸开始时调用
    onTouchStart(data:{type:string}):void{
        console.log("触摸开始，触摸键:"+data.type);
        //增加大球受力
        let force = Math.random() * 10 + 10;//每单位时间的触摸可以随机生成[1,2]范围内的力
        if(data.type === "left"){
            force = -force;
        }
        this._bigBall.setForce(force, 0, "humanControl");
    }

    onTouchEnd(data:{type:string}):void{
        console.log("触摸结束，触摸键:"+data.type);
        //移除大球受力
        this._bigBall.removeForce("humanControl");
    }
    
}
