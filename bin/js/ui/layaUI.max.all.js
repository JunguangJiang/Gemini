var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var View = laya.ui.View;
var Dialog = laya.ui.Dialog;
var ui;
(function (ui) {
    var EndViewUI = /** @class */ (function (_super) {
        __extends(EndViewUI, _super);
        function EndViewUI() {
            return _super.call(this) || this;
        }
        EndViewUI.prototype.createChildren = function () {
            View.regComponent("Text", laya.display.Text);
            _super.prototype.createChildren.call(this);
            this.createView(ui.EndViewUI.uiView);
        };
        EndViewUI.uiView = { "type": "View", "props": { "y": 0, "x": 0, "width": 800, "height": 600 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 800, "var": "backgroundView", "skin": "ui/background/EndBackGround.jpg", "mouseThrough": true, "height": 600, "disabled": false }, "child": [{ "type": "Image", "props": { "y": 430, "x": 50, "width": 100, "visible": true, "var": "rankButton", "skin": "ui/button/SelectButton.png", "mouseEnabled": true, "hitTestPrior": true, "height": 100, "disabled": false }, "child": [{ "type": "Text", "props": { "y": 26, "x": 24, "width": 50, "text": "排", "overflow": "hidden", "height": 50, "fontSize": 40, "font": "Microsoft YaHei", "color": "#ffffff", "bold": true, "align": "center" } }] }, { "type": "Image", "props": { "y": 300, "x": 50, "width": 100, "visible": true, "var": "startButton", "skin": "ui/button/SelectButton.png", "mouseEnabled": true, "hitTestPrior": true, "height": 100, "disabled": false, "alpha": 1 }, "child": [{ "type": "Text", "props": { "y": 23, "x": 24, "width": 50, "text": "始", "strokeColor": "#000000", "overflow": "hidden", "height": 50, "fontSize": 40, "font": "Microsoft YaHei", "color": "#ffffff", "bold": true, "align": "center" } }] }, { "type": "Box", "props": { "y": 150, "x": 250, "width": 300, "visible": false, "var": "scoreView", "height": 60 }, "child": [{ "type": "Clip", "props": { "y": 16, "x": 246, "width": 30, "skin": "ui/else/clip_number.png", "name": "item3", "height": 40, "clipX": 10 } }, { "type": "Clip", "props": { "y": 16, "x": 202, "width": 30, "skin": "ui/else/clip_number.png", "name": "item2", "height": 40, "clipX": 10 } }, { "type": "Clip", "props": { "y": 16, "x": 157, "width": 30, "skin": "ui/else/clip_number.png", "name": "item1", "index": 0, "height": 40, "clipX": 10 } }, { "type": "Text", "props": { "y": 15, "x": 0, "width": 150, "valign": "middle", "text": "Score:", "height": 40, "fontSize": 40, "font": "SimSun", "color": "#ffff00", "bold": true, "alpha": 0.7, "align": "left" } }] }] }] };
        return EndViewUI;
    }(View));
    ui.EndViewUI = EndViewUI;
})(ui || (ui = {}));
(function (ui) {
    var GameViewUI = /** @class */ (function (_super) {
        __extends(GameViewUI, _super);
        function GameViewUI() {
            return _super.call(this) || this;
        }
        GameViewUI.prototype.createChildren = function () {
            View.regComponent("Text", laya.display.Text);
            _super.prototype.createChildren.call(this);
            this.createView(ui.GameViewUI.uiView);
        };
        GameViewUI.uiView = { "type": "View", "props": { "y": 0, "x": 0, "width": 800, "height": 600 }, "child": [{ "type": "Box", "props": { "y": -2017, "x": 0, "width": 800, "visible": true, "var": "runningView", "height": 2617 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 800, "var": "backgroundView", "skin": "ui/background/BackGround .jpg", "height": 2617 } }, { "type": "Animation", "props": { "y": 2582, "x": 145, "width": 30, "var": "smallBallView", "height": 30 } }, { "type": "Animation", "props": { "y": 2568, "x": 369, "width": 50, "var": "bigBallView", "height": 50 } }] }, { "type": "Box", "props": { "y": 494, "x": 389, "width": 669, "visible": true, "var": "arrowView", "scaleX": 1, "pivotY": 53, "pivotX": 324, "height": 105, "centerY": 193, "centerX": 5 }, "child": [{ "type": "Image", "props": { "x": 574, "width": 100, "skin": "ui/else/right.png", "pivotY": 0, "pivotX": 0, "name": "right", "height": 100 } }, { "type": "Image", "props": { "width": 100, "skin": "ui/else/left.png", "name": "left", "height": 100 } }] }, { "type": "Box", "props": { "y": 50, "x": 600, "width": 200, "visible": true, "var": "scoreView", "height": 60 }, "child": [{ "type": "Clip", "props": { "y": 7, "x": 126, "width": 30, "skin": "ui/else/clip_number.png", "name": "item3", "height": 40, "clipX": 10 } }, { "type": "Clip", "props": { "y": 7, "x": 82, "width": 30, "skin": "ui/else/clip_number.png", "name": "item2", "height": 40, "clipX": 10 } }, { "type": "Clip", "props": { "y": 7, "x": 37, "width": 30, "skin": "ui/else/clip_number.png", "name": "item1", "index": 0, "height": 40, "clipX": 10 } }, { "type": "Text", "props": { "y": -23, "x": 60, "width": 92, "var": "levelView", "text": "Level 1", "strokeColor": "#16d225", "italic": true, "height": 25, "fontSize": 25, "font": "Impact", "color": "#ff2f08", "bold": false, "alpha": 0.5, "align": "center" } }, { "type": "Image", "props": { "y": 0, "x": -30, "width": 50, "var": "settingButton", "skin": "ui/button/SettingButton.png", "height": 50, "alpha": 0.5 }, "child": [{ "type": "Image", "props": { "y": 140, "x": 0, "width": 50, "visible": false, "var": "pauseButton", "skin": "ui/button/PauseButton.png", "height": 50, "disabled": true } }, { "type": "Image", "props": { "y": 70, "x": 0, "width": 50, "visible": false, "var": "soundButton", "skin": "ui/button/NoSoundButton.png", "height": 50, "disabled": true } }, { "type": "Image", "props": { "y": 210, "x": 0, "width": 50, "visible": false, "var": "endButton", "skin": "ui/button/EndButton.png", "height": 50, "disabled": true } }] }, { "type": "Text", "props": { "y": 48, "x": 35, "strokeColor": "#f4720b", "stroke": 2, "name": "penalty", "fontSize": 50, "font": "ChalkBoard", "color": "#f82e08" } }, { "type": "Text", "props": { "y": 46, "x": 97, "strokeColor": "#08bc83", "stroke": 2, "name": "reward", "fontSize": 50, "font": "ChalkBoard", "color": "#08f824" } }] }, { "type": "Box", "props": { "y": 506, "x": 605, "width": 238, "visible": true, "var": "smallArrowView", "scaleX": 1, "pivotY": 53, "pivotX": 324, "height": 98, "centerY": 202, "centerX": 14 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 181, "width": 70, "skin": "ui/else/right.png", "pivotY": 0, "pivotX": 0, "name": "right", "height": 70 } }, { "type": "Image", "props": { "y": 0, "x": -20, "width": 70, "skin": "ui/else/left.png", "name": "left", "height": 70 } }] }] };
        return GameViewUI;
    }(View));
    ui.GameViewUI = GameViewUI;
})(ui || (ui = {}));
(function (ui) {
    var StartViewUI = /** @class */ (function (_super) {
        __extends(StartViewUI, _super);
        function StartViewUI() {
            return _super.call(this) || this;
        }
        StartViewUI.prototype.createChildren = function () {
            View.regComponent("Text", laya.display.Text);
            _super.prototype.createChildren.call(this);
            this.createView(ui.StartViewUI.uiView);
        };
        StartViewUI.uiView = { "type": "View", "props": { "y": 0, "x": 0, "width": 800, "height": 600 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 800, "var": "backgroundView", "skin": "ui/background/StartBackGround.png", "height": 600 }, "child": [{ "type": "Image", "props": { "y": 150, "x": 150, "width": 100, "var": "onePlayerButton", "skin": "ui/button/SelectButton.png", "height": 100, "alpha": 1 }, "child": [{ "type": "Text", "props": { "y": 23, "x": 24, "width": 50, "text": "单", "strokeColor": "#000000", "overflow": "hidden", "height": 50, "fontSize": 40, "font": "Microsoft YaHei", "color": "#ffffff", "bold": true, "align": "center" } }] }, { "type": "Image", "props": { "y": 200, "x": 500, "width": 100, "var": "twoPlayersButton", "skin": "ui/button/SelectButton.png", "height": 100 }, "child": [{ "type": "Text", "props": { "y": 26, "x": 24, "width": 50, "text": "双", "overflow": "hidden", "height": 50, "fontSize": 40, "font": "Microsoft YaHei", "color": "#ffffff", "bold": true, "align": "center" } }] }, { "type": "Image", "props": { "y": 450, "x": 350, "width": 100, "var": "rankButton", "skin": "ui/button/SelectButton.png", "height": 100 }, "child": [{ "type": "Text", "props": { "y": 23, "x": 23, "width": 50, "text": "排", "overflow": "hidden", "height": 50, "fontSize": 40, "font": "Microsoft YaHei", "color": "#ffffff", "bold": true, "align": "center" } }] }] }] };
        return StartViewUI;
    }(View));
    ui.StartViewUI = StartViewUI;
})(ui || (ui = {}));
//# sourceMappingURL=layaUI.max.all.js.map