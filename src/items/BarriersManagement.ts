class BarriersManagement{

    public blackHoles:BlackHole[];//存黑洞的数组
    public _blackHolesNum:number;//黑洞个数
    public _blackHoleWidth:number;//黑洞宽度
    public _blackHoleHeight:number;//黑洞高度
    public _blackHoleName:string;//黑洞对象的名称，默认为blackhole

    public stones:Stone[];//存陨石的数组
    public _stonesNum:number;//陨石个数
    public _stoneWidth:number;//陨石宽度
    public _stoneHeight:number;//陨石高度
    public _stoneName:string;//陨石类的名称，默认为stone 
    public fallingStoneRate: number;//坠落的陨石的比例

    public zodiacs: Zodiac[];//存星座的数组
    public _zodiacNum: number;//星座个数
    public _zodiacWidth: number;//星座宽度
    public _zodiacHeight: number;//星座高度
    public _zodiacName:string;//星座名称，默认为zodiac
    
    private _backgroundImage:Laya.Image;//背景图

    constructor(backgroundImage:Laya.Image, fallingStoneRate:number=0,
    blackHolesNum:number=10,blackHoleWidth:number=100,blackHoleHeight:number=100,blackHoleName:string="blackhole",
    stonesNum:number=16,stoneWidth:number=50,stoneHeight:number=100,stoneName:string="stone",
    zodiacsNum: number=12, zodiacWidth:number=100, zodiacHeight:number=100, zodiacName:string="zodiac")
    {
        this._backgroundImage = backgroundImage;

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

        this.fallingStoneRate = fallingStoneRate;      
    }

    //清除所有的障碍物
    private clear(){
        // this.blackHoles.slice(0);
        this.blackHoles = [];
        while(this._backgroundImage.removeChildByName(this._blackHoleName));

        // this.stones.slice(0);
        this.stones = [];
        while(this._backgroundImage.removeChildByName(this._stoneName));

        // this.zodiacs.slice(0);
        this.zodiacs = [];
        while(this._backgroundImage.removeChildByName(this._zodiacName));
    }

    //重新生成屏幕上所有障碍物
    public regenerateBarrier():void
    {
        //初始化
        this.clear();

        //生成黑洞数组
        for(let i=0;i<this._blackHolesNum;i++)
        {
            const blackhole:BlackHole=new BlackHole(this._backgroundImage,this._blackHoleWidth,this._blackHoleHeight,this._blackHoleName);
            blackhole.randomGenerate(this._backgroundImage);
            this.blackHoles.push(blackhole);
        }

        //生成陨石数组
        for(let i=0;i<this._stonesNum;i++)
        {
            let isFalling:boolean = Math.random()<=this.fallingStoneRate;
            const stone:Stone=new Stone(this._backgroundImage,this._stoneWidth,this._stoneHeight,this._stoneName, isFalling);
            stone.randomGenerate(this._backgroundImage);
            this.stones.push(stone);
        }     

        //生成星座数组
        for(let i=0; i<this._zodiacNum; i++){
            const zodiac: Zodiac=new Zodiac(this._backgroundImage, this._zodiacWidth, this._zodiacHeight, this._zodiacName, i%12);
            zodiac.randomGenerate(this._backgroundImage);
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

    //刷新各障碍物的动画或图像
    public updateBarriers():void
    {
        this.blackHoles.forEach(element => {
            element.update();
        });

        this.stones.forEach(element => {
            element.update();
        });

        this.zodiacs.forEach(element =>{
            element.update();
        });
    }
}