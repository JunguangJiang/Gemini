
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui {
    export class EndViewUI extends View {
		public backgroundView:Laya.Image;
		public scoreView:Laya.Box;
		public startButton:Laya.Image;
		public rankButton:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"y":0,"x":0,"width":800,"height":600},"child":[{"type":"Image","props":{"y":0,"x":0,"width":800,"var":"backgroundView","skin":"ui/background/EndBackGround.jpg","height":600},"child":[{"type":"Box","props":{"y":150,"x":250,"width":300,"visible":false,"var":"scoreView","height":60},"child":[{"type":"Clip","props":{"y":16,"x":246,"width":30,"skin":"ui/score/clip_number.png","name":"item3","height":40,"clipX":10}},{"type":"Clip","props":{"y":16,"x":202,"width":30,"skin":"ui/score/clip_number.png","name":"item2","height":40,"clipX":10}},{"type":"Clip","props":{"y":16,"x":157,"width":30,"skin":"ui/score/clip_number.png","name":"item1","index":0,"height":40,"clipX":10}},{"type":"Text","props":{"y":15,"x":0,"width":150,"valign":"middle","text":"Score:","height":40,"fontSize":40,"font":"SimSun","color":"#ffff00","bold":true,"alpha":0.7,"align":"left"}}]},{"type":"Image","props":{"y":308,"x":60,"width":100,"var":"startButton","skin":"ui/button/SelectButton.png","height":100,"alpha":1},"child":[{"type":"Text","props":{"y":23,"x":24,"width":50,"text":"始","strokeColor":"#000000","overflow":"hidden","height":50,"fontSize":40,"font":"Microsoft YaHei","color":"#ffffff","bold":true,"align":"center"}}]},{"type":"Image","props":{"y":451,"x":61,"width":100,"var":"rankButton","skin":"ui/button/SelectButton.png","height":100},"child":[{"type":"Text","props":{"y":26,"x":24,"width":50,"text":"排","overflow":"hidden","height":50,"fontSize":40,"font":"Microsoft YaHei","color":"#ffffff","bold":true,"align":"center"}}]}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.createView(ui.EndViewUI.uiView);

        }

    }
}

module ui {
    export class GameViewUI extends View {
		public runningView:Laya.Box;
		public backgroundView:Laya.Image;
		public smallBallView:Laya.Animation;
		public bigBallView:Laya.Animation;
		public arrowView:Laya.Box;
		public scoreView:Laya.Box;
		public levelView:laya.display.Text;
		public soundButton:Laya.Image;
		public pauseButton:Laya.Image;
		public endButton:Laya.Image;
		public smallArrowView:Laya.Box;

        public static  uiView:any ={"type":"View","props":{"y":0,"x":0,"width":800,"height":600},"child":[{"type":"Box","props":{"y":-2017,"x":0,"width":800,"visible":true,"var":"runningView","height":2617},"child":[{"type":"Image","props":{"y":0,"x":0,"width":800,"var":"backgroundView","skin":"ui/background/BackGround .jpg","height":2617}},{"type":"Animation","props":{"y":2582,"x":145,"width":30,"var":"smallBallView","height":30}},{"type":"Animation","props":{"y":2568,"x":369,"width":50,"var":"bigBallView","height":50}}]},{"type":"Box","props":{"y":494,"x":389,"width":669,"visible":true,"var":"arrowView","scaleX":1,"pivotY":53,"pivotX":324,"height":105,"centerY":193,"centerX":5},"child":[{"type":"Image","props":{"x":574,"width":100,"skin":"ui/arrow/right.png","pivotY":0,"pivotX":0,"name":"right","height":100}},{"type":"Image","props":{"width":100,"skin":"ui/arrow/left.png","name":"left","height":100}}]},{"type":"Box","props":{"y":50,"x":600,"width":200,"visible":true,"var":"scoreView","height":60},"child":[{"type":"Clip","props":{"y":7,"x":126,"width":30,"skin":"ui/score/clip_number.png","name":"item3","height":40,"clipX":10}},{"type":"Clip","props":{"y":7,"x":82,"width":30,"skin":"ui/score/clip_number.png","name":"item2","height":40,"clipX":10}},{"type":"Clip","props":{"y":7,"x":37,"width":30,"skin":"ui/score/clip_number.png","name":"item1","index":0,"height":40,"clipX":10}},{"type":"Text","props":{"y":-23,"x":55,"width":92,"var":"levelView","text":"Level 1","strokeColor":"#16d225","italic":false,"height":25,"fontSize":25,"font":"SimHei","color":"#ebff08","bold":true,"alpha":1,"align":"center"}},{"type":"Image","props":{"y":0,"x":-165,"var":"soundButton","skin":"ui/button/SoundButton.png"}},{"type":"Image","props":{"y":0,"x":-100,"var":"pauseButton","skin":"ui/button/PauseButton.png"}},{"type":"Image","props":{"y":0,"x":-35,"var":"endButton","skin":"ui/button/EndButton.png"}}]},{"type":"Box","props":{"y":506,"x":605,"width":238,"visible":true,"var":"smallArrowView","scaleX":1,"pivotY":53,"pivotX":324,"height":98,"centerY":202,"centerX":14},"child":[{"type":"Image","props":{"y":0,"x":181,"width":70,"skin":"ui/arrow/right.png","pivotY":0,"pivotX":0,"name":"right","height":70}},{"type":"Image","props":{"y":0,"x":-20,"width":70,"skin":"ui/arrow/left.png","name":"left","height":70}}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.createView(ui.GameViewUI.uiView);

        }

    }
}

module ui {
    export class StartViewUI extends View {
		public backgroundView:Laya.Image;
		public onePlayerButton:Laya.Image;
		public twoPlayersButton:Laya.Image;
		public rankButton:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"y":0,"x":0,"width":800,"height":600},"child":[{"type":"Image","props":{"y":0,"x":0,"width":800,"var":"backgroundView","skin":"ui/background/StartBackGround.png","height":600},"child":[{"type":"Image","props":{"y":150,"x":150,"width":100,"var":"onePlayerButton","skin":"ui/button/SelectButton.png","height":100,"alpha":1},"child":[{"type":"Text","props":{"y":23,"x":24,"width":50,"text":"单","strokeColor":"#000000","overflow":"hidden","height":50,"fontSize":40,"font":"Microsoft YaHei","color":"#ffffff","bold":true,"align":"center"}}]},{"type":"Image","props":{"y":200,"x":500,"width":100,"var":"twoPlayersButton","skin":"ui/button/SelectButton.png","height":100},"child":[{"type":"Text","props":{"y":26,"x":24,"width":50,"text":"双","overflow":"hidden","height":50,"fontSize":40,"font":"Microsoft YaHei","color":"#ffffff","bold":true,"align":"center"}}]},{"type":"Image","props":{"y":450,"x":350,"width":100,"var":"rankButton","skin":"ui/button/SelectButton.png","height":100},"child":[{"type":"Text","props":{"y":23,"x":23,"width":50,"text":"排","overflow":"hidden","height":50,"fontSize":40,"font":"Microsoft YaHei","color":"#ffffff","bold":true,"align":"center"}}]}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.createView(ui.StartViewUI.uiView);

        }

    }
}
