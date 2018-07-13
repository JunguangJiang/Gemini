namespace Game{
    export const rewardPerUnitHeight:number = 1;//第一关中的单位奖励
    export const heightDivision:number = 100;//第一关对总高度的一个划分
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

    //根据高度的变化记录奖励
    updateHeight(height:number):void{
        console.log("height="+height);
        let newRewardNum: number = Math.floor(height/this._totalHeight*Game.heightDivision);
        console.log("newRewardNum="+newRewardNum);
        if(newRewardNum > this._rewardNum){
            this._data += Game.rewardPerUnitHeight * (newRewardNum - this._rewardNum);
            this._rewardNum = newRewardNum;
            this.updateUI();
        }
    }

    //接受惩罚
    getPenalty(penalty: number){
        this._data -= penalty;
        this.updateUI();
    }

    //获取当前的分数
    get data():number{
        return this._data;
    }

    updateUI():void{
        let data:any = {}
        let temp:number = this._data;
        for(let i:number=this._bitNum; i>=1; i--){
            data["item"+i] = {index:Math.floor(temp%10)};
            temp /= 10;
        }
        this._box.dataSource = data;
        console.log("当前分数为"+this._data);
    }
}