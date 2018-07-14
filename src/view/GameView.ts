//游戏的一些参数
namespace Game{
    export const interval:number = 100;//刷新时间(单位：毫秒)
    export const gravity:number = 12;//重力加速度
    export const liftCoefficient:number = 600;//升力系数,升力=liftCoefficient/(球心距离)
    export const dragCoefficient:number = 0.001;//阻力系数，阻力=-dragCoefficient*速度^3
    export const attractionCoefficient:number=8000;//球之间的引力系数
    export const randomForce = 20;//随机力的幅度
    export const humanForce = 40;//人类施力的幅度
}

//游戏的主视图
class GameView extends ui.GameViewUI{
    //管理黑洞、障碍物、小球等对象
    private _smallBall: Ball;//小球
    private _bigBall: Ball;//大球
    private _arrow: Arrow;//控制方向的箭头区域
    private _barrier:Barrier;//障碍物
    private _backgroundView: Laya.Image;//背景视图
    private _scoreIndicator: ScoreIndicator;//计分器
    
    private _loopCount: number;//记录刷新（循环）总次数
    private _activityArea:{up:number, down:number};//游戏的最大活动区域

    private _musicManager: MusicManager;//音乐管理器

    constructor(){
        super();

        //游戏的活动区域
        this._activityArea = {up:this.height-this.backgroundView.height, down:0};

        //球的初始化
        this._bigBall = new Ball(25, 400, 2600,this.bigBallView);
        this._smallBall = new Ball(15, 200, 2600,this.smallBallView);

        //控制方向的箭头区域的初始化
        this._arrow = new Arrow(
            this.arrowView.getChildByName("left") as Laya.Image, 
            this.arrowView.getChildByName("right") as Laya.Image, 
            Laya.Handler.create(this, this.onTouchStart, null, false),
            Laya.Handler.create(this, this.onTouchEnd, null, false)
        );
        this._loopCount = 0;

        //障碍物初始化与绘制
        this._barrier=new Barrier(this.backgroundView);
        this._barrier.drawBarriers();

        //计分器的初始化
        this._scoreIndicator = new ScoreIndicator(this.scoreView, 3, this.runningView.height, 0);

        //音乐播放器
        this._musicManager = new MusicManager();
        this._musicManager.onPlayMusic(1);//播放等级1的音乐
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
        this.detectCollisions(this._bigBall);//大球碰撞检测与处理
        this.updateForces();//更新大小球的受力
        this.detectBorder(this._bigBall);//检测与边缘的相对位置
        this.detectBorder(this._smallBall);
        this._bigBall.update();//更新大球的位置和速度
        this._smallBall.update();//更新小球的位置和速度
        this.updateBackground();//根据当前球的位置更新背景
        this._loopCount++;
        this._scoreIndicator.updateHeight(-(this._bigBall.y-this.runningView.height+this._bigBall.radius));
        // this._bigBall.debug("大球");
    }

    //根据当前球的位置更新背景
    updateBackground():void{
        let y:number = -this._bigBall.y + this.height/2;
        if(y > this._activityArea.down) y = this._activityArea.down;
        else if(y<this._activityArea.up) y = this._activityArea.up;
        this.runningView.y = y;
    }

