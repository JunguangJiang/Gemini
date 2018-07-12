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
        GameViewUI.uiView = { "type": "View", "props": { "x": 40, "width": 800, "height": 600 }, "child": [{ "type": "Image", "props": { "y": -2019, "x": -90, "width": 909, "var": "backgroundView", "skin": "ui/background/BackGround .jpg", "height": 2618 } }, { "type": "Image", "props": { "y": 213, "x": 304, "width": 100, "var": "smallBallView", "skin": "ui/star/1.png", "height": 100 } }, { "type": "Box", "props": { "width": 685, "visible": true, "var": "arrowView", "scaleX": 1, "pivotY": 53, "pivotX": 324, "height": 111, "centerY": 209, "centerX": -30 }, "child": [{ "type": "Image", "props": { "x": 574, "width": 70, "skin": "ui/arrow/right.png", "pivotY": 0, "pivotX": 0, "name": "right", "height": 70 } }, { "type": "Image", "props": { "width": 70, "skin": "ui/arrow/left.png", "name": "left", "height": 70 } }] }, { "type": "Image", "props": { "y": 351, "x": 337, "var": "bigBallView", "skin": "ui/star/10.png" } }] };
        return GameViewUI;
    }(View));
    ui.GameViewUI = GameViewUI;
})(ui || (ui = {}));
//# sourceMappingURL=layaUI.max.all.js.map