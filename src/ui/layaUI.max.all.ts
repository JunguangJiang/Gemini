
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui {
    export class GameViewUI extends View {
		public runningView:Laya.Box;
		public backgroundView:Laya.Image;
		public smallBallView:Laya.Image;
		public bigBallView:Laya.Image;
		public arrowView:Laya.Box;
		public scoreView:Laya.Box;
		public levelView:laya.display.Text;

        public static  uiView:any ={"type":"View","props":{"y":0,"x":0,"width":800,"height":600},"child":[{"type":"Box","props":{"y":-2017,"x":0,"width":800,"var":"runningView","height":2617},"child":[{"type":"Image","props":{"y":0,"x":0,"width":800,"var":"backgroundView","skin":"ui/background/BackGround .jpg","height":2617}},{"type":"Image","props":{"y":2582,"x":145,"width":30,"visible":true,"var":"smallBallView","skin":"ui/star/1.png","height":30}},{"type":"Image","props":{"y":2568,"x":369,"width":50,"visible":true,"var":"bigBallView","skin":"ui/star/10.png","height":50}}]},{"type":"Box","props":{"y":507,"x":385,"width":685,"visible":true,"var":"arrowView","scaleX":1,"pivotY":53,"pivotX":324,"height":111,"centerY":209,"centerX":3},"child":[{"type":"Image","props":{"x":574,"width":70,"skin":"ui/arrow/right.png","pivotY":0,"pivotX":0,"name":"right","height":70}},{"type":"Image","props":{"width":70,"skin":"ui/arrow/left.png","name":"left","height":70}}]},{"type":"Box","props":{"y":-2,"x":618,"width":177,"visible":true,"var":"scoreView","height":64},"child":[{"type":"Clip","props":{"y":7,"x":126,"width":30,"skin":"ui/score/clip_number.png","name":"item3","height":40,"clipX":10}},{"type":"Clip","props":{"y":7,"x":82,"width":30,"skin":"ui/score/clip_number.png","name":"item2","height":40,"clipX":10}},{"type":"Clip","props":{"y":7,"x":37,"width":30,"skin":"ui/score/clip_number.png","name":"item1","index":0,"height":40,"clipX":10}}]},{"type":"Text","props":{"y":-28,"x":628,"width":140,"var":"levelView","text":"Level 1","italic":true,"height":46,"fontSize":25,"font":"SimHei","color":"#f92c04","bold":true,"align":"right"}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.createView(ui.GameViewUI.uiView);

        }

    }
}