    //碰撞检测与处理
    detectCollisions(ball:Ball):void{
        //分析当前球和其他物体的位置关系，并作出相应的处理

        let ballRec=new Laya.Rectangle(ball.x-ball.radius,ball.y-ball.radius,ball.radius*2,ball.radius*2);
   
        //判断球是否进入黑洞
        let inBlackhole:boolean=false;
        this._barrier.blackHoles.forEach(element => {
            let elementRec=element.getBounds();
            elementRec=elementRec.setTo(elementRec.x+elementRec.width/10,elementRec.y+elementRec.height/10,elementRec.width*4/5,elementRec.height*4/5);
            if(elementRec.intersects(ballRec))
            {
                inBlackhole=true;
            }

        });
        if(inBlackhole)
        {
            this.gameEnd();
        }

        //判断是否与障碍物碰撞反弹(先判断上下方向再判断左右方向)
        this._barrier.stones.forEach(element => {
            let elementRec=element.getBounds();
            elementRec=elementRec.setTo(elementRec.x+elementRec.width/10,elementRec.y+elementRec.height/10,elementRec.width*4/5,elementRec.height*4/5);
            if((ballRec.x>=elementRec.x-ballRec.width)&&
                (ballRec.right<=elementRec.right+ballRec.width)&&
                (ballRec.bottom>=elementRec.y)&&
                (ballRec.y<elementRec.y)&&
                (ball.vy>0))//向上反弹
                {
                    ball.collide(1, -1);
                    this._scoreIndicator.getPenalty(2);
                    this.backgroundView.removeChild(element);
                    this._barrier.stones.splice(this._barrier.stones.indexOf(element),1);
                    if(this._scoreIndicator.data<=0)
                    {
                        this.gameEnd();
                        return;
                    }
                }
            else if((ballRec.x>=elementRec.x-ballRec.width)&&
                (ballRec.right<=elementRec.right+ballRec.width)&&
                (ballRec.y<=elementRec.bottom)&&
                (ballRec.bottom>elementRec.bottom)&&
                (ball.vy<0))//向下反弹
                {
                    ball.collide(1, -1);
                    this._scoreIndicator.getPenalty(2);
                    this.backgroundView.removeChild(element);
                    this._barrier.stones.splice(this._barrier.stones.indexOf(element),1);
                    if(this._scoreIndicator.data<=0)
                    {
                        this.gameEnd();
                        return;
                    }
                }
            else if((ballRec.y>=elementRec.y-ballRec.height)&&
                (ballRec.bottom<=elementRec.bottom+ballRec.height)&&
                (ballRec.right>=elementRec.x)&&
                (ballRec.x<elementRec.x)&&
                (ball.vx>0))//向左反弹
                {
                    ball.collide(-1,1);
                    this._scoreIndicator.getPenalty(2);
                    this.backgroundView.removeChild(element);
                    this._barrier.stones.splice(this._barrier.stones.indexOf(element),1);
                    if(this._scoreIndicator.data<=0)
                    {
                        this.gameEnd();
                        return;
                    }
                }
            else if((ballRec.y>=elementRec.y-ballRec.height)&&
                (ballRec.bottom<=elementRec.bottom+ballRec.height)&&
                (ballRec.x<=elementRec.right)&&
                (ballRec.right>elementRec.right)&&
                (ball.vx<0))//向右反弹
                {
                    ball.collide(-1,1);
                    this._scoreIndicator.getPenalty(2);
                    this.backgroundView.removeChild(element);
                    this._barrier.stones.splice(this._barrier.stones.indexOf(element),1);
                    if(this._scoreIndicator.data<=0)
                    {
                        this.gameEnd();
                        return;
                    }
                }
        });

    }   

    //球与边缘的相对位置的检测与处理
    detectBorder(ball:Ball):void{
        if( ( ((ball.x-ball.radius) <= 0) && ball.vx < 0 ) || 
            ( ((ball.x+ball.radius) >= this.runningView.width) && ball.vx > 0 )
            ){
                // console.log("碰到水平边缘");
                this._musicManager.onPlaySound(Game.BlackHoleCollisionSound);//播放和石头碰撞的声音，仅用于调试
            ball.collide(-0.8,1);
        }else if(
            (((ball.y+ball.radius) >= this.runningView.height) && ball.vy > 0)
        ){
            // console.log("碰到垂直边缘");
            ball.collide(1, -0.9);
        }
    }

    //更新球的受力，主要是两个球之间的作用力
    updateForces():void{
        let distance:number = Math.sqrt(
            Math.pow((this._bigBall.x - this._smallBall.x), 2)+
            Math.pow((this._bigBall.y - this._smallBall.y), 2)
        );//球的距离平方
        let minDistance:number = this._bigBall.radius+this._smallBall.radius;//最近距离不能小于两球的半径之和
        let effectiveDistance = Math.max(distance, minDistance);//在计算受力时的有效距离

        //首先处理球靠近产生的升力
        let lift:number = Game.liftCoefficient / (effectiveDistance);
        this._bigBall.setForce(0, -lift, "lift");
        this._smallBall.setForce(0, -lift, "lift");

        //处理由于球运动产生的阻力
        let bigVSquare:number = Math.pow(this._bigBall.vx, 2) + Math.pow(this._bigBall.vy,2);
        this._bigBall.setForce(
            -bigVSquare * this._bigBall.vx * Game.dragCoefficient, 
            -bigVSquare * this._bigBall.vy * Game.dragCoefficient, 
            "drag");
        let smallVSquare:number = Math.pow(this._smallBall.vx, 2) + Math.pow(this._smallBall.vy, 2);
        this._smallBall.setForce(
            -smallVSquare * this._smallBall.vx * Game.dragCoefficient, 
            -smallVSquare * this._smallBall.vy * Game.dragCoefficient, 
            "drag");

        //处理两个小球之间的引力(认为水平方向无引力)
        let attraction:number = Game.attractionCoefficient / (Math.pow(effectiveDistance, 3));
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

        //随机受力
        if(this._loopCount % 10 == 0){//每隔1s，才会刷新一次随机受力
            this._smallBall.setForce(
                (Math.random()-0.5)*Game.randomForce, 
                (Math.random()-0.5)*Game.randomForce*0.3, 
                "random");
            this._bigBall.setForce(
                (Math.random()-0.5)*Game.randomForce, 
                (Math.random()-0.5)*Game.randomForce*0.3, 
                "random");
        }
    }

    //当触摸开始时调用
    onTouchStart(data:{type:string}):void{
        //增加大球受力
        let force = Math.random() * Game.humanForce;
        if(data.type === "left"){
            force = -force;
        }
        this._bigBall.setForce(force, 0, "humanControl");
        
    }

    onTouchEnd(data:{type:string}):void{
        //移除大球受力
        this._bigBall.removeForce("humanControl");
    }

}
