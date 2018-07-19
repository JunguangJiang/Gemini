//游戏的一些参数
namespace Game{
    export let score: number = 0;//玩家得分
    export let level: number = 0;//进入等级
}

//游戏的结束界面
class EndView extends ui.EndViewUI{
    //构造函数
    constructor()
    {
        super();
    }

    //结束界面还原初始化设置
    public init():void
    {
        //避免下次到结束界面时显示分数、等级
        this.scoreView.visible=false;
        this.levelView.visible=false;
        //去掉已有的结束字样
        while(this.removeChildByName("endText"));
    }

    //显示失败的缓动动画
    public showEnd():void
    {
        const textWidth: number = 300;
        const offset: number = this.backgroundView.width - textWidth >> 1;
        const endY: number = 50;
        const endText: string = "GAMEOVER";
        for (let i: number = 0, len: number = endText.length; i < len; ++i) 
        {
            let letterText: Laya.Text = this.createLetter(endText.charAt(i));
            letterText.name="endText";
            this.addChild(letterText);
            letterText.x = textWidth / len * i + offset;
            letterText.y=-300;
            if(i===len-1)//最后一个字母之后调用回调函数
            {
                Laya.Tween.to(letterText, { y: endY }, 400, Laya.Ease.elasticOut, Laya.Handler.create(this, this.showAll), i * 400);
            }
            Laya.Tween.to(letterText, { y: endY }, 400, Laya.Ease.elasticOut, null, i * 400);
        }
    }

    //创建缓动文字
    private createLetter(char:string):Laya.Text
    {
        var letter: Laya.Text = new Laya.Text();
        letter.text = char;
        letter.color = "#FFFFFF";
        letter.font = "Impact";
        letter.fontSize = 40;
        this.backgroundView.addChild(letter);
        return letter;
    }

    //显示所有结果
    private showAll():void
    {
        this.showLevel();
        this.showScore();
    }

     //显示等级
    private showLevel():void
    {
        let data:any = {}
        let temp:number = Game.level;
        for(let i:number=3; i>=1; i--){
            data["item"+i] = {index:Math.floor(temp%10)};
            temp /= 10;
        }
        this.levelView.dataSource = data;
        this.levelView.visible=true;
    }

    //显示分数
    private showScore():void
    {
        let data:any = {}
        let temp:number = Game.score;
        for(let i:number=3; i>=1; i--){
            data["item"+i] = {index:Math.floor(temp%10)};
            temp /= 10;
        }
        this.scoreView.dataSource = data;
        this.scoreView.visible=true;
    }

}
