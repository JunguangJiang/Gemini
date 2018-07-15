//障碍物抽象类
abstract class Barrier<T extends Laya.Sprite>{
    public item:T;//动画或者图像
    
    protected _width:number;//item宽度
    protected _height:number;//item高度
    protected _name:string;//item的名字
    protected _isTouched: boolean;//是否被触碰到

    constructor(backgroundImage:Laya.Image,width:number,height:number,name:string)
    {
        this._width=width;
        this._height=height;
        this._name=name;
        this._isTouched = false;
    }

    //item随机生成在背景某处
    public randomGenerate(backgroundImage:Laya.Image):void{
        if(this.item){
            this.item.width=this._width;//不确定要不要在这里设置尺寸！！
            this.item.height=this._height;
            this.item.name=this._name;

            //随机生成坐标并检测是否会与其他物体重叠
            let overlap:number,
            x:number,
            y:number,
            testRec:Laya.Sprite;//用于测试的矩形范围

            testRec=new Laya.Sprite();

            while(true)
            {
                x=Math.min(backgroundImage.width-this._width,Math.random()*backgroundImage.width);
                y=Math.min(backgroundImage.height-this._height-150,Math.random()*backgroundImage.height);
                overlap=0;

                backgroundImage._childs.forEach(element => {
                    testRec.width=element.width+2*this._width;
                    testRec.height=element.height+2*this._height;
                    testRec.x=element.x-this._width;
                    testRec.y=element.y-this._height;
                    if(testRec.hitTestPoint(x,y))
                    {
                        overlap=overlap+1;
                    }
                });
                if(!overlap)
                {
                    break;
                }
            }
            this.item.x=x;
            this.item.y=y;
            
            backgroundImage.addChild(this.item);
        }
    };

    //绘制item
    public abstract drawItem():void;

    //检测item与球类的碰撞
    public abstract detectCollisions(ball:Ball):number;

    //更新item的位置等
    public update():void{}//默认情况下什么都不做
}