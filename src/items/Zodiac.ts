namespace Game{
    export const zodiacLightImage:string="ui/zodiac/light.png";
    export const zodiacYellowImage: string="ui/zodiac/yellow.png";
}
// 星座类
class Zodiac extends Barrier<Laya.Clip>{
    private _type:number;//星座的类型
    private _isTouched: boolean;//是否被触碰到
    
    constructor(backgroundImage: Laya.Image, width: number, height:number, name: string, type: number){
        super(backgroundImage, width, height, name);
        this._type = type;
        this.item = new Laya.Clip();
        this.item.clipX = 3;
        this.item.clipY = 4;
        this.item.index = type % 12;
        this._isTouched = false;
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
    public detectCollisions(ball: Ball):number{
        if(!this._isTouched && this.item.getBounds().intersects(ball.animation.getBounds())){
            this._isTouched = true;
            this.drawItem();
            return 1;
        }
        return 0;
    }

}