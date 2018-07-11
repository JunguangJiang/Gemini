// 程序入口
var GameMain = /** @class */ (function () {
    function GameMain() {
        Laya.MiniAdpter.init();
        Laya.init(800, 600);
        //设置屏幕自动平铺和旋转
        Laya.stage.scaleMode = Laya.Stage.SCALE_EXACTFIT;
        Laya.stage.screenMode = Laya.Stage.SCREEN_HORIZONTAL;
    }
    return GameMain;
}());
new GameMain();
//# sourceMappingURL=GameMain.js.map