class BlackHole extends Barrier<Laya.Animation>{

    constructor(backgroundImage:Laya.Image,width:number,height:number,name:string)
    {
        super(backgroundImage,width,height,name);
        this.item = new Laya.Animation();
    }

    //绘制item
    public drawItem():void
    {
        this.item.loadAnimation("GameAnimation/BlackHole.ani");
        this.item.scaleX=this._width/100;
        this.item.scaleY=this._height/100;
        this.item.play();
    }

    //判断球是否与黑洞相撞，0为不相撞，1为相撞
     public detectCollisions(ball:Ball):boolean
     {
         if(this._bounds === null){
            this._bounds = this.getInnerBounds(this.item.getBounds(), 0.25,0.25);
         }
        
        if(this._isTouched) 
            return false;//如果已经碰撞，则不再判断
        
        //判断球是否进入黑洞
        return this._bounds.intersects(ball.animation.getBounds());
     }
}