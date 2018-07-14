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
        GameViewUI.uiView = { "type": "View", "props": { "y": 0, "x": 0, "width": 800, "height": 600 }, "child": [{ "type": "Box", "props": { "y": -2017, "x": 0, "width": 800, "var": "runningView", "height": 2617 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 800, "var": "backgroundView", "skin": "ui/background/BackGround .jpg", "height": 2617 } }, { "type": "Animation", "props": { "y": 2582, "x": 145, "width": 30, "var": "smallBallView", "height": 30 } }, { "type": "Animation", "props": { "y": 2568, "x": 369, "width": 50, "var": "bigBallView", "height": 50 } }] }, { "type": "Box", "props": { "y": 507, "x": 385, "width": 685, "visible": true, "var": "arrowView", "scaleX": 1, "pivotY": 53, "pivotX": 324, "height": 111, "centerY": 209, "centerX": 3 }, "child": [{ "type": "Image", "props": { "x": 574, "width": 70, "skin": "ui/arrow/right.png", "pivotY": 0, "pivotX": 0, "name": "right", "height": 70 } }, { "type": "Image", "props": { "width": 70, "skin": "ui/arrow/left.png", "name": "left", "height": 70 } }] }, { "type": "Box", "props": { "y": 48, "x": 593, "width": 177, "visible": true, "var": "scoreView", "height": 64 }, "child": [{ "type": "Clip", "props": { "y": 7, "x": 126, "width": 30, "skin": "ui/score/clip_number.png", "name": "item3", "height": 40, "clipX": 10 } }, { "type": "Clip", "props": { "y": 7, "x": 82, "width": 30, "skin": "ui/score/clip_number.png", "name": "item2", "height": 40, "clipX": 10 } }, { "type": "Clip", "props": { "y": 7, "x": 37, "width": 30, "skin": "ui/score/clip_number.png", "name": "item1", "index": 0, "height": 40, "clipX": 10 } }, { "type": "Text", "props": { "y": -21, "x": 76, "width": 92, "var": "levelView", "text": "Level 1", "strokeColor": "#16d225", "italic": true, "height": 25, "fontSize": 25, "font": "SimHei", "color": "#ee0d09", "alpha": 1, "align": "left" } }] }] };
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
        StartViewUI.uiView = { "type": "View", "props": { "y": 0, "x": 0, "width": 800, "height": 600 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 800, "var": "backgroundView", "skin": "ui/background/StartBackGround.png", "height": 600 }, "child": [{ "type": "Image", "props": { "y": 150, "x": 150, "width": 100, "var": "startButtonView", "skin": "ui/button/1.png", "height": 100, "alpha": 1 }, "child": [{ "type": "Text", "props": { "y": 23, "x": 24, "width": 50, "text": "启", "strokeColor": "#000000", "overflow": "hidden", "height": 50, "fontSize": 40, "font": "Microsoft YaHei", "color": "#ffffff", "bold": true, "align": "center" } }] }, { "type": "Image", "props": { "y": 200, "x": 500, "width": 100, "var": "rankButtonView", "skin": "ui/button/1.png", "height": 100 }, "child": [{ "type": "Text", "props": { "y": 26, "x": 24, "width": 50, "text": "排", "overflow": "hidden", "height": 50, "fontSize": 40, "font": "Microsoft YaHei", "color": "#ffffff", "bold": true, "align": "center" } }] }, { "type": "Image", "props": { "y": 450, "x": 350, "width": 100, "var": "saveButtonView", "skin": "ui/button/1.png", "height": 100 }, "child": [{ "type": "Text", "props": { "y": 23, "x": 23, "width": 50, "text": "存", "overflow": "hidden", "height": 50, "fontSize": 40, "font": "Microsoft YaHei", "color": "#ffffff", "bold": true, "align": "center" } }] }] }] };
        return StartViewUI;
    }(View));
    ui.StartViewUI = StartViewUI;
})(ui || (ui = {}));
//# sourceMappingURL=layaUI.max.all.js.map