class BarriersManagement{
    
    public blackHoles:BlackHole[];//存黑洞的数组
    private _blackHolesNum:number;//黑洞个数
    private _blackHoleWidth:number;//黑洞宽度
    private _blackHoleHeight:number;//黑洞高度
    private _blackHoleName:string;//黑洞对象的名称，默认为blackhole

    public stones:Stone[];//存陨石的数组
    private _stonesNum:number;//陨石个数
    private _stoneWidth:number;//陨石宽度
    private _stoneHeight:number;//陨石高度
    private _stoneName:string;//陨石类的名称，默认为stone 

    public zodiacs: Zodiac[];//存星座的数组
    private _zodiacNum: number;//星座个数
    private _zodiacWidth: number;//星座宽度
    private _zodiacHeight: number;//星座高度
    private _zodiacName:string;//星座名称，默认为zodiac

    constructor(backgroundImage:Laya.Image,
    blackHolesNum:number=5,blackHoleWidth:number=100,blackHoleHeight:number=100,blackHoleName:string="blackhole",
    stonesNum:number=16,stoneWidth:number=50,stoneHeight:number=100,stoneName:string="stone",
    zodiacsNum: number=12, zodiacWidth:number=100, zodiacHeight:number=100, zodiacName:string="zodiac")
    {
        /*黑洞初始化*/
        this.blackHoles=[];
        this._blackHolesNum=blackHolesNum;        
        this._blackHoleWidth=blackHoleWidth;
        this._blackHoleHeight=blackHoleHeight;
        this._blackHoleName=blackHoleName;
        
        /*陨石初始化*/
        this.stones=[];
        this._stonesNum=stonesNum;
        this._stoneWidth=stoneWidth;
        this._stoneHeight=stoneHeight;
        this._stoneName=stoneName;

        /* 星座的初始化 */
        this.zodiacs = [];
        this._zodiacNum = zodiacsNum;
        this._zodiacWidth = zodiacWidth;
        this._zodiacHeight = zodiacHeight;
        this._zodiacName = zodiacName;

        //更新所有障碍物
        this.updateBarrier(backgroundImage);
        
    }

    //更新屏幕上所有障碍物
    public updateBarrier(backgroundImage:Laya.Image):void
    {
        //初始化
        this.blackHoles.slice(0);
        while(backgroundImage.removeChildByName(this._blackHoleName));

        this.stones.slice(0);
        while(backgroundImage.removeChildByName(this._stoneName));

        this.zodiacs.slice(0);
        while(backgroundImage.removeChildByName(this._zodiacName));

        //生成黑洞数组
        for(let i=0;i<this._blackHolesNum;i++)
        {
            const blackhole:BlackHole=new BlackHole(backgroundImage,this._blackHoleWidth,this._blackHoleHeight,this._blackHoleName);
            blackhole.randomGenerate(backgroundImage);
            this.blackHoles.push(blackhole);
        }

        //生成陨石数组
        for(let i=0;i<this._stonesNum;i++)
        {
            const stone:Stone=new Stone(backgroundImage,this._stoneWidth,this._stoneHeight,this._stoneName);
            stone.randomGenerate(backgroundImage);
            this.stones.push(stone);
        }     

        //生成星座数组
        for(let i=0; i<this._zodiacNum; i++){
            const zodiac: Zodiac=new Zodiac(backgroundImage, this._zodiacWidth, this._zodiacHeight, this._zodiacName, i%12);
            zodiac.randomGenerate(backgroundImage);
            this.zodiacs.push(zodiac);
        }

    }

    //绘制各障碍物的动画或图像
    public drawBarriers():void
    {
        this.blackHoles.forEach(element => {
            element.drawItem();
        });

        this.stones.forEach(element => {
            element.drawItem();
        });

        this.zodiacs.forEach(element =>{
            element.drawItem();
        });
    }
}