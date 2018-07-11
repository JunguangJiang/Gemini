// 程序入口
class GameMain{
    constructor()
    {
        Laya.MiniAdpter.init();
        Laya.init(800,600);
        //设置屏幕自动平铺和旋转
        Laya.stage.scaleMode = Laya.Stage.SCALE_EXACTFIT;
        Laya.stage.screenMode = Laya.Stage.SCREEN_HORIZONTAL;    
    }
}
new GameMain();