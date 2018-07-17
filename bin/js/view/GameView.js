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
//游戏的一些参数
var Game;
(function (Game) {
    Game.debug = false; //是否处于调试模式
    Game.playerNum = 1; //玩家数目，可以取1或者2
    Game.interval = 16; //刷新时间(单位：毫秒)
    Game.gravity = 14; //重力加速度
    Game.liftCoefficient = Game.debug ? 1600 : 700; //升力系数,升力=liftCoefficient/(球心距离)
    Game.dragCoefficient = 0.001; //阻力系数，阻力=-dragCoefficient*速度^3
    Game.attractionCoefficient = 15000; //球之间的引力系数
    Game.randomForce = 10; //随机力的幅度
    Game.humanForce = 40; //人类施力的幅度
    Game.smallBallRandomForcePeriod = 600; //小球受到随机力的周期
    Game.bigBallRandomForcePeriod = 3000; //大球受到随机力的周期
    Game.initialY = 2600; //小球的初始高度
    Game.setting = false; //是否处于设置界面
    Game.sound = true; //是否有声音
    Game.pause = false; //是否暂停
})(Game || (Game = {}));
//游戏的主视图
var GameView = /** @class */ (function (_super) {
    __extends(GameView, _super);
    //构造函数
    function GameView() {
        var _this = _super.call(this) || this;
        //初始化障碍物管理器
        _this._barriersManagement = new BarriersManagement(_this.backgroundView);
        return _this;
    }
    //界面初始化
    GameView.prototype.init = function () {
        //游戏的活动区域
        this._activityArea = { up: this.height - this.backgroundView.height, down: 0 };
        //球的初始化
        this._bigBall = new Ball(25, 400, Game.initialY, this.bigBallView);
        this._smallBall = new Ball(15, 200, Game.initialY, this.smallBallView);
        //控制方向的箭头区域的初始化
        this._arrow = new Arrow(this.arrowView.getChildByName("left"), this.arrowView.getChildByName("right"), Laya.Handler.create(this, this.onTouchStart, null, false), Laya.Handler.create(this, this.onTouchEnd, null, false), "big");
        if (Game.playerNum === 2) { //如果是双人模式
            this._smallArrow = new Arrow(this.smallArrowView.getChildByName("left"), this.smallArrowView.getChildByName("right"), Laya.Handler.create(this, this.onTouchStart, null, false), Laya.Handler.create(this, this.onTouchEnd, null, false), "small");
            this.smallArrowView.visible = true;
        }
        else { //如果是单人模式
            this.smallArrowView.visible = false;
        }
        this._loopCount = 0;
        //计分器的初始化
        this._scoreIndicator = new ScoreIndicator(this.scoreView, 3, this.runningView.height, 0);
        //等级显示
        this.levelView.visible = true;
        //音乐播放器
        this._musicManager = new MusicManager();
        this._musicManager.onPlayMusic(1); //播放等级1的音乐
        //创建按钮事件
        this.createButtonEvents();
        this.enterLevel(1); //进入等级1
    };
    //直接进入某一级
    GameView.prototype.enterLevel = function (level) {
        this._level = level;
        this.levelView.text = "level " + this._level;
        this._scoreIndicator.clearHeight(); //计分器维护的高度归零
        this._bigBall.y = this._smallBall.y = Game.initialY; //让大球和小球都回到起点
        this._bigBall.stop();
        this._smallBall.stop();
        //需要在此处绘制障碍物
        //TODO,在此处修改接口
        this.adjustBarrier(); //调整障碍物的数量
        this._barriersManagement.update();
    };
    //进入新的一级
    GameView.prototype.enterNewLevel = function () {
        this._level++;
        this.enterLevel(this._level); //进入下一级
        this._scoreIndicator.getReward(10 + 10 * this._level); //进入新的一级获得奖励
        this._musicManager.onPlaySound(Game.NewLevelSound); //播放过关音乐
    };
    //调整障碍物的数量
    GameView.prototype.adjustBarrier = function () {
        BarrierParameter.stonesNum = Math.min(12 + 4 * this._level, 30);
        BarrierParameter.blackHolesNum = Math.min(2 * this._level + 1, 10);
        BarrierParameter.fallingStoneRate = Math.min(0.1 * this._level, 0.8);
        BarrierParameter.zodiacNum = 15;
    };
    //游戏开始
    GameView.prototype.gameStart = function () {
        console.log("游戏开始");
        Laya.timer.loop(Game.interval, this, this.onLoop);
        //给球施加重力
        this._bigBall.setForce(0, Game.gravity, "gravity");
        this._smallBall.setForce(0, Game.gravity, "gravity");
        this._isRunning = true;
    };
    //游戏的暂停
    GameView.prototype.gamePause = function () {
        if (this._isRunning) {
            console.log("游戏暂停");
            this._smallBall.pause();
            this._bigBall.pause();
            this._isRunning = false;
            Laya.timer.clear(this, this.onLoop);
            this._musicManager.turnOff(); //关闭声音
        }
    };
    //游戏重新开始
    GameView.prototype.gameRestart = function () {
        if (!this._isRunning) {
            console.log("游戏重新开始");
            this._smallBall.restart();
            this._bigBall.restart();
            this._isRunning = true;
            Laya.timer.loop(Game.interval, this, this.onLoop);
            this._musicManager.turnOn(); //打开声音
        }
    };
    //游戏结束
    GameView.prototype.gameEnd = function () {
        console.log("游戏结束");
        console.log("你的总分为" + this._scoreIndicator.data);
        Laya.timer.clear(this, this.onLoop);
        this._isRunning = false;
        this.endButton.event(Laya.Event.CLICK);
    };
    //需要每隔单位时间进行一次调用的函数请写入以下函数体
    GameView.prototype.onLoop = function () {
        this._barriersManagement.updateBarriers();
        //在任何模式下，
        this.detectCollisionsBetween(this._bigBall, "BlackHole"); //大球都会被黑洞吸入
        this.detectCollisionsBetween(this._bigBall, "Stone"); //大球都会被岩石击中
        this.detectCollisionsBetween(this._smallBall, "Zodiac"); //只有小球才可以点亮星座
        if (Game.playerNum === 2) { //双人模式下
            this.detectCollisionsBetween(this._smallBall, "BlackHole"); //小球也会被黑洞吸入
            this.detectCollisionsBetween(this._smallBall, "Stone"); //被岩石击中
        }
        this.updateForces(); //更新大小球的受力
        this.detectBorder(this._bigBall, true); //检测与边缘的相对位置
        this.detectBorder(this._smallBall, Game.playerNum === 2); //只有两个玩家时，才会惩罚小球的碰壁
        this._bigBall.update(); //更新大球的位置和速度
        this._smallBall.update(); //更新小球的位置和速度
        this.updateBackground(); //根据当前球的位置更新背景
        this._loopCount++;
        if (this._level === 1) {
            this._scoreIndicator.updateHeight(-(this._bigBall.y - this.runningView.height + this._bigBall.radius));
        }
        //不断更新游戏分数,最小值为0
        Game.score = Math.max(this._scoreIndicator.data, 0);
    };
    //根据当前球的位置更新背景
    GameView.prototype.updateBackground = function () {
        var y = -this._bigBall.y + this.height / 2;
        if (y > this._activityArea.down)
            y = this._activityArea.down;
        else if (y < this._activityArea.up)
            y = this._activityArea.up;
        this.runningView.y = y;
    };
    //碰撞检测与处理
    GameView.prototype.detectCollisionsBetween = function (ball, barriers) {
        switch (barriers) {
            case "BlackHole": //判断球是否进入黑洞
                for (var _i = 0, _a = this._barriersManagement.blackHoles; _i < _a.length; _i++) {
                    var item = _a[_i];
                    if (item.detectCollisions(ball)) {
                        this._musicManager.onPlaySound(Game.BlackHoleCollisionSound);
                        this.gameEnd();
                    }
                }
                break;
            case "Stone": //判断球是否与陨石碰撞反弹
                for (var _b = 0, _c = this._barriersManagement.stones; _b < _c.length; _b++) {
                    var item = _c[_b];
                    if (item.detectCollisions(ball)) //在此处添加碰撞音效
                     {
                        this._musicManager.onPlaySound(Game.StoneCollisionSound);
                        //根据陨石是否下落确定惩罚的分数
                        if (item.isFalling) {
                            this._scoreIndicator.getPenalty(4 + 1 * (this._level - 1));
                        }
                        else {
                            this._scoreIndicator.getPenalty(5 + 1 * (this._level - 1));
                        }
                        //移除该陨石
                        this._barriersManagement.remove(item);
                        // this.backgroundView.removeChild(item.item);
                        // this._barriersManagement.stones.splice(this._barriersManagement.stones.indexOf(item),1);
                        //判断游戏是否结束
                        if (this._scoreIndicator.data <= 0) {
                            this.gameEnd();
                            return;
                        }
                        //小球受到碰撞冲量
                        ball.collide(-0.8, -0.8);
                    }
                }
                break;
            case "Zodiac": //判断球是否和星座相碰
                for (var _d = 0, _e = this._barriersManagement.zodiacs; _d < _e.length; _d++) {
                    var item = _e[_d];
                    if (item.detectCollisions(ball)) {
                        this._musicManager.onPlaySound(Game.RewardSound);
                        this._scoreIndicator.getReward(6 + 1 * (this._level - 1));
                    }
                }
                break;
        }
    };
    //球与边缘的相对位置的检测与处理
    GameView.prototype.detectBorder = function (ball, hasPenalty) {
        if (hasPenalty === void 0) { hasPenalty = false; }
        if ((((ball.x - ball.radius) <= 0) && ball.vx < 0) ||
            (((ball.x + ball.radius) >= this.runningView.width) && ball.vx > 0)) {
            ball.collide(-1, 1);
            if (hasPenalty) {
                this._scoreIndicator.getPenalty(1 * this._level + 1); //碰壁惩罚
            }
        }
        else if ((((ball.y + ball.radius) >= this.runningView.height) && ball.vy > 0)) {
            // console.log("碰到垂直边缘");
            ball.collide(1, -0.9);
        }
        else if ((((ball.y - ball.radius) <= 0) && ball.vy < 0)) {
            this.enterNewLevel(); //进入新的一个回合
        }
    };
    //更新球的受力，主要是两个球之间的作用力
    GameView.prototype.updateForces = function () {
        var distance = Math.sqrt(Math.pow((this._bigBall.x - this._smallBall.x), 2) +
            Math.pow((this._bigBall.y - this._smallBall.y), 2)); //球的距离
        var minDistance = this._bigBall.radius + this._smallBall.radius; //最近距离不能小于两球的半径之和
        var effectiveDistance = Math.max(distance, minDistance); //在计算受力时的有效距离
        //首先处理球靠近产生的升力
        var lift = Game.liftCoefficient / (effectiveDistance);
        this._bigBall.setForce(0, -lift, "lift");
        this._smallBall.setForce(0, -lift, "lift");
        //处理由于球运动产生的阻力
        var bigVSquare = Math.pow(this._bigBall.vx, 2) + Math.pow(this._bigBall.vy, 2);
        this._bigBall.setForce(-bigVSquare * this._bigBall.vx * Game.dragCoefficient, -bigVSquare * this._bigBall.vy * Game.dragCoefficient, "drag");
        var smallVSquare = Math.pow(this._smallBall.vx, 2) + Math.pow(this._smallBall.vy, 2);
        this._smallBall.setForce(-smallVSquare * this._smallBall.vx * Game.dragCoefficient, -smallVSquare * this._smallBall.vy * Game.dragCoefficient, "drag");
        //处理两个小球之间的引力
        effectiveDistance = Math.min(effectiveDistance, minDistance * 3);
        var attraction = Game.attractionCoefficient / (Math.pow(effectiveDistance, 3));
        this._bigBall.setForce((this._smallBall.x - this._bigBall.x) * attraction, (this._smallBall.y - this._bigBall.y) * attraction, "attraction");
        this._smallBall.setForce((this._bigBall.x - this._smallBall.x) * attraction, (this._bigBall.y - this._smallBall.y) * attraction, "attraction");
        //随机受力
        if (!Game.debug) {
            if (this._loopCount % Game.smallBallRandomForcePeriod === 0) {
                this.setRandomForce(this._smallBall);
            }
            if (this._loopCount % Game.bigBallRandomForcePeriod === 0) {
                this.setRandomForce(this._bigBall);
            }
        }
    };
    //让球受到随机力
    GameView.prototype.setRandomForce = function (ball) {
        if (Math.random() > 0.2) {
            var Fx = (Math.random() - 0.5) * Game.randomForce / 2;
            // console.log("水平力Fx="+Fx);
            ball.setForce(Fx, 0, "random");
        }
        else {
            var Fy = (Math.random() - 0.5) * Game.randomForce / 2 + Game.randomForce;
            // console.log("垂直力Fx="+Fy);
            ball.setForce(0, Fy / 3, "random");
        }
        var forceTime = Math.random() * 3000 + 1000; //持续时间也是随机的
        Laya.timer.once(forceTime, ball, ball.removeForce, ["random"]);
        // console.log(ball.radius+" ball get random force for "+forceTime+"s");
    };
    //当触摸开始时调用
    GameView.prototype.onTouchStart = function (data) {
        //增加大球受力
        var force = Math.random() * Game.humanForce / 2 + Game.humanForce;
        if (data.type === "left") {
            force = -force;
        }
        if (data.ballType === "big") {
            this._bigBall.setForce(force, 0, "humanControl");
        }
        else {
            this._smallBall.setForce(force, 0, "humanControl");
        }
    };
    GameView.prototype.onTouchEnd = function (data) {
        //移除大球受力
        if (data.ballType === "big") {
            this._bigBall.removeForce("humanControl");
        }
        else {
            this._smallBall.removeForce("humanControl");
        }
    };
    //创建各种按钮响应事件
    GameView.prototype.createButtonEvents = function () {
        //设置按钮
        this.settingButton.on(Laya.Event.CLICK, this, this.settingEvent);
        //暂停按钮
        this.pauseButton.on(Laya.Event.CLICK, this, this.pauseEvent);
        //静音按钮
        this.soundButton.on(Laya.Event.CLICK, this, this.soundEvent);
    };
    //设置按钮事件
    GameView.prototype.settingEvent = function () {
        if (Game.setting) //现在处于设置状态
         {
            Game.setting = false;
            this.settingButton._childs.forEach(function (item, index) {
                item.visible = false;
                item.disabled = true;
            });
        }
        else //现在处于非设置状态
         {
            Game.setting = true;
            this.settingButton._childs.forEach(function (item, index) {
                item.visible = true;
                item.disabled = false;
            });
        }
    };
    //切换暂停状态事件
    GameView.prototype.pauseEvent = function () {
        if (Game.pause) //现在处于暂停状态
         {
            this.pauseButton.skin = "ui/button/PauseButton.png";
            Game.pause = false;
            //继续游戏TODO：
            this.gameRestart();
        }
        else //现在处于游戏状态
         {
            this.pauseButton.skin = "ui/button/ContinueButton.png";
            Game.pause = true;
            //暂停游戏TODO：
            this.gamePause();
        }
    };
    //切换静音状态事件
    GameView.prototype.soundEvent = function () {
        if (Game.sound) //现在处于播放音乐状态
         {
            this.soundButton.skin = "ui/button/SoundButton.png";
            Game.sound = false;
            //暂停音乐TODO：
            Laya.SoundManager.muted = true;
        }
        else //现在处于静音状态
         {
            this.soundButton.skin = "ui/button/NoSoundButton.png";
            Game.sound = true;
            //播放音乐TODO：
            Laya.SoundManager.muted = false;
        }
    };
    return GameView;
}(ui.GameViewUI));
//# sourceMappingURL=GameView.js.map