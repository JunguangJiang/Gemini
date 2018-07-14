//障碍物抽象类
abstract class Barrier<T extends Laya.Sprite>{
    public item:T;//动画或者图像
    public index:number;//在背景的children中的编号

    protected _width:number;//item宽度
    protected _height:number;//item高度
    protected _name:string;//item的名字

    constructor(backgroundImage:Laya.Image,width:number,height:number,name:string)
    {
        this._width=width;
        this._height=height;
        this._name=name;
        this.index=0;    
    }

    //item随机生成在背景某处
    public abstract randomGenerate(backgroundImage:Laya.Image):void;

    //绘制item
    public abstract drawItem():void;

    //检测item与球类的碰撞
    public abstract detectCollisions(ball:Ball):number;
}