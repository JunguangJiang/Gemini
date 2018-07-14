//全局的音乐管理器
var Game;
(function (Game) {
    Game.SoundURLPrefix = "http://jjg15.iterator-traits.com/res/music/"; //声音资源前缀
    Game.BlackHoleCollisionSound = Game.SoundURLPrefix + "BlackHoleCollisionSound.wav";
    Game.StoneCollisionSound = Game.SoundURLPrefix + "StoneCollisionSound.wav";
    Game.NewLevelSound = Game.SoundURLPrefix + "NewLevelSound.wav";
    Game.RewardSound = Game.SoundURLPrefix + "RewardSound.wav";
    //背景音乐
    Game.BackgroundMusic = [
        "http://jjg15.iterator-traits.com/res/music/level1.wav"
    ];
})(Game || (Game = {}));
var MusicManager = /** @class */ (function () {
    function MusicManager() {
        this._level = 1;
    }
    //根据等级播放背景音乐，level从1开始
    MusicManager.prototype.onPlayMusic = function (level) {
        console.log("播放音乐");
        this._level = Math.min(level, Game.BackgroundMusic.length);
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