class BlackHole extends Barrier<Laya.Animation>{

    constructor(backgroundImage:Laya.Image,width:number,height:number,name:string)
    {
        super(backgroundImage,width,height,name);
        this.item = new Laya.Animation();
    }

    //绘制item
    public drawItem():void
    {
        this.item.loadAnimation(Game.serverResURL+"/GameAnimation/BlackHole.ani");
        this.item.scaleX=this._width/100;
        this.item.scaleY=this._height/100;
        this.item.play();

    }

    //判断球是否与黑洞相撞，0为不相撞，1为相撞
     public detectCollisions(ball:Ball):number
     {
        let ballRec=new Laya.Rectangle(ball.x-ball.radius,ball.y-ball.radius,ball.radius*2,ball.radius*2);
   
        //判断球是否进入黑洞
        let inBlackhole:number=0;
        let itemRec=this.item.getBounds();
        itemRec=itemRec.setTo(itemRec.x+itemRec.width/10,itemRec.y+itemRec.height/10,itemRec.width*4/5,itemRec.height*4/5);
        if(itemRec.intersects(ballRec))
        {
            inBlackhole=1;
        }

         return inBlackhole;
     }
}