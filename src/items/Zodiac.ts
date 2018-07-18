// 星座类
class Zodiac extends Barrier<Laya.Clip>{
    private _type:number;//星座的类型
    
    constructor(backgroundImage: Laya.Image, width: number, height:number, name: string, type: number){
        super(backgroundImage, width, height, name);
        this._type = type;
        this.item = new Laya.Clip();
        this.item.clipX = 3;
        this.item.clipY = 4;
        this.item.index = type % 12;
        this.init();
    }

    //绘制item
    public drawItem():void{
        if(!this._isTouched){
            this.item.skin = Game.zodiacLightImage;
            this.item.alpha = 0.3;
        }else{
            this.item.skin = Game.zodiacYellowImage;
            this.item.alpha = 0.7
        }
        this.item.scaleX = this._width/80;
        this.item.scaleY = this._height/80;
    }

    //判断小球是否与星座相接触
    public detectCollisions(ball: Ball):boolean{        
        if(this._isTouched) 
            return false;//如果已经碰撞，则不再判断

        this._bounds = this.getInnerBounds(this.item.getBounds(), 0.25,0.25);//计算有效边界

        if(this._bounds.intersects(ball.animation.getBounds())){
            this._isTouched = true;
            this.drawItem();
            return true;
        }
        return false;
    }

}