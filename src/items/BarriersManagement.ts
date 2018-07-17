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
    export const fallingStoneStr:string="fallingstone";//陨石对应标识符

    export let zodiacNum: number=12;//星座个数
    export let zodiacWidth: number=100;//星座宽度
    export let zodiacHeight: number=100;//星座高度
    export const zodiacStr:string="zodiac";//星座对应标识符    
}
class BarriersManagement{
    public blackHoles:BlackHole[];//黑洞数组
    public stones:Stone[];//岩石数组
    public fallingStones:Stone[];//陨石数组
    public zodiacs:Zodiac[];//星座数组

    private _backgroundImage:Laya.Image;//背景图

    constructor(backgroundImage:Laya.Image)
    {
        this._backgroundImage = backgroundImage;
        this.blackHoles=[];
        this.stones=[];
        this.fallingStones=[];
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
                let stone:Stone=new Stone(this._backgroundImage,BarrierParameter.stoneWidth,BarrierParameter.stoneHeight,BarrierParameter.stoneStr,false);
                return stone;
            });
            this.stones.push(item);      
            break;     
        case BarrierParameter.fallingStoneStr://获取陨石对象
             item=Laya.Pool.getItemByCreateFun(BarrierParameter.fallingStoneStr,function():Stone{
                let fallingStone:Stone=new Stone(this._backgroundImage,BarrierParameter.stoneWidth,BarrierParameter.stoneHeight,BarrierParameter.fallingStoneStr,true);
                return fallingStone;
            });
            this.fallingStones.push(item);
            break;
        case BarrierParameter.zodiacStr://获取星座对象
            item=Laya.Pool.getItemByCreateFun(BarrierParameter.zodiacStr,function():Zodiac{
                 let zodiac:Zodiac=new Zodiac(this._backgroundImage,BarrierParameter.zodiacWidth,BarrierParameter.zodiacHeight,BarrierParameter.zodiacStr,zodiacNum);
                return zodiac;               
            })
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
        Laya.Pool.recover(barrier.name,barrier);
        switch(barrier.name)
        {
        case BarrierParameter.blackHoleStr://回收黑洞对象
            this.blackHoles.splice(this.blackHoles.indexOf(barrier),1);
            break;
        case BarrierParameter.stoneStr://回收岩石对象   
            this.stones.splice(this.stones.indexOf(barrier),1);       
            break;     
        case BarrierParameter.fallingStoneStr://回收陨石对象
            this.fallingStones.splice(this.fallingStones.indexOf(barrier),1);       
            break; 
        case BarrierParameter.zodiacStr://回收星座对象
            this.zodiacs.splice(this.fallingStones.indexOf(barrier),1);
            break;
        default:
            break;
        }
    }

    //回收背景上所有障碍物
    public removeFromBackground(backgroundImage:Laya.Image):void
    {
        for(let blackhole of this.blackHoles)
        {
            this.remove(blackhole);
            backgroundImage.removeChild(blackhole.item);
        }
        for(let stone of this.stones)
        {
            this.remove(stone);
            backgroundImage.removeChild(stone.item);           
        }
        for(let fallingStone of this.fallingStones)
        {
            this.remove(fallingStone);
            backgroundImage.removeChild(fallingStone.item);
        }
        for(let zodiac of this.zodiacs)
        {
            this.remove(zodiac);
            backgroundImage.removeChild(zodiac.item);
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
            blackhole.drawItem();
        }

        //更新岩石
        for(let i=0;i<BarrierParameter.stonesNum*(1-BarrierParameter.fallingStoneRate);i++)
        {
            let stone:Stone=this.produce(BarrierParameter.stoneStr);
            stone.randomGenerate(this._backgroundImage);
            stone.drawItem();
        }     

        //更新陨石
        for(let i=0;i<BarrierParameter.stonesNum*BarrierParameter.fallingStoneRate;i++)
        {
            let fallingStone:Stone=this.produce(BarrierParameter.fallingStoneStr);
            fallingStone.randomGenerate(this._backgroundImage);
            fallingStone.drawItem();
        }  

        //更新星座
        for(let i=0; i<BarrierParameter.zodiacNum; i++){
            let zodiac: Zodiac=this.produce(BarrierParameter.zodiacStr,i%12);
            zodiac.randomGenerate(this._backgroundImage);
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

        this.fallingStones.forEach(element=>{
            element.update();
        })

        this.zodiacs.forEach(element =>{
            element.update();
        });
    }

    //清除所有的障碍物
    public clear(){
        Laya.Pool.clearBySign(BarrierParameter.blackHoleStr);//清除黑洞对象
        Laya.Pool.clearBySign(BarrierParameter.stoneStr);//清除岩石对象
        Laya.Pool.clearBySign(BarrierParameter.fallingStoneStr);//清除陨石对象
        Laya.Pool.clearBySign(BarrierParameter.zodiacStr);//清除星座对象
    }
}