//障碍物类
class Barrier{
    public blackHoles:Laya.Animation[];//存黑洞的数组
    public stones:Laya.Image[];//存陨石的数组

    private _blackHolesNum:number;//黑洞个数
    private _stonesNum:number;//陨石个数
    private _blackHoleWidth:number;//黑洞宽度
    private _blackHoleHeight:number;//黑洞高度
    private _stoneWidth:number;//陨石宽度
    private _stoneHeight:number;//陨石高度  


    constructor(backgroundImage:Laya.Image,blackHolesNum:number=5,stonesNum:number=15,blackHoleWidth:number=100,blackHoleHeight:number=100,stoneWidth:number=50,stoneHeight:number=100)
    {
        this.blackHoles=[];
        this.stones=[];

        this._blackHolesNum=blackHolesNum;
        this._stonesNum=stonesNum;
        this._blackHoleWidth=blackHoleWidth;
        this._blackHoleHeight=blackHoleHeight;
        this._stoneWidth=stoneWidth;
        this._stoneHeight=stoneHeight;

        this.updateBarrier(backgroundImage);
        
    }

    //更新屏幕上各障碍物的位置
    public updateBarrier(backgroundImage:Laya.Image):void
    {
        //初始化
        this.blackHoles.slice(0);
        this.stones.slice(0);

        while(backgroundImage.removeChildByName("blackhole"));
        while(backgroundImage.removeChildByName("stone"));

        //黑洞的位置
        const blackHoleDistance:number=backgroundImage.height/this._blackHolesNum;
        for(let i=0;i<this._blackHolesNum;i++)
        {
            const blackhole:Laya.Animation=new Laya.Animation();
            blackhole.width=this._blackHoleWidth;
            blackhole.height=this._blackHoleHeight;
            blackhole.name="blackhole";

            blackhole.x=Math.min(backgroundImage.width-this._blackHoleWidth,Math.random()*backgroundImage.width);
            blackhole.y=Math.min((i+Math.random())*blackHoleDistance,backgroundImage.height-this._blackHoleHeight-100);//在y方向基本承均匀分布

            this.blackHoles.push(blackhole);
            backgroundImage.addChild(blackhole);
        }

        //陨石的位置（需设置不与黑洞重叠）
        const stoneDistance:number=backgroundImage.height/this._stonesNum;
        for(let i=0;i<this._stonesNum;i++)
        {
            const stone:Laya.Image=new Laya.Image();
            stone.width=this._stoneWidth;
            stone.height=this._stoneHeight;
            stone.name="stone";

            //随机生成坐标并检测是否会与黑洞重叠
            let overlap:number,
                x:number,
                y:number,
                testRec:Laya.Sprite;//用于测试的矩形范围

            testRec=new Laya.Sprite();
            testRec.width=this._blackHoleWidth+2*this._stoneWidth;
            testRec.height=this._blackHoleHeight+2*this._stoneHeight;

            while(true)
            {
                x=Math.min(backgroundImage.width-this._stoneWidth,Math.random()*backgroundImage.width);
                y=Math.min((i+Math.random())*stoneDistance,backgroundImage.height-this._stoneHeight-100);
                overlap=0;

                this.blackHoles.forEach(element => {
                    testRec.x=element.x-this._stoneWidth;
                    testRec.y=element.y-this._stoneHeight;
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

            stone.x=x;
            stone.y=y;

            this.stones.push(stone);
            backgroundImage.addChild(stone);
        }     


    }

    //绘制各障碍物的动画或图像
    public drawBarriers():void
    {
        this.blackHoles.forEach(element => {
            element.loadAnimation("GameAnimation/BlackHole.ani");
            element.scaleX=this._blackHoleWidth/100;
            element.scaleY=this._blackHoleHeight/100;
            element.play();
        });

        this.stones.forEach(element => {
            element.loadImage("res/atlas/ui/stone.png");
            element.scaleX=this._stoneWidth/108;
            element.scaleY=this._stoneHeight/191;
        });
    }
}
