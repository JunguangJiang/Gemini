class BlackHole extends Barrier<Laya.Animation>{

    constructor(backgroundImage:Laya.Image,width:number,height:number,name:string)
    {
        super(backgroundImage,width,height,name);
    }

    //item随机生成在背景某处
    public randomGenerate(backgroundImage:Laya.Image):void
    {

        this.item=new Laya.Animation();
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
        this.index=backgroundImage.getChildIndex(this.item);
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