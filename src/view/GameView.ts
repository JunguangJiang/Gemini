//游戏的一些参数
namespace Game{
    export const debug: boolean = true;//是否处于调试模式
    export let playerNum: number = 1;//玩家数目，可以取1或者2
    export const interval:number = 100;//刷新时间(单位：毫秒)

    export const gravity:number = 14;//重力加速度
    export const liftCoefficient:number = debug?1600:700;//升力系数,升力=liftCoefficient/(球心距离)
    export const dragCoefficient:number = 0.001;//阻力系数，阻力=-dragCoefficient*速度^3
    export let attractionCoefficient:number=8000;//球之间的引力系数
    export let randomForce = 10;//随机力的幅度
    export const humanForce = 40;//人类施力的幅度
    export let smallBallRandomForcePeriod = 100;//小球受到随机力的周期
    export let bigBallRandomForcePeriod = 500;//大球受到随机力的周期

    export const initialY = 2600;//小球的初始高度

    export const serverResURL = "http://jjg15.iterator-traits.com/res";//服务器资源路径
}

//游戏的主视图
class GameView extends ui.GameViewUI{
    //管理黑洞、障碍物、小球等对象
    private _smallBall: Ball;//小球
    private _bigBall: Ball;//大球
    private _arrow: Arrow;//控制大球的箭头区域
    private _smallArrow: Arrow;//控制小球的箭头区域
    private _barriersManagement:BarriersManagement;//障碍物管理
    private _scoreIndicator: ScoreIndicator;//计分器
    private _musicManager: MusicManager;//音乐管理器
    
    private _loopCount: number;//记录刷新（循环）总次数
    private _activityArea:{up:number, down:number};//游戏的最大活动区域

    private _level: number;//当前游戏的等级

    //构造函数
    constructor()
    {
        super();
    }

    //界面初始化
    init():void
    {
        //游戏的活动区域
        this._activityArea = {up:this.height-this.backgroundView.height, down:0};

        //球的初始化
        this._bigBall = new Ball(25, 400, Game.initialY,this.bigBallView);
        this._smallBall = new Ball(15, 200, Game.initialY,this.smallBallView);

        //控制方向的箭头区域的初始化
        this._arrow = new Arrow(
            this.arrowView.getChildByName("left") as Laya.Image, 
            this.arrowView.getChildByName("right") as Laya.Image, 
            Laya.Handler.create(this, this.onTouchStart, null, false),
            Laya.Handler.create(this, this.onTouchEnd, null, false),"big"
        );
        if(Game.playerNum === 2){//如果是双人模式
            this._smallArrow = new Arrow(
                this.smallArrowView.getChildByName("left") as Laya.Image, 
                this.smallArrowView.getChildByName("right") as Laya.Image, 
                Laya.Handler.create(this, this.onTouchStart, null, false),
                Laya.Handler.create(this, this.onTouchEnd, null, false),"small"
            )
        }else{//如果是单人模式
            this.smallArrowView.visible = false;
        }

        this._loopCount = 0;
        this._level = 1;

        //障碍物类初始化与障碍物绘制
        this._barriersManagement=new BarriersManagement(this.backgroundView, 0.5);
        this._barriersManagement.drawBarriers();

        //计分器的初始化
        this._scoreIndicator = new ScoreIndicator(this.scoreView, 3, this.runningView.height, 0);

        //等级显示
        this.levelView.visible = true;

        //音乐播放器
        this._musicManager = new MusicManager();
        this._musicManager.onPlayMusic(1);//播放等级1的音乐
    }

    //进入新的一级
    enterNewLevel():void{
        this._level++;
        this.levelView.text = "level "+ this._level;

        this.increaseDifficulty();//增加游戏难度
        
        this._scoreIndicator.clearHeight();//计分器维护的高度归零

        this._bigBall.y = this._smallBall.y = Game.initialY;//让大球和小球都回到起点
        this._bigBall.stop(); 
        this._smallBall.stop();

        this._barriersManagement.regenerateBarrier(this.backgroundView);//清除原先的障碍物
        this._barriersManagement.drawBarriers(); //绘制新的障碍物
        
        this._musicManager.onPlaySound(Game.NewLevelSound);//播放过关音乐
        this._musicManager.onPlayMusic(this._level);//绘制新的音乐
    }

