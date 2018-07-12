//一对箭头
class Arrow{
    private _arrows:Array<Laya.Image>;//存储左右箭头的图片
    private _touchStart:Laya.Handler;//当触摸开始时调用
    private _touchEnd:Laya.Handler;//当触摸结束时调用

    constructor(left: Laya.Image, right: Laya.Image, 
    touchStart:Laya.Handler, touchEnd:Laya.Handler
    ){
        this._arrows = new Array<Laya.Image>(2);
        this._arrows[0] = left;
        this._arrows[1] = right;
        this._touchStart = touchStart;
        this._touchEnd = touchEnd;

        for(let i:number=0; i<2; i++){
            this._arrows[i].visible = true;
            this._arrows[i].on(Laya.Event.MOUSE_DOWN, this, this.onMouseDown, [i]);
            this._arrows[i].on(Laya.Event.MOUSE_UP, this, this.onMouseUp, [i]);
        }
    }

    //当触摸到箭头时触发
    onMouseDown(type:number):void{
        this._touchStart.runWith({
            type:type===0?"left":"right"
        });
    }

    //当不再触摸箭头时触发
    onMouseUp(type:number):void{
        this._touchEnd.runWith({
            type:type===0?"left":"right"
        });
    }

    //经过一定时间后可以将箭头隐藏
}