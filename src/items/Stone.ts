namespace Game{
    export const fallingStoneSpeed: number = 5;//陨石下落的平均速度
}

class Stone extends Barrier<Laya.Image>{
    public isFalling:boolean;//是否正在坠落
    private _fallingStoneSpeed: number;//坠落速度
    private _up: number;//最高处
    private _down: number;//最低处

    constructor(backgroundImage:Laya.Image,width:number,height:number,name:string, isFalling:boolean=false)
    {
        super(backgroundImage,width,height,name);
        this.item = new Laya.Image();
        this.isFalling = isFalling;
        this._fallingStoneSpeed = Math.random()%Game.fallingStoneSpeed/2+Game.fallingStoneSpeed;
        this._up = 0;
        this._down = 2600; 
    }

    //绘制item
    public drawItem():void
    {
        if(!this.isFalling){
            this.item.loadImage(Game.stoneImage);
            this.item.scaleX=this._width/40;
            this.item.scaleY=this._height/55;
        }else{
            this.item.loadImage(Game.fallingStoneImage);
            this.item.scaleX=this._width/40;
            this.item.scaleY=this._height/55;
        }
    }

    //判断球是否与陨石相撞
     public detectCollisions(ball:Ball):boolean
     {
        if(this._isTouched)
            return false;//如果已经碰撞，则不再判断
        return this.getInnerBounds(this.item.getBounds(), 0.8,0.8).intersects(ball.animation.getBounds());
     }

     //不断更新陨石的位置，只有当_isFalling为真时，位置才会改变
     public update(){
         if(this.isFalling){
            this.item.y += this._fallingStoneSpeed;
            if(this.item.y >= this._down+this._height){
                this.item.y = this._up-this._height;
            }
         }
     }
}