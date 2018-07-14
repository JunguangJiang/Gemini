//全局的音乐管理器
namespace Game{
    export const BlackHoleCollisionSound: string = "http://fjdx.sc.chinaz.com/files/download/sound/huang/cd9/wav/607.wav";
    export const StoneCollisionSound: string = "http://fjdx.sc.chinaz.com/files/download/sound1/201208/1939.wav";
    //背景音乐暂时使用本地的文件，等服务器开始运行后，将其移到服务器上
    export const BackgroundMusic : Array<string> = [
        "ui/music/level1.wav"
    ];
}

class MusicManager{
    private _level:number;//当前等级
    constructor(){
        this._level = 1;
    }

    //根据等级播放背景音乐，level从1开始
    onPlayMusic(level:number){
        console.log("播放音乐");
        this._level = level;
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

}