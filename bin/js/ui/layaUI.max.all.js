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
            _super.prototype.createChildren.call(this);
            this.createView(ui.GameViewUI.uiView);
        };
        GameViewUI.uiView = { "type": "View", "props": { "y": 0, "x": 0, "width": 800, "height": 600 }, "child": [{ "type": "Box", "props": { "y": -2017, "x": 0, "width": 800, "var": "runningView", "height": 2617 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 800, "var": "backgroundView", "skin": "ui/background/BackGround .jpg", "height": 2617 } }, { "type": "Image", "props": { "y": 2517, "x": 300, "width": 100, "visible": true, "var": "smallBallView", "skin": "ui/star/1.png", "height": 100 } }, { "type": "Image", "props": { "y": 2497, "visible": true, "var": "bigBallView", "skin": "ui/star/10.png" } }] }, { "type": "Box", "props": { "y": 507, "x": 385, "width": 685, "visible": true, "var": "arrowView", "scaleX": 1, "pivotY": 53, "pivotX": 324, "height": 111, "centerY": 209, "centerX": 3 }, "child": [{ "type": "Image", "props": { "x": 574, "width": 70, "skin": "ui/arrow/right.png", "pivotY": 0, "pivotX": 0, "name": "right", "height": 70 } }, { "type": "Image", "props": { "width": 70, "skin": "ui/arrow/left.png", "name": "left", "height": 70 } }] }, { "type": "Box", "props": { "y": 48, "x": 593, "width": 177, "visible": true, "var": "scoreView", "height": 64 }, "child": [{ "type": "Clip", "props": { "y": 7, "x": 126, "width": 30, "skin": "ui/score/clip_number.png", "name": "item3", "height": 40, "clipX": 10 } }, { "type": "Clip", "props": { "y": 7, "x": 82, "width": 30, "skin": "ui/score/clip_number.png", "name": "item2", "height": 40, "clipX": 10 } }, { "type": "Clip", "props": { "y": 7, "x": 37, "width": 30, "skin": "ui/score/clip_number.png", "name": "item1", "index": 0, "height": 40, "clipX": 10 } }] }] };
        return GameViewUI;
    }(View));
    ui.GameViewUI = GameViewUI;
})(ui || (ui = {}));
//# sourceMappingURL=layaUI.max.all.js.map