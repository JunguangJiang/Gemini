
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui {
    export class EndViewUI extends View {
		public backgroundView:Laya.Image;
		public startButton:Laya.Image;
		public scoreView:Laya.Box;
		public levelView:Laya.Box;

        public static  uiView:any ={"type":"View","props":{"y":0,"x":0,"width":800,"height":600},"child":[{"type":"Image","props":{"y":0,"x":0,"width":800,"var":"backgroundView","skin":"ui/background/EndBackGround.jpg","mouseThrough":true,"height":600,"disabled":false},"child":[{"type":"Image","props":{"y":376,"x":66,"width":100,"visible":true,"var":"startButton","skin":"ui/button/SelectButton.png","mouseEnabled":true,"hitTestPrior":true,"height":100,"disabled":false,"alpha":1},"child":[{"type":"Text","props":{"y":23,"x":24,"width":50,"text":"始","strokeColor":"#000000","overflow":"hidden","height":50,"fontSize":40,"font":"Microsoft YaHei","color":"#ffffff","bold":true,"align":"center"}}]},{"type":"Box","props":{"y":190,"x":250,"width":300,"visible":false,"var":"scoreView","height":60},"child":[{"type":"Clip","props":{"y":16,"x":246,"width":30,"skin":"ui/else/clip_number.png","name":"item3","height":40,"clipX":10}},{"type":"Clip","props":{"y":16,"x":202,"width":30,"skin":"ui/else/clip_number.png","name":"item2","height":40,"clipX":10}},{"type":"Clip","props":{"y":16,"x":157,"width":30,"skin":"ui/else/clip_number.png","name":"item1","index":0,"height":40,"clipX":10}},{"type":"Text","props":{"y":15,"x":0,"width":150,"valign":"middle","text":"Score:","height":40,"fontSize":40,"font":"SimSun","color":"#ffff00","bold":true,"alpha":0.7,"align":"left"}}]},{"type":"Box","props":{"y":130,"x":250,"width":300,"visible":false,"var":"levelView","height":60},"child":[{"type":"Clip","props":{"y":16,"x":246,"width":30,"skin":"ui/else/clip_number.png","name":"item3","height":40,"clipX":10}},{"type":"Clip","props":{"y":16,"x":202,"width":30,"skin":"ui/else/clip_number.png","name":"item2","height":40,"clipX":10}},{"type":"Clip","props":{"y":16,"x":157,"width":30,"skin":"ui/else/clip_number.png","name":"item1","index":0,"height":40,"clipX":10}},{"type":"Text","props":{"y":15,"x":0,"width":150,"valign":"middle","text":"Level:","height":40,"fontSize":40,"font":"SimSun","color":"#ffff00","bold":true,"alpha":0.7,"align":"left"}}]}]}]};
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
		public settingButton:Laya.Image;
		public pauseButton:Laya.Image;
		public soundButton:Laya.Image;
		public endButton:Laya.Image;
		public smallArrowView:Laya.Box;
		public tipsView:laya.display.Text;

        public static  uiView:any ={"type":"View","props":{"y":0,"x":0,"width":800,"height":600},"child":[{"type":"Box","props":{"y":-2017,"x":0,"width":800,"visible":true,"var":"runningView","height":2617},"child":[{"type":"Image","props":{"y":0,"x":0,"width":800,"var":"backgroundView","skin":"ui/background/BackGround .jpg","height":2617}},{"type":"Animation","props":{"y":2582,"x":145,"width":30,"var":"smallBallView","height":30}},{"type":"Animation","props":{"y":2568,"x":369,"width":50,"var":"bigBallView","height":50}}]},{"type":"Box","props":{"width":666,"visible":true,"var":"arrowView","scaleX":1,"pivotY":53,"pivotX":324,"height":113,"centerY":193,"centerX":5},"child":[{"type":"Image","props":{"x":574,"width":100,"visible":true,"skin":"ui/else/right.png","pivotY":0,"pivotX":0,"name":"rightShow","height":100,"alpha":0.1}},{"type":"Image","props":{"width":100,"visible":true,"skin":"ui/else/left.png","name":"leftShow","height":100,"alpha":0.1}},{"type":"Image","props":{"y":-180,"x":480,"width":240,"visible":true,"skin":"ui/else/right.png","name":"right","height":330,"alpha":0}},{"type":"Image","props":{"y":-180,"x":-63,"width":240,"visible":true,"skin":"ui/else/left.png","name":"left","height":330,"alpha":0}}]},{"type":"Box","props":{"y":50,"x":600,"width":200,"visible":true,"var":"scoreView","height":60},"child":[{"type":"Clip","props":{"y":7,"x":126,"width":30,"skin":"ui/else/clip_number.png","name":"item3","height":40,"clipX":10}},{"type":"Clip","props":{"y":7,"x":82,"width":30,"skin":"ui/else/clip_number.png","name":"item2","height":40,"clipX":10}},{"type":"Clip","props":{"y":7,"x":37,"width":30,"skin":"ui/else/clip_number.png","name":"item1","index":0,"height":40,"clipX":10}},{"type":"Text","props":{"y":-23,"x":60,"width":92,"var":"levelView","text":"Level 1","strokeColor":"#16d225","italic":true,"height":25,"fontSize":25,"font":"Impact","color":"#ff2f08","bold":false,"alpha":0.5,"align":"center"}},{"type":"Image","props":{"y":0,"x":-30,"width":50,"var":"settingButton","skin":"ui/button/SettingButton.png","height":50,"alpha":0.5},"child":[{"type":"Image","props":{"y":140,"x":0,"width":50,"visible":false,"var":"pauseButton","skin":"ui/button/PauseButton.png","height":50,"disabled":true}},{"type":"Image","props":{"y":70,"x":0,"width":50,"visible":false,"var":"soundButton","skin":"ui/button/NoSoundButton.png","height":50,"disabled":true}},{"type":"Image","props":{"y":210,"x":0,"width":50,"visible":false,"var":"endButton","skin":"ui/button/EndButton.png","height":50,"disabled":true}}]},{"type":"Text","props":{"y":48,"x":35,"strokeColor":"#f4720b","stroke":2,"name":"penalty","fontSize":50,"font":"ChalkBoard","color":"#f82e08"}},{"type":"Text","props":{"y":46,"x":97,"strokeColor":"#08bc83","stroke":2,"name":"reward","fontSize":50,"font":"ChalkBoard","color":"#08f824"}}]},{"type":"Box","props":{"y":506,"x":605,"width":238,"visible":true,"var":"smallArrowView","scaleX":1,"pivotY":53,"pivotX":324,"height":98,"centerY":202,"centerX":14},"child":[{"type":"Image","props":{"y":0,"x":181,"width":70,"visible":true,"skin":"ui/else/right.png","pivotY":0,"pivotX":0,"name":"rightShow","height":70,"alpha":0.1}},{"type":"Image","props":{"y":0,"x":-20,"width":70,"visible":true,"skin":"ui/else/left.png","name":"leftShow","height":70,"alpha":0.1}},{"type":"Image","props":{"y":-35,"x":135,"width":180,"visible":true,"skin":"ui/else/right.png","name":"right","height":180,"alpha":0}},{"type":"Image","props":{"y":-35,"x":-65,"width":180,"visible":true,"skin":"ui/else/left.png","name":"left","height":180,"alpha":0}}]},{"type":"Text","props":{"y":25,"x":48,"var":"tipsView","text":"目标：升到最高处~","strokeColor":"#f86f04","stroke":2,"italic":false,"fontSize":30,"font":"Microsoft YaHei","alpha":0.5}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.createView(ui.GameViewUI.uiView);

        }

    }
}

module ui {
    export class HelpViewUI extends Dialog {
		public returnButton:Laya.Image;
		public contentImage:Laya.Image;
		public contentImageMask:Laya.Sprite;

        public static  uiView:any ={"type":"Dialog","props":{"width":800,"height":600},"child":[{"type":"Image","props":{"y":125,"x":742,"var":"returnButton","skin":"ui/button/EndButton.png","hitTestPrior":true,"alpha":0.5}},{"type":"Image","props":{"y":100,"x":50,"width":700,"skin":"ui/background/HelpBackGround .jpg","height":450},"child":[{"type":"Image","props":{"y":30,"x":40,"var":"contentImage","skin":"ui/background/ContentImage.png","scaleY":1,"scaleX":1,"mouseThrough":true,"hitTestPrior":false},"child":[{"type":"Sprite","props":{"y":0,"x":0,"width":620,"var":"contentImageMask","renderType":"mask","mouseEnabled":false,"height":376},"child":[{"type":"Rect","props":{"y":0,"x":0,"width":620,"lineWidth":1,"height":379,"fillColor":"#ff0000"}}]}]}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.HelpViewUI.uiView);

        }

    }
}

module ui {
    export class StartViewUI extends View {
		public backgroundView:Laya.Image;
		public onePlayerButton:Laya.Image;
		public twoPlayersButton:Laya.Image;
		public helpButton:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"y":0,"x":0,"width":800,"height":600},"child":[{"type":"Image","props":{"y":0,"x":0,"width":800,"var":"backgroundView","skin":"ui/background/StartBackGround.png","height":600},"child":[{"type":"Image","props":{"y":150,"x":150,"width":100,"var":"onePlayerButton","skin":"ui/button/SelectButton.png","height":100,"alpha":1},"child":[{"type":"Text","props":{"y":23,"x":24,"width":50,"text":"单","strokeColor":"#000000","overflow":"hidden","height":50,"fontSize":40,"font":"Microsoft YaHei","color":"#ffffff","bold":true,"align":"center"}}]},{"type":"Image","props":{"y":200,"x":500,"width":100,"var":"twoPlayersButton","skin":"ui/button/SelectButton.png","height":100},"child":[{"type":"Text","props":{"y":26,"x":24,"width":50,"text":"双","overflow":"hidden","height":50,"fontSize":40,"font":"Microsoft YaHei","color":"#ffffff","bold":true,"align":"center"}}]},{"type":"Image","props":{"y":450,"x":350,"width":100,"var":"helpButton","skin":"ui/button/SelectButton.png","height":100},"child":[{"type":"Text","props":{"y":23,"x":23,"width":50,"text":"帮","overflow":"hidden","height":50,"fontSize":40,"font":"Microsoft YaHei","color":"#ffffff","bold":true,"align":"center"}}]}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.createView(ui.StartViewUI.uiView);

        }

    }
}
