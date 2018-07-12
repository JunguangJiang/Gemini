
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui {
    export class GameViewUI extends View {
		public backgroundView:Laya.Image;
		public smallBallView:Laya.Image;
		public arrowView:Laya.Box;
		public bigBallView:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"x":40,"width":800,"height":600},"child":[{"type":"Image","props":{"y":-2019,"x":-90,"width":909,"var":"backgroundView","skin":"ui/background/BackGround .jpg","height":2618}},{"type":"Image","props":{"y":213,"x":304,"width":100,"var":"smallBallView","skin":"ui/star/1.png","height":100}},{"type":"Box","props":{"width":685,"visible":true,"var":"arrowView","scaleX":1,"pivotY":53,"pivotX":324,"height":111,"centerY":209,"centerX":-30},"child":[{"type":"Image","props":{"x":574,"width":70,"skin":"ui/arrow/right.png","pivotY":0,"pivotX":0,"name":"right","height":70}},{"type":"Image","props":{"width":70,"skin":"ui/arrow/left.png","name":"left","height":70}}]},{"type":"Image","props":{"y":351,"x":337,"var":"bigBallView","skin":"ui/star/10.png"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.GameViewUI.uiView);

        }

    }
}
