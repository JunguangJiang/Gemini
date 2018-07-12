//障碍物类
class Barrier{
    public _blackHoles:Laya.Animation[];//存黑洞的数组
    public _stones:Laya.Image[];//存陨石的数组

    private _blackHolesNum:number;//黑洞个数
    private _stonesNum:number;//陨石个数
    private _blackHoleWidth:number;//黑洞宽度
    private _blackHoleHeight:number;//黑洞高度
    private _stoneWidth:number;//陨石宽度
    private _stoneHeight:number;//陨石高度  


    constructor(backgroundImage:Laya.Image,blackHolesNum:number=5,stonesNum:number=5,blackHoleWidth:number=100,blackHoleHeight:number=100,stoneWidth:number=50,stoneHeight:number=100)
    {
        this._blackHoles=[];
        this._stones=[];

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
        this._blackHoles.slice(0);
        this._stones.slice(0);

        //黑洞的位置
        const blackHoleDistance:number=backgroundImage.height/this._blackHolesNum;
        for(let i=0;i<this._blackHolesNum;i++)
        {
            const blackhole:Laya.Animation=new Laya.Animation();
            blackhole.width=this._blackHoleWidth;
            blackhole.height=this._blackHoleHeight;

            blackhole.x=Math.min(backgroundImage.width-this._blackHoleWidth,Math.random()*backgroundImage.width);
            blackhole.y=(i+Math.random())*blackHoleDistance;//在y方向基本承均匀分布

            this._blackHoles.push(blackhole);
            backgroundImage.addChild(blackhole);
        }

        //陨石的位置（需设置不与黑洞重叠）
        const stoneDistance:number=backgroundImage.height/this._stonesNum;
        for(let i=0;i<this._stonesNum;i++)
        {
            const stone:Laya.Image=new Laya.Image();
            stone.width=this._stoneWidth;
            stone.height=this._stoneHeight;

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
                y=(i+Math.random())*stoneDistance;
                overlap=0;

                this._blackHoles.forEach(element => {
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

            this._stones.push(stone);
            backgroundImage.addChild(stone);
        }     


    }

    //绘制各障碍物的动画或图像
    public drawBarriers():void
    {
        this._blackHoles.forEach(element => {
            element.loadAnimation("GameAnimation/BlackHole.ani");
            element.play();
        });

        this._stones.forEach(element => {
            element.loadImage("res/atlas/ui/stone.png",null,null,element.width,element.height);
        });
    }
}
