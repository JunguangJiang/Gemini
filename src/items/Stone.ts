class Stone extends Barrier<Laya.Image>{

    constructor(backgroundImage:Laya.Image,width:number,height:number,name:string)
    {
        super(backgroundImage,width,height,name);
    }

    //item随机生成在背景某处
    public randomGenerate(backgroundImage:Laya.Image):void
    {

        this.item=new Laya.Image();
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
        this.item.loadImage("res/atlas/ui/stone.png");
        this.item.scaleX=this._width/108;
        this.item.scaleY=this._height/191;
    }

    //判断球是否与陨石相撞，0为不相撞，1为上下碰撞，2为左右碰撞
     public detectCollisions(ball:Ball):number
     {
        let ballRec=new Laya.Rectangle(ball.x-ball.radius,ball.y-ball.radius,ball.radius*2,ball.radius*2);
   
        //判断是否与障碍物碰撞反弹(先判断上下方向再判断左右方向)
        let itemRec=this.item.getBounds();
        itemRec=itemRec.setTo(itemRec.x+itemRec.width/10,itemRec.y+itemRec.height/10,itemRec.width*4/5,itemRec.height*4/5);
        let inStone:number=0;//无碰撞是0，上下方向是1，左右方向是2
        if((ballRec.x>=itemRec.x-ballRec.width)&&(ballRec.right<=itemRec.right+ballRec.width))
        {
            if(((ballRec.bottom>=itemRec.y)&&(ballRec.y<itemRec.y)&&(ball.vy>0))||//向上反弹
            ((ballRec.y<=itemRec.bottom)&&(ballRec.bottom>itemRec.bottom)&&(ball.vy<0)))//向下反弹
            {
                inStone=1;
            }
        }
        if((ballRec.y>=itemRec.y-ballRec.height)&&(ballRec.bottom<=itemRec.bottom+ballRec.height))//向左反弹
        {
            if(((ballRec.right>=itemRec.x)&&(ballRec.x<itemRec.x)&&(ball.vx>0))||//向左反弹
            ((ballRec.x<=itemRec.right)&&(ballRec.right>itemRec.right)&&(ball.vx<0)))//向右反弹
            {
                inStone=2;
            }
        }

        return inStone;
     }
}