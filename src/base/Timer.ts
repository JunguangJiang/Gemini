//计时器类
class Timer{
    private _oldTime: number;
    constructor(){
        this.start();
    }
    //开始计时
    start():void{
        this._oldTime = new Date().getTime();
    }
    //获得从上次计时开始后所经过的时间
    get(): number{
        return new Date().getTime() - this._oldTime;
    }
}