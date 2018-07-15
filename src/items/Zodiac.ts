namespace Game{
    export const zodiacLightImage:string="ui/zodiac/light.png";
    export const zodiacYellowImage: string="ui/zodiac/yellow.png";
}
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
        this.item.scaleX = this._width/160;
        this.item.scaleY = this._height/160;
    }

    //判断小球是否与星座相接触
    public detectCollisions(ball: Ball):boolean{
        if(this._bounds === null){
            this._bounds = this.getInnerBounds(this.item.getBounds(), 0.8, 0.8);
            // console.log("星座:" + this._bounds);
        }
        if(!this._isTouched && this._bounds.intersects(ball.animation.getBounds())){
            this._isTouched = true;
            this.drawItem();
            return true;
        }
        return false;
    }

}