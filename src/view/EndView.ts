//游戏的一些参数
namespace Game{
    export let score: number = 0;//玩家得分
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
        //避免下次到结束界面时显示分数
        this.scoreView.visible=false;
        //去掉已有的lose字样
        while(this.removeChildByName("failText"));
    }

    //显示失败的缓动动画
    public showFailure():void
    {
        const textWidth: number = 300;
        const offset: number = this.backgroundView.width - textWidth >> 1;
        const endY: number = 50;
        const failText: string = "Lose";
        for (let i: number = 0, len: number = failText.length; i < len; ++i) 
        {
            let letterText: Laya.Text = this.createLetter(failText.charAt(i));
            letterText.name="failText";
            this.addChild(letterText);
            letterText.x = textWidth / len * i + offset;
            letterText.y=-300;
            if(i===len-1)//最后一个字母之后调用回调函数
            {
                Laya.Tween.to(letterText, { y: endY }, 500, Laya.Ease.elasticOut, Laya.Handler.create(this, this.showScore), i * 500);
            }
            Laya.Tween.to(letterText, { y: endY }, 500, Laya.Ease.elasticOut, null, i * 500);
        }
    }

    //创建缓动文字
    private createLetter(char:string):Laya.Text
    {
        var letter: Laya.Text = new Laya.Text();
        letter.text = char;
        letter.color = "#FFFFFF";
        letter.font = "Impact";
        letter.fontSize = 80;
        this.backgroundView.addChild(letter);
        return letter;
    }

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
