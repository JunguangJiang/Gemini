var Game;
(function (Game) {
    Game.rewardPerUnitHeight = 1; //第一关中的单位奖励
    Game.heightDivision = 20; //第一关对总高度的一个划分
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
    //清空此前的高度
    ScoreIndicator.prototype.clearHeight = function () {
        this._rewardNum = 0;
    };
    //根据高度的变化记录奖励
    ScoreIndicator.prototype.updateHeight = function (height) {
        var newRewardNum = Math.floor(height / this._totalHeight * Game.heightDivision);
        if (newRewardNum > this._rewardNum) {
            this._data += Game.rewardPerUnitHeight * (newRewardNum - this._rewardNum);
            this._rewardNum = newRewardNum;
            this.updateUI();
        }
    };
    //接受奖励
    ScoreIndicator.prototype.getReward = function (reward) {
        this._data += reward;
        this.showScoreChange(reward);
        this.updateUI();
    };
    //接受惩罚
    ScoreIndicator.prototype.getPenalty = function (penalty) {
        this._data -= penalty;
        this.showScoreChange(-penalty);
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
    //更新计分器的UI界面
    ScoreIndicator.prototype.updateUI = function () {
        var data = {};
        var temp = this._data;
        for (var i = this._bitNum; i >= 1; i--) {
            data["item" + i] = { index: Math.floor(temp % 10) };
            temp /= 10;
        }
        this._box.dataSource = data;
    };
    //显示分数变化
    ScoreIndicator.prototype.showScoreChange = function (scoreChange) {
        var text;
        if (scoreChange > 0) {
            text = this._box.getChildByName("reward");
            text.text = "+" + scoreChange;
        }
        else {
            text = this._box.getChildByName("penalty");
            text.text = "" + scoreChange;
        }
        text.scaleX = text.scaleY = 0.2;
        Laya.Tween.to(text, { scaleX: 1, scaleY: 1 }, 1000, Laya.Ease.backOut); //分数变化以弹出的方式显示
        Laya.timer.once(2000, this, this.closeScoreChange, [scoreChange], false); //经过2s后消失
    };
    //关闭分数变化的显示
    ScoreIndicator.prototype.closeScoreChange = function (scoreChange) {
        if (scoreChange > 0) {
            var text = this._box.getChildByName("reward");
            text.text = "";
        }
        else {
            var text = this._box.getChildByName("penalty");
            text.text = "";
        }
    };
    return ScoreIndicator;
}());
//# sourceMappingURL=ScoreIndicator.js.map