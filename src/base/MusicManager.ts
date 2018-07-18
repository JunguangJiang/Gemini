namespace Game{
    export const SoundURLPrefix: string = "music/" //声音资源前缀
    export const BlackHoleCollisionSound: string = SoundURLPrefix + "BlackHoleCollisionSound.mp3";
    export const StoneCollisionSound: string = SoundURLPrefix+"StoneCollisionSound.mp3";
    export const NewLevelSound: string = SoundURLPrefix+"NewLevelSound.mp3"
    export const RewardSound: string = SoundURLPrefix+"RewardSound.mp3";
    //背景音乐
    export const BackgroundMusic : Array<string> = [
        SoundURLPrefix+"level1.mp3"
    ];
}

//全局的音乐管理器
class MusicManager{
    private _level:number;//当前等级
    constructor(){
        this._level = 1;
        Laya.SoundManager.setMusicVolume(1);
    }

    //根据等级播放背景音乐，level从1开始
    onPlayMusic(level:number){
        console.log("播放音乐");
        this._level = Math.min(level, Game.BackgroundMusic.length);
        Laya.SoundManager.playMusic(Game.BackgroundMusic[this._level-1], 1, new Laya.Handler(this, this.onComplete));   
    }

    //播放完背景音乐后调用
    onComplete(){
        console.log("播放完成");
        this.onPlayMusic(this._level);//循环播放
    }

    //播放特殊音效
    onPlaySound(url:string){
        console.log("播放音效");
        Laya.SoundManager.playSound(url, 1);
    }

    //关闭声音
    turnOff():void{
        console.log("关闭音量");
        Laya.SoundManager.setMusicVolume(0);
    }

    //重新打开声音
    turnOn():void{
        console.log("重新打开音量");
        Laya.SoundManager.setMusicVolume(1);
    }
}