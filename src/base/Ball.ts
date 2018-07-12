//球类
class Ball{
    private _image: Laya.Image;//球的图片
    private _radius: number;//小球半径
    private _forces: Laya.Dictionary;//施加在小球上的所有力

    //速度
    private _vx: number;
    private _vy: number;

    //加速度
    private _ax: number;
    private _ay: number;

    private _timer: Timer;//时钟

    constructor(radius: number, x:number, y:number, image: Laya.Image){
        this._image = image;
        this._image.size(2*radius, 2*radius);//设置小球的半径
        this._radius = radius;
        this._image.pos(x, y);//设置小球的位置
        this._image.visible = true;
        this._vx = this._vy = this._ax = this._ay = 0;
        this._timer = new Timer();
        this._forces = new Laya.Dictionary();
    }

    //设置球的当前位置
    set x(x:number){this._image.x = x;}
    set y(y:number){this._image.y = y;}

    //获取球的当前位置
    get x():number{return this._image.x;}
    get y():number{return this._image.y;}

    //获取球的速度
    get vx():number{return this._vx;}
    get vy():number{return this._vy;}

    //获取球的半径
    get radius():number{return this._radius;}

    //对小球增加受力，Fx/Fy分别为水平和数值方向的分量,name为该力的种类
    //认为小球的质量均为1
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
            console.log(this._ax);
        }
    }

    //碰撞会改变小球的速度分量，使原先的<Vx,Vy>变成<-Vx * xRatio, -Vy * yRatio>
    collide(xRatio:number, yRatio:number){
        this._vx = -this._vx * xRatio;
        this._vy = -this._vy * yRatio;
    }

    //对小球的位置和速度进行更新
    update():void{
        let deltaT: number = this._timer.get()/1000.0;
        this.x = this.x + this._vx * deltaT;
        this.y = this.y + this._vy * deltaT;
        this._vx = this._vx + this._ax * deltaT;
        this._vy =  this._vy + this._ay * deltaT;
        this._timer.start();
    }
}