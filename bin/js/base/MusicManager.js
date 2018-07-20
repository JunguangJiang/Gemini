var Game;
(function (Game) {
    Game.SoundURLPrefix = "music/"; //声音资源前缀
    Game.BlackHoleCollisionSound = Game.SoundURLPrefix + "BlackHoleCollisionSound.mp3";
    Game.StoneCollisionSound = Game.SoundURLPrefix + "StoneCollisionSound.mp3";
    Game.NewLevelSound = Game.SoundURLPrefix + "NewLevelSound.mp3";
    Game.RewardSound = Game.SoundURLPrefix + "RewardSound.mp3";
    //背景音乐
    Game.BackgroundMusic = [
        Game.SoundURLPrefix + "level1.mp3"
    ];
})(Game || (Game = {}));
//全局的音乐管理器
var MusicManager = /** @class */ (function () {
    function MusicManager() {
        this._level = 1;
        Laya.SoundManager.setMusicVolume(1);
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
    //关闭声音
    MusicManager.prototype.turnOff = function () {
        console.log("关闭音量");
        Laya.SoundManager.setMusicVolume(0);
    };
    //重新打开声音
    MusicManager.prototype.turnOn = function () {
        console.log("重新打开音量");
        Laya.SoundManager.setMusicVolume(1);
    };
    //关闭音乐
    MusicManager.prototype.stopMusic = function () {
        Laya.SoundManager.stopMusic();
    };
    //关闭所有声音
    MusicManager.prototype.stopAll = function () {
        Laya.SoundManager.stopAll();
    };
    return MusicManager;
}());
//# sourceMappingURL=MusicManager.js.map