    //增加游戏难度
    increaseDifficulty():void{
        Game.randomForce = Game.randomForce * 1.1;
        //增加障碍物的数量
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
        console.log("你的总分为"+this._scoreIndicator.data);
        Laya.timer.clear(this, this.onLoop);
    }

    //需要每隔单位时间进行一次调用的函数请写入以下函数体
    onLoop():void{
        this._barriersManagement.updateBarriers();
        this.detectCollisions(this._bigBall);//大球碰撞检测与处理
        if(Game.playerNum === 2){
            this.detectCollisions(this._smallBall);//双人模式下小球也需要检测碰撞
        }
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
        //判断球是否进入黑洞
        for(let item of this._barriersManagement.blackHoles)
        {
            if(item.detectCollisions(ball))
            {
                this.gameEnd();
            }
        }

        //判断球是否与陨石碰撞反弹
        for(let item of this._barriersManagement.stones)
        {
            if(item.detectCollisions(ball))//在此处添加碰撞音效
            {
                //根据陨石是否下落确定惩罚的分数
                if(item.isFalling){
                    this._scoreIndicator.getPenalty(4);
                }else{
                    this._scoreIndicator.getPenalty(5);
                }
                //移除该陨石
                this.backgroundView.removeChild(item.item);
                this._barriersManagement.stones.splice(this._barriersManagement.stones.indexOf(item),1);

                //判断游戏是否结束
                if(this._scoreIndicator.data<=0)
                {
                    this.gameEnd();
                    return;
                }
                //小球受到碰撞冲量
                ball.collide(-0.8, -0.8);
            }
        }

        //判断球是否和星座相碰
        for(let item of this._barriersManagement.zodiacs)
        {
            if(item.detectCollisions(ball))
            {
                this._scoreIndicator.getReward(8);
            }
        }
    }   

    //球与边缘的相对位置的检测与处理
    detectBorder(ball:Ball):void{
        if( ( ((ball.x-ball.radius) <= 0) && ball.vx < 0 ) || 
            ( ((ball.x+ball.radius) >= this.runningView.width) && ball.vx > 0 )
            ){
                // console.log("碰到水平边缘");
                //this._musicManager.onPlaySound(Game.RewardSound);//播放和石头碰撞的声音，仅用于调试
            ball.collide(-1,1);
        }else if(
            (((ball.y+ball.radius) >= this.runningView.height) && ball.vy > 0)
        ){
            // console.log("碰到垂直边缘");
            ball.collide(1, -0.9);
        }else if(
            (((ball.y-ball.radius) <= 0) && ball.vy < 0)
        ){
            this.enterNewLevel();//进入新的一个回合
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
        if(!Game.debug){
            if(this._loopCount % Game.smallBallRandomForcePeriod === 0){
                this.setRandomForce(this._smallBall);
            }
            if(this._loopCount % Game.bigBallRandomForcePeriod === 0){
                this.setRandomForce(this._bigBall);
            }   
        }
    }

    //让球受到随机力
    setRandomForce(ball: Ball):void{
        if(Math.random()>0.2){
            let Fx:number = (Math.random()-0.5)*Game.randomForce/2+Game.randomForce;
            // console.log("水平力Fx="+Fx);
            ball.setForce(Fx, 0, "random");
        }else{
            let Fy:number = (Math.random()-0.5)*Game.randomForce/2+Game.randomForce;
            // console.log("垂直力Fx="+Fy);
            ball.setForce(0,Fy/3, "random");
        }
        let forceTime:number = Math.random() * 3000 + 1000;//持续时间也是随机的
        Laya.timer.once(forceTime, ball, ball.removeForce, ["random"]);
        // console.log(ball.radius+" ball get random force for "+forceTime+"s");
    }

    //当触摸开始时调用
    onTouchStart(data:{type:string, ballType:string}):void{
        //增加大球受力
        let force = Math.random() * Game.humanForce/2+Game.humanForce;
        if(data.type === "left"){
            force = -force;
        }
        if(data.ballType === "big"){
            this._bigBall.setForce(force, 0, "humanControl");
        }else{
            this._smallBall.setForce(force, 0, "humanControl");
        }
    }

    onTouchEnd(data:{type:string, ballType:string}):void{
        //移除大球受力
        if(data.ballType === "big"){
            this._bigBall.removeForce("humanControl");
        }else{
            this._smallBall.removeForce("humanControl");
        }
    }

}
