//球类
class Ball{
    private _image: Laya.Image;//球的图片

    constructor(radius: number, x:number, y:number, image: Laya.Image){
        this._image = image;
        this._image.size(radius, radius);//设置小球的半径
        this._image.pos(x, y);//设置小球的位置
        this._image.visible = true;
    }

    //获取球的当前位置
    get x():number{
        return this._image.x;
    }
    get y():number{
        return this._image.y;
    }

    //对小球进行施力,x/y分别为水平和数值方向的分量,t为施力的持续时间
    force(x:number, y:number, t?:number):void{

    }

    //对小球施加冲量，x/y分别为水平和数值方向的分量
    momentum(x:number, y:number):void{
        
    }

    //每过单位时间，对小球的位置进行更新
    updatePosition():void{

    }
}