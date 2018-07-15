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
    Game.debug = true; //是否处于调试模式
    Game.playerNum = 1; //玩家数目，可以取1或者2
    Game.interval = 100; //刷新时间(单位：毫秒)
    Game.gravity = 14; //重力加速度
    Game.liftCoefficient = Game.debug ? 1600 : 700; //升力系数,升力=liftCoefficient/(球心距离)
    Game.dragCoefficient = 0.001; //阻力系数，阻力=-dragCoefficient*速度^3
    Game.attractionCoefficient = 8000; //球之间的引力系数
    Game.randomForce = 10; //随机力的幅度
    Game.humanForce = 40; //人类施力的幅度
    Game.smallBallRandomForcePeriod = 100; //小球受到随机力的周期
    Game.bigBallRandomForcePeriod = 500; //大球受到随机力的周期
    Game.initialY = 2600; //小球的初始高度
    Game.serverResURL = "http://jjg15.iterator-traits.com/res"; //服务器资源路径
})(Game || (Game = {}));
//游戏的主视图
var GameView = /** @class */ (function (_super) {
    __extends(GameView, _super);
    //构造函数
    function GameView() {
        return _super.call(this) || this;
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
        }
        else { //如果是单人模式
            this.smallArrowView.visible = false;
        }
        this._loopCount = 0;
        this._level = 1;
        //障碍物类初始化与障碍物绘制
        this._barriersManagement = new BarriersManagement(this.backgroundView);
        this._barriersManagement.drawBarriers();
        //计分器的初始化
        this._scoreIndicator = new ScoreIndicator(this.scoreView, 3, this.runningView.height, 0);
        //等级显示
        this.levelView.visible = true;
        //音乐播放器
        this._musicManager = new MusicManager();
        this._musicManager.onPlayMusic(1); //播放等级1的音乐
    };
    //进入新的一级
    GameView.prototype.enterNewLevel = function () {
        this._level++;
        this.levelView.text = "level " + this._level;
        this.increaseDifficulty(); //增加游戏难度
        this._scoreIndicator.clearHeight(); //计分器维护的高度归零
        this._bigBall.y = this._smallBall.y = Game.initialY; //让大球和小球都回到起点
        this._bigBall.stop();
        this._smallBall.stop();
        this._barriersManagement.updateBarrier(this.backgroundView); //清除原先的障碍物
        this._barriersManagement.drawBarriers(); //绘制新的障碍物
        this._musicManager.onPlaySound(Game.NewLevelSound); //播放过关音乐
        this._musicManager.onPlayMusic(this._level); //绘制新的音乐
    };
    //增加游戏难度
    GameView.prototype.increaseDifficulty = function () {
        Game.randomForce = Game.randomForce * 1.1;
        //增加障碍物的数量
    };
    //游戏开始
    GameView.prototype.gameStart = function () {
        console.log("游戏开始");
        Laya.timer.loop(Game.interval, this, this.onLoop);
        //给球施加重力
        this._bigBall.setForce(0, Game.gravity, "gravity");
        this._smallBall.setForce(0, Game.gravity, "gravity");
    };
    //游戏结束
    GameView.prototype.gameEnd = function () {
        console.log("游戏结束");
        console.log("你的总分为" + this._scoreIndicator.data);
        Laya.timer.clear(this, this.onLoop);
    };
    //需要每隔单位时间进行一次调用的函数请写入以下函数体
    GameView.prototype.onLoop = function () {
        this.detectCollisions(this._bigBall); //大球碰撞检测与处理
        if (Game.playerNum === 2) {
            this.detectCollisions(this._smallBall); //双人模式下小球也需要检测碰撞
        }
        this.updateForces(); //更新大小球的受力
        this.detectBorder(this._bigBall); //检测与边缘的相对位置
        this.detectBorder(this._smallBall);
        this._bigBall.update(); //更新大球的位置和速度
        this._smallBall.update(); //更新小球的位置和速度
        this.updateBackground(); //根据当前球的位置更新背景
        this._loopCount++;
        this._scoreIndicator.updateHeight(-(this._bigBall.y - this.runningView.height + this._bigBall.radius));
        // this._bigBall.debug("大球");
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
    GameView.prototype.detectCollisions = function (ball) {
        //判断球是否进入黑洞
        var inBlackhole = 0;
        for (var _i = 0, _a = this._barriersManagement.blackHoles; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item.detectCollisions(ball)) {
                inBlackhole = item.detectCollisions(ball);
                break;
            }
        }
        if (inBlackhole) {
            this.gameEnd();
        }
        //判断球是否与陨石碰撞反弹
        var inStone = 0;
        for (var _b = 0, _c = this._barriersManagement.stones; _b < _c.length; _b++) {
            var item = _c[_b];
            if (item.detectCollisions(ball)) //在此处添加碰撞音效
             {
                inStone = item.detectCollisions(ball);
                this._scoreIndicator.getPenalty(2); //减2分
                this.backgroundView.removeChildAt(item.index);
                this._barriersManagement.stones.splice(this._barriersManagement.stones.indexOf(item), 1);
                if (this._scoreIndicator.data <= 0) {
                    this.gameEnd();
                    return;
                }
                switch (inStone) {
                    case 1:
                        ball.collide(1, -1);
                        break;
                    case 2:
                        ball.collide(-1, 1);
                        break;
                    default:
                        break;
                }
            }
        }
        //判断球是否和星座相碰
        for (var _d = 0, _e = this._barriersManagement.zodiacs; _d < _e.length; _d++) {
            var item = _e[_d];
            if (item.detectCollisions(ball)) {
                this._scoreIndicator.getReward(3);
                console.log("发生碰撞");
            }
        }
    };
    //球与边缘的相对位置的检测与处理
    GameView.prototype.detectBorder = function (ball) {
        if ((((ball.x - ball.radius) <= 0) && ball.vx < 0) ||
            (((ball.x + ball.radius) >= this.runningView.width) && ball.vx > 0)) {
            // console.log("碰到水平边缘");
            //this._musicManager.onPlaySound(Game.RewardSound);//播放和石头碰撞的声音，仅用于调试
            ball.collide(-1, 1);
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
            Math.pow((this._bigBall.y - this._smallBall.y), 2)); //球的距离平方
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
        //处理两个小球之间的引力(认为水平方向无引力)
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
            var Fx = (Math.random() - 0.5) * Game.randomForce / 2 + Game.randomForce;
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
    return GameView;
}(ui.GameViewUI));
//# sourceMappingURL=GameView.js.map