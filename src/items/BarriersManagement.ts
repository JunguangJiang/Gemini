//与障碍物相关的参数
namespace BarrierParameter{
    export let blackHolesNum:number=5;//黑洞个数
    export let blackHoleWidth:number=100;//黑洞宽度
    export let blackHoleHeight:number=100;//黑洞高度
    export const blackHoleStr:string="blackhole";//黑洞对应标识符

    export let stonesNum:number=10;//岩石个数
    export let stoneWidth:number=50;//岩石宽度
    export let stoneHeight:number=100;//岩石高度
    export let fallingStoneRate: number=0.1;//坠落的陨石的比例
    export const stoneStr:string="stone";//岩石对应标识符

    export let zodiacNum: number=12;//星座个数
    export let zodiacWidth: number=75;//星座宽度
    export let zodiacHeight: number=75;//星座高度
    export const zodiacStr:string="zodiac";//星座对应标识符    
}
class BarriersManagement{
    public blackHoles:BlackHole[];//黑洞数组
    public stones:Stone[];//岩石数组
    public zodiacs:Zodiac[];//星座数组

    private _backgroundImage:Laya.Image;//背景图

    constructor(backgroundImage:Laya.Image)
    {
        this._backgroundImage = backgroundImage;
        this.blackHoles=[];
        this.stones=[];
        this.zodiacs=[];

    }

    //生成障碍物
    public produce(barrierType:string,zodiacNum=0):any
    {
        let item:any;
        switch(barrierType)
        {
        case BarrierParameter.blackHoleStr://获取黑洞对象
            item=Laya.Pool.getItemByCreateFun(BarrierParameter.blackHoleStr,function():BlackHole{
                let blackhole:BlackHole=new BlackHole(this._backgroundImage,BarrierParameter.blackHoleWidth,BarrierParameter.blackHoleHeight,BarrierParameter.blackHoleStr);
                return blackhole;
            });
            this.blackHoles.push(item);
            break;
        case BarrierParameter.stoneStr://获取岩石对象
             item=Laya.Pool.getItemByCreateFun(BarrierParameter.stoneStr,function():Stone{
                let stone:Stone=new Stone(this._backgroundImage,BarrierParameter.stoneWidth,BarrierParameter.stoneHeight,BarrierParameter.stoneStr,Math.random()<BarrierParameter.fallingStoneRate);               
                return stone;
            });
            this.stones.push(item);      
            break;     
        case BarrierParameter.zodiacStr://获取星座对象
            item=Laya.Pool.getItemByCreateFun(BarrierParameter.zodiacStr,function():Zodiac{
                 let zodiac:Zodiac=new Zodiac(this._backgroundImage,BarrierParameter.zodiacWidth,BarrierParameter.zodiacHeight,BarrierParameter.zodiacStr,zodiacNum);              
                return zodiac;               
            });
            this.zodiacs.push(item);
            break;
        default:
            item=null;
            break;
        }
        return item;
    }

    //回收障碍物
    public remove(barrier:any):void
    {
        this._backgroundImage.removeChild(barrier.item);//从画布上移除应写在此处比较合适
        Laya.Pool.recover(barrier.name,barrier);
        switch(barrier.name)
        {
        case BarrierParameter.blackHoleStr://回收黑洞对象
            this.blackHoles.splice(this.blackHoles.indexOf(barrier),1);
            break;
        case BarrierParameter.stoneStr://回收岩石对象   
            this.stones.splice(this.stones.indexOf(barrier),1);       
            break;     
        case BarrierParameter.zodiacStr://回收星座对象
            this.zodiacs.splice(this.zodiacs.indexOf(barrier),1);
            break;
        default:
            break;
        }
    }

    //回收背景上所有障碍物
    public removeFromBackground(backgroundImage:Laya.Image):void
    {
        while(this.blackHoles.length>0)
        {
            this.remove(this.blackHoles[0]);
        }
        while(this.stones.length>0)
        {
            this.remove(this.stones[0]);
        }
        while(this.zodiacs.length>0)
        {
            this.remove(this.zodiacs[0]);
        }
    }

    //更新各障碍物在屏幕上的位置并绘制
    public update():void
    {
        //回收所有元素
        this.removeFromBackground(this._backgroundImage);

        //更新黑洞
        for(let i=0;i<BarrierParameter.blackHolesNum;i++)
        {
            let blackhole:BlackHole=this.produce(BarrierParameter.blackHoleStr);
            blackhole.randomGenerate(this._backgroundImage);
            blackhole.init();
            blackhole.drawItem();
        }

        //更新岩石
        for(let i=0;i<BarrierParameter.stonesNum;i++)
        {
            let stone:Stone=this.produce(BarrierParameter.stoneStr);
            stone.randomGenerate(this._backgroundImage);
            stone.init();
            stone.drawItem();
        }     

        //更新星座
        for(let i=0; i<BarrierParameter.zodiacNum; i++){
            let zodiac: Zodiac=this.produce(BarrierParameter.zodiacStr,i%12);
            zodiac.randomGenerate(this._backgroundImage);
            zodiac.init();
            zodiac.drawItem();
        }
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

    //清除所有的障碍物
    public clear(){
        Laya.Pool.clearBySign(BarrierParameter.blackHoleStr);//清除黑洞对象
        Laya.Pool.clearBySign(BarrierParameter.stoneStr);//清除岩石对象
        Laya.Pool.clearBySign(BarrierParameter.zodiacStr);//清除星座对象
    }
}