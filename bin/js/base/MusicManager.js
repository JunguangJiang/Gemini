//全局的音乐管理器
var Game;
(function (Game) {
    Game.BlackHoleCollisionSound = "http://fjdx.sc.chinaz.com/files/download/sound/huang/cd9/wav/607.wav";
    Game.StoneCollisionSound = "http://fjdx.sc.chinaz.com/files/download/sound1/201208/1939.wav";
    //背景音乐暂时使用本地的文件，等服务器开始运行后，将其移到服务器上
    Game.BackgroundMusic = [
        "ui/music/level1.wav"
    ];
})(Game || (Game = {}));
var MusicManager = /** @class */ (function () {
    function MusicManager() {
        this._level = 1;
    }
    //根据等级播放背景音乐，level从1开始
    MusicManager.prototype.onPlayMusic = function (level) {
        console.log("播放音乐");
        this._level = level;
        Laya.SoundManager.playMusic(Game.BackgroundMusic[this._level - 1], 1, new Laya.Handler(this, this.onComplete));
    };
    //播放完背景音乐后调用
    MusicManager.prototype.onComplete = function () {
        console.log("播放完成");
        this.onPlayMusic(this._level); //循环播放
    };
    //播放特殊音效
    MusicManager.prototype.onPlaySound = function (url) {
        console.log("播放音效");
        Laya.SoundManager.playSound(url, 1);
    };
    return MusicManager;
}());
//# sourceMappingURL=MusicManager.js.map