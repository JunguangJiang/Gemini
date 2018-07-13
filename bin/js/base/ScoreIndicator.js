var Game;
(function (Game) {
    Game.rewardPerUnitHeight = 1; //第一关中的单位奖励
    Game.heightDivision = 100; //第一关对总高度的一个划分
})(Game || (Game = {}));
//双子游戏的计分器
var ScoreIndicator = /** @class */ (function () {
    function ScoreIndicator(box, bitNum, totalHeight, initialValue) {
        this._data = initialValue;
        this._box = box;
        this._box.visible = true;
        this._bitNum = bitNum;
        this._totalHeight = totalHeight;
        this._rewardNum = 0;
        this.updateUI();
    }
    //根据高度的变化记录奖励
    ScoreIndicator.prototype.updateHeight = function (height) {
        console.log("height=" + height);
        var newRewardNum = Math.floor(height / this._totalHeight * Game.heightDivision);
        console.log("newRewardNum=" + newRewardNum);
        if (newRewardNum > this._rewardNum) {
            this._data += Game.rewardPerUnitHeight * (newRewardNum - this._rewardNum);
            this._rewardNum = newRewardNum;
            this.updateUI();
        }
    };
    //接受惩罚
    ScoreIndicator.prototype.getPenalty = function (penalty) {
        this._data -= penalty;
        this.updateUI();
    };
    Object.defineProperty(ScoreIndicator.prototype, "data", {
        //获取当前的分数
        get: function () {
            return this._data;
        },
        enumerable: true,
        configurable: true
    });
    ScoreIndicator.prototype.updateUI = function () {
        var data = {};
        var temp = this._data;
        for (var i = this._bitNum; i >= 1; i--) {
            data["item" + i] = { index: Math.floor(temp % 10) };
            temp /= 10;
        }
        this._box.dataSource = data;
        console.log("当前分数为" + this._data);
    };
    return ScoreIndicator;
}());
//# sourceMappingURL=ScoreIndicator.js.map