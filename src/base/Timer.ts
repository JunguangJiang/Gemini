//计时器类
class Timer{
    private _oldTime: number;//开始计时的时刻
    private _stockTime: number;//库存的时间，用于累加
    private _isRunning: boolean;//计时器正在计时

    constructor(){
        this._stockTime = 0;
        this.start();
    }

    //开始计时
    start():void{
        this._isRunning = true;
        this._oldTime = new Date().getTime();
    }

    //获得从上次计时开始后所经过的时间
    get(): number{
        if(this._isRunning){
            this.pause();
            this.start();
        }
        return this._stockTime;
    }

    //暂停
    pause():void{
        if(this._isRunning){
            this._stockTime += (new Date().getTime() - this._oldTime);
            this._isRunning = false;
        }
    }

    //停止
    stop():void{
        this._isRunning = false;
        this._stockTime = 0;
    }
}