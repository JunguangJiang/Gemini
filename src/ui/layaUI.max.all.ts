
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

        public static  uiView:any ={"type":"View","props":{"y":0,"x":0,"width":800,"height":600},"child":[{"type":"Box","props":{"y":-2017,"x":0,"width":800,"var":"runningView","height":2617},"child":[{"type":"Image","props":{"y":0,"x":0,"width":800,"var":"backgroundView","skin":"ui/background/BackGround .jpg","height":2617}},{"type":"Animation","props":{"y":2582,"x":145,"width":30,"var":"smallBallView","height":30}},{"type":"Animation","props":{"y":2568,"x":369,"width":50,"var":"bigBallView","height":50}}]},{"type":"Box","props":{"y":507,"x":385,"width":685,"visible":true,"var":"arrowView","scaleX":1,"pivotY":53,"pivotX":324,"height":111,"centerY":209,"centerX":3},"child":[{"type":"Image","props":{"x":574,"width":70,"skin":"ui/arrow/right.png","pivotY":0,"pivotX":0,"name":"right","height":70}},{"type":"Image","props":{"width":70,"skin":"ui/arrow/left.png","name":"left","height":70}}]},{"type":"Box","props":{"y":48,"x":593,"width":177,"visible":true,"var":"scoreView","height":64},"child":[{"type":"Clip","props":{"y":7,"x":126,"width":30,"skin":"ui/score/clip_number.png","name":"item3","height":40,"clipX":10}},{"type":"Clip","props":{"y":7,"x":82,"width":30,"skin":"ui/score/clip_number.png","name":"item2","height":40,"clipX":10}},{"type":"Clip","props":{"y":7,"x":37,"width":30,"skin":"ui/score/clip_number.png","name":"item1","index":0,"height":40,"clipX":10}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.GameViewUI.uiView);

        }

    }
}

module ui {
    export class StartViewUI extends View {
		public backgroundView:Laya.Image;
		public startButtonView:Laya.Image;
		public rankButtonView:Laya.Image;
		public saveButtonView:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"y":0,"x":0,"width":800,"height":600},"child":[{"type":"Image","props":{"y":0,"x":0,"width":800,"var":"backgroundView","skin":"ui/background/StartBackGround.png","height":600},"child":[{"type":"Image","props":{"y":150,"x":150,"width":100,"var":"startButtonView","skin":"ui/button/1.png","height":100,"alpha":1},"child":[{"type":"Text","props":{"y":23,"x":24,"width":50,"text":"启","strokeColor":"#000000","overflow":"hidden","height":50,"fontSize":40,"font":"Microsoft YaHei","color":"#ffffff","bold":true,"align":"center"}}]},{"type":"Image","props":{"y":200,"x":500,"width":100,"var":"rankButtonView","skin":"ui/button/1.png","height":100},"child":[{"type":"Text","props":{"y":26,"x":24,"width":50,"text":"排","overflow":"hidden","height":50,"fontSize":40,"font":"Microsoft YaHei","color":"#ffffff","bold":true,"align":"center"}}]},{"type":"Image","props":{"y":450,"x":350,"width":100,"var":"saveButtonView","skin":"ui/button/1.png","height":100},"child":[{"type":"Text","props":{"y":23,"x":23,"width":50,"text":"存","overflow":"hidden","height":50,"fontSize":40,"font":"Microsoft YaHei","color":"#ffffff","bold":true,"align":"center"}}]}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.createView(ui.StartViewUI.uiView);

        }

    }
}
