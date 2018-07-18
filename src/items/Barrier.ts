//障碍物抽象父类
abstract class Barrier<T extends Laya.Sprite>{
    public item:T;//动画或者图像
    
    protected _width:number;//item宽度
    protected _height:number;//item高度
    protected _name:string;//item的名字
    
    protected _isTouched: boolean;//是否被触碰到
    protected _bounds:Laya.Rectangle;//接触的有效边界

    constructor(backgroundImage:Laya.Image,width:number,height:number,name:string)
    {
        this._width=width;
        this._height=height;
        this._name=name;
    }

    //取名字
    get name():string{return this._name;}

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
    public abstract detectCollisions(ball:Ball):boolean;

    //更新item的位置等
    public update():void{}//默认情况下什么都不做

    //获得图片区域内的一个有效区域,xScale和yScale分别为水平和竖直方向的缩放率
    public getInnerBounds(itemRec:Laya.Rectangle, xScale:number, yScale:number){
        itemRec=itemRec.setTo(itemRec.x+itemRec.width*(1-xScale)/2,itemRec.y+itemRec.height*(1-yScale)/2,itemRec.width*xScale,itemRec.height*yScale);
        return itemRec;
    }

    //重新初始化，用于回收利用
    public init():void{
        this._isTouched = false;
        this._bounds = null;   
    };
}