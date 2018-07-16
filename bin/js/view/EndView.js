var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
//游戏的一些参数
var Game;
(function (Game) {
    Game.score = 0; //玩家得分
})(Game || (Game = {}));
//游戏的结束界面
var EndView = /** @class */ (function (_super) {
    __extends(EndView, _super);
    //构造函数
    function EndView() {
        var _this = _super.call(this) || this;
        _this.loadImage(Game.endBackGroundImage);
        return _this;
    }
    //结束界面还原初始化设置
    EndView.prototype.init = function () {
        //避免下次到结束界面时显示分数
        this.scoreView.visible = false;
        //去掉已有的结束字样
        while (this.removeChildByName("endText"))
            ;
    };
    //显示失败的缓动动画
    EndView.prototype.showEnd = function () {
        var textWidth = 300;
        var offset = this.backgroundView.width - textWidth >> 1;
        var endY = 50;
        var endText = "GAMEOVER";
        for (var i = 0, len = endText.length; i < len; ++i) {
            var letterText = this.createLetter(endText.charAt(i));
            letterText.name = "endText";
            this.addChild(letterText);
            letterText.x = textWidth / len * i + offset;
            letterText.y = -300;
            if (i === len - 1) //最后一个字母之后调用回调函数
             {
                Laya.Tween.to(letterText, { y: endY }, 400, Laya.Ease.elasticOut, Laya.Handler.create(this, this.showScore), i * 400);
            }
            Laya.Tween.to(letterText, { y: endY }, 400, Laya.Ease.elasticOut, null, i * 400);
        }
    };
    //创建缓动文字
    EndView.prototype.createLetter = function (char) {
        var letter = new Laya.Text();
        letter.text = char;
        letter.color = "#FFFFFF";
        letter.font = "Impact";
        letter.fontSize = 40;
        this.backgroundView.addChild(letter);
        return letter;
    };
    EndView.prototype.showScore = function () {
        var data = {};
        var temp = Game.score;
        for (var i = 3; i >= 1; i--) {
            data["item" + i] = { index: Math.floor(temp % 10) };
            temp /= 10;
        }
        this.scoreView.dataSource = data;
        this.scoreView.visible = true;
    };
    return EndView;
}(ui.EndViewUI));
//# sourceMappingURL=EndView.js.map