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
//游戏的开始界面
var StartView = /** @class */ (function (_super) {
    __extends(StartView, _super);
    //构造函数
    function StartView() {
        var _this = _super.call(this) || this;
        _this.init();
        return _this;
    }
    //初始化开始界面
    StartView.prototype.init = function () {
        this.buttonsManagement.visible = true;
        this.buttonsManagement.mouseEnabled = true;
        this.levelSelectedBox.visible = false;
        this.levelSelectedBox.mouseEnabled = false;
        this.levelSelectedBox.selectedIndex = -1;
        this.createEvents();
    };
    StartView.prototype.createEvents = function () {
        //开始界面单人的开始按钮
        this.onePlayerButton.on(Laya.Event.MOUSE_MOVE, this, function () {
            this.onePlayerButton.scale(1.1, 1.1);
        });
        this.onePlayerButton.on(Laya.Event.MOUSE_OUT, this, function () {
            this.onePlayerButton.scale(1, 1);
        });
        this.onePlayerButton.on(Laya.Event.CLICK, this, function () {
            this.levelSelectedBox.visible = true;
            this.levelSelectedBox.mouseEnabled = true;
            this.buttonsManagement.visible = false;
            this.buttonsManagement.mouseEnabled = false;
            Game.playerNum = 1;
        });
        //开始界面双人的开始按钮
        this.twoPlayersButton.on(Laya.Event.MOUSE_MOVE, this, function () {
            this.twoPlayersButton.scale(1.1, 1.1);
        });
        this.twoPlayersButton.on(Laya.Event.MOUSE_OUT, this, function () {
            this.twoPlayersButton.scale(1, 1);
        });
        this.twoPlayersButton.on(Laya.Event.CLICK, this, function () {
            this.levelSelectedBox.visible = true;
            this.levelSelectedBox.mouseEnabled = true;
            this.buttonsManagement.visible = false;
            this.buttonsManagement.mouseEnabled = false;
            Game.playerNum = 2;
        });
    };
    return StartView;
}(ui.StartViewUI));
//# sourceMappingURL=StartView.js.map