namespace Game{
    export const rewardPerUnitHeight:number = 1;//第一关中的单位奖励
    export const heightDivision:number = 20;//第一关对总高度的一个划分
}

//双子游戏的计分器
class ScoreIndicator{
    private _data:number;//当前分数大小
    private _box: Laya.Box;//图像
    private _bitNum: number;//分数位数

    private _rewardNum: number;//奖励次数，奖励=奖励次数 x unitReward
    private _totalHeight: number;//总高度

    constructor(box: Laya.Box, bitNum: number, totalHeight:number, initialValue:number){
        this._data = initialValue;
        this._box = box;
        this._box.visible = true;
        this._bitNum = bitNum;
        this._totalHeight = totalHeight;
        this._rewardNum = 0;
        this.updateUI();
    }

    //清空此前的高度
    clearHeight():void{
        this._rewardNum = 0;
    }

    //根据高度的变化记录奖励
    updateHeight(height:number):void{
        let newRewardNum: number = Math.floor(height/this._totalHeight*Game.heightDivision);
        if(newRewardNum > this._rewardNum){
            this._data += Game.rewardPerUnitHeight * (newRewardNum - this._rewardNum);
            this._rewardNum = newRewardNum;
            this.updateUI();
        }
    }

    //接受奖励
    getReward(reward: number){
        this._data += reward;
        this.showScoreChange(reward);
        this.updateUI();
    }

    //接受惩罚
    getPenalty(penalty: number){
        this._data -= penalty;
        this.showScoreChange(-penalty);
        this.updateUI();
    }

    //获取当前的分数
    get data():number{
        return this._data;
    }

    //更新计分器的UI界面
    updateUI():void{
        let data:any = {}
        let temp:number = this._data;
        for(let i:number=this._bitNum; i>=1; i--){
            data["item"+i] = {index:Math.floor(temp%10)};
            temp /= 10;
        }
        this._box.dataSource = data;
    }

    //显示分数变化
    showScoreChange(scoreChange:number):void{
        let text :Laya.Text;
        if(scoreChange > 0){
            text = this._box.getChildByName("reward") as Laya.Text;
            text.text = "+"+scoreChange;
        }else{
            text = this._box.getChildByName("penalty") as Laya.Text;
            text.text = ""+scoreChange;
        }
        text.scaleX = text.scaleY = 0.2;
        Laya.Tween.to(text, {scaleX:1, scaleY:1}, 1000, Laya.Ease.backOut);//分数变化以弹出的方式显示
        Laya.timer.once(2000, this, this.closeScoreChange, [scoreChange], false);//经过2s后消失
    }

    //关闭分数变化的显示
    closeScoreChange(scoreChange:number):void{
        if(scoreChange > 0){
            let text: Laya.Text = this._box.getChildByName("reward") as Laya.Text;
            text.text = "";
        }else{
            let text: Laya.Text = this._box.getChildByName("penalty") as Laya.Text;
            text.text = "";
        }
    }
}