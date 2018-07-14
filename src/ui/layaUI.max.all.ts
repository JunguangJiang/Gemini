
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui {
    export class GameViewUI extends View {
		public runningView:Laya.Box;
		public backgroundView:Laya.Image;
		public smallBallView:Laya.Animation;
		public bigBallView:Laya.Animation;
		public arrowView:Laya.Box;
		public scoreView:Laya.Box;
		public levelView:laya.display.Text;

        public static  uiView:any ={"type":"View","props":{"y":0,"x":0,"width":800,"height":600},"child":[{"type":"Box","props":{"y":-2017,"x":0,"width":800,"var":"runningView","height":2617},"child":[{"type":"Image","props":{"y":0,"x":0,"width":800,"var":"backgroundView","skin":"ui/background/BackGround .jpg","height":2617}},{"type":"Animation","props":{"y":2582,"x":145,"var":"smallBallView","source":"GameAnimation/Ball.ani"}},{"type":"Animation","props":{"var":"bigBallView","source":"GameAnimation/Ball.ani"}}]},{"type":"Box","props":{"y":507,"x":385,"width":685,"visible":true,"var":"arrowView","scaleX":1,"pivotY":53,"pivotX":324,"height":111,"centerY":209,"centerX":3},"child":[{"type":"Image","props":{"x":574,"width":70,"skin":"ui/arrow/right.png","pivotY":0,"pivotX":0,"name":"right","height":70}},{"type":"Image","props":{"width":70,"skin":"ui/arrow/left.png","name":"left","height":70}}]},{"type":"Box","props":{"y":48,"x":593,"width":177,"visible":true,"var":"scoreView","height":64},"child":[{"type":"Clip","props":{"y":7,"x":126,"width":30,"skin":"ui/score/clip_number.png","name":"item3","height":40,"clipX":10}},{"type":"Clip","props":{"y":7,"x":82,"width":30,"skin":"ui/score/clip_number.png","name":"item2","height":40,"clipX":10}},{"type":"Clip","props":{"y":7,"x":37,"width":30,"skin":"ui/score/clip_number.png","name":"item1","index":0,"height":40,"clipX":10}},{"type":"Text","props":{"y":-21,"x":76,"width":92,"var":"levelView","text":"Level 1","strokeColor":"#16d225","italic":true,"height":25,"fontSize":25,"font":"SimHei","color":"#ee0d09","alpha":1,"align":"left"}}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.createView(ui.GameViewUI.uiView);

        }

    }
}
