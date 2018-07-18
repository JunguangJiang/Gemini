//球类
class Ball{
    public _animation: Laya.Animation;//球的动画
    private _radius: number;//小球半径
    private _forces: Laya.Dictionary;//施加在小球上的所有力
    //速度
    private _vx: number;
    private _vy: number;

    //加速度
    private _ax: number;
    private _ay: number;

    //记录暂停前的加速度
    private _last_ax: number;
    private _last_ay: number;

    private _timer: Timer;//时钟
    constructor(radius: number, x:number, y:number,ballView:Laya.Animation){
        this._animation=ballView;
        this._radius = radius;
        this._timer = new Timer();
        this._forces = new Laya.Dictionary();//记录所有的受力
        this.x = x; this.y = y; //设置小球的位置
        this._vx = this._vy = this._ax = this._ay = 0;
        //绘制动画并加入背景中
        this.drawNormalBall();
    }

    //使小球静止
    stop():void{
        this._vx = this._vy = 0;
    }

    //设置球的当前位置(球心)
    set x(x:number){this._animation.x = x-this.radius;}
    set y(y:number){this._animation.y = y-this.radius;}

    //获取球的当前位置（球心）
    get x():number{return this._animation.x+this.radius;}
    get y():number{return this._animation.y+this.radius;}

    //获取球的速度
    get vx():number{return this._vx;}
    get vy():number{return this._vy;}

    //获取球的加速度
    get ax():number{return this._ax;}
    get ay():number{return this._ay;}

    //调试小球信息
    debug(name:string):void{
        console.log(name+"\n\tax:"+this.ax+"\tay:"+this.ay+"\n\tvx:"+this.vx+"\tvy:"+this.vy+"\n\tx:"+this.x+"\ty:"+this.y);
    }

    //获取球的半径
    get radius():number{return this._radius;}

    //获取球的动画
    get animation():Laya.Animation{return this._animation;}

    //对小球增加受力，Fx/Fy分别为水平和数值方向的分量,name为该力的种类
    //认为小球的质量均为1
    setForce(Fx: number, Fy: number, name: string):void{
        this.removeForce(name);
        this._ax += Fx;
        this._ay += Fy;
        this._forces.set(name, {Fx:Fx, Fy:Fy});
    }

    //移除小球上的力name
    removeForce(name:string):void{
        let value = this._forces.get(name);
        if(value){
            this._ax -= value.Fx;
            this._ay -= value.Fy;
            this._forces.remove(name);
        }
    }

    //碰撞会改变小球的速度分量，使原先的<Vx,Vy>变成<Vx * xRatio, Vy * yRatio>
    collide(xRatio:number, yRatio:number){
        this._vx = this._vx * xRatio;
        this._vy = this._vy * yRatio;
    }

    //对小球的位置和速度进行更新
    update():void{
        let deltaT: number = this._timer.get()/1000.0*4;
        this._timer.stop();
        this.x = this.x + this._vx * deltaT;
        this.y = this.y + this._vy * deltaT;
        this._vx = this._vx + this._ax * deltaT;
        this._vy =  this._vy + this._ay * deltaT;
        this._timer.start();
    }

    //让小球静止
    pause():void{
        this._timer.pause();
    }

    //让小球重新开始运动
    restart():void{
        this._timer.start();
    }

    //进行小球动画的加载和绘制
    public drawNormalBall()
    {
        this._animation.loadAnimation("GameAnimation/Ball.ani");
        this._animation.scaleX=this._radius*2/30;
        this._animation.scaleY=this._radius*2/30;
        this._animation.play();
    } 

    //让小球受到阻力
    setDragForce():void{
        let VSquare:number = Math.pow(this.vx, 2) + Math.pow(this.vy,2);
        this.setForce(
            -VSquare * this.vx * Game.dragCoefficient, 
            -VSquare * this.vy * Game.dragCoefficient, 
            "drag");
    }

    //让球受到随机力
    setRandomForce():void{
        if(Math.random()>0.2){
            let Fx:number = (Math.random()-0.5)*Game.randomForce/2;
            this.setForce(Fx, 0, "random");
        }else{
            let Fy:number = (Math.random()-0.5)*Game.randomForce/2+Game.randomForce;
            this.setForce(0,Fy/3, "random");
        }
        let forceTime:number = Math.random() * 3000 + 1000;//持续时间也是随机的
        Laya.timer.once(forceTime, this, this.removeForce, ["random"], false);
    }
}
