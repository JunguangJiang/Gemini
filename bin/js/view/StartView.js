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
//游戏的开始界面,暂时没什么功能，有功能可直接添加
var StartView = /** @class */ (function (_super) {
    __extends(StartView, _super);
    //构造函数
    function StartView() {
        var _this = _super.call(this) || this;
        _this.loadImage(Game.startBackGroundImage);
        return _this;
    }
    return StartView;
}(ui.StartViewUI));
//# sourceMappingURL=StartView.js.map