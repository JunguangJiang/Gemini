//一对箭头
class Arrow{
    private _arrows:Array<Laya.Image>;//存储左右箭头的图片
    private _touchCalledBack:Laya.Handler;//当完成一次触摸后调用该函数
    private _lastingTime;//触摸的持续时间

    constructor(left: Laya.Image, right: Laya.Image, touchCalledBack: Laya.Handler){
        this._lastingTime = 0;
        this._arrows = new Array<Laya.Image>(2);
        this._arrows[0] = left;
        this._arrows[1] = right;
        this._touchCalledBack = touchCalledBack;

        for(let i:number=0; i<2; i++){
            this._arrows[i].visible = true;
            this._arrows[i].on(Laya.Event.MOUSE_DOWN, this, this.onMouseDown, [i]);
            this._arrows[i].on(Laya.Event.MOUSE_UP, this, this.onMouseUp, [i]);
        }
    }

    //当触摸到箭头时触发
    onMouseDown(type:number):void{
    }

    //当不再触摸箭头时触发
    onMouseUp(type:number):void{
        this._touchCalledBack.runWith(this._lastingTime);//触摸完成时，返回触摸的持续时间
    }

    //经过一定时间后可以将箭头隐藏
}