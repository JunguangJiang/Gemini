# 双子  架构思路与完成情况

## 游戏规则
通过左右键控制大球与小球的距离（二者接近时上升，分离时下降），巧妙地躲避岩石与黑洞，点亮目标灯塔，取得最后的胜利。<br>

### 游戏内容
+ 第一关可以通过升高获得奖励，此后只能通过点亮星座或者进入新的一关获得奖励。假设背景总高度为1m，划分为100份，每份1cm，每次到达一个新的高度奖励1分（此前到达过的不算，故最多奖励100分）。<br>
+ 若球撞到岩石和陨石，分别惩罚不同数值的分数。<br>
+ 若球撞到黑洞，则游戏直接结束。<br>
+ 若球点亮星座，可以得到奖励分。<br>
+ 当总分小于等于0或者撞到黑洞时，游戏失败。<br>

### 注解：
1、上述分数可根据实际的游戏体验进行调整。<br>
2、在单人模式下，小球不会撞到黑洞和障碍物，只需要引导大球躲开障碍物与黑洞。<br>

## 预期目标
+ 支持单人和双人模式。<br>
+ 大球支持亮暗两种状态。<br>
+ 支持游戏的存档。<br>
+ 支持好友的排名（单人（必做）和双人（可选））。<br>
+ 有四种界面的切换。<br>
+ 有游戏设置按钮（结束按钮、静音按钮、暂停按钮）。<br>
+ 不同的难度选择。<br>

-## 设计思路（2.0.1）
## 设计思路（3.0.1）
### 球类Ball
分配：`江俊广`<br>
文件夹：`base`<br>
**球的运动建模**。主要受力包括：重力、由于双子互相靠近产生的升力、与障碍物相撞时的冲力、垂直方向上双子互相的引力（防止双子离得太远）、随机的干扰力等。<br>
能够根据外部受力和时间变化进行状态的改变（加速度、速度、位置、（旋转角度）、亮暗）。<br>

### 障碍物类Barrier
### 障碍物类Barrier（抽象类）
分配：`程嘉梁`<br>
文件夹：`base`<br>
**公有属性**：位置、大小、碰撞检测。<br>
均需要随机生成位置，碰撞后的回调函数不同。<br>
包括子类岩石类`Rock`和黑洞类`BlackHole`。<br>
包括子类岩石类`Stone`、黑洞类`BlackHole`、星座类`Zodiac`（俊广实现）。<br>

### 游戏界面
### 游戏管理类
分配：`江俊广`，`程嘉梁`<br>
文件夹：`base`，`items`<br>
+ `Arrow`：实现操作箭头（江俊广）
+ `MusicManager`：音乐管理（江俊广）
+ `ScoreIndiator`：得分显示（江俊广）
+ `Timer`：游戏时间管理（江俊广）
+ `BarriersManagement`：障碍物管理（程嘉梁）

### 游戏界面类
分配：`江俊广`，`程嘉梁`<br>
文件夹：`view`<br>
游戏入口函数类`GameMain`。<br>
1、游戏开始界面类`GameStart`：开始界面背景、游戏模式选择、排行榜查看、是否读入存档。<br>
2、游戏正式界面类`GameView`：管理全局的数据对象（帧动画、黑洞、障碍物、小球）。新的黑洞与障碍物的生成、全局各种力与碰撞的检测、根据得分判断游戏状态、游戏状态存储。<br>
3、游戏结束界面类`GameEnd`：展示结束界面（分数）、可选择进入排行榜以及回到开始界面。<br>
1、游戏开始界面类`StartView`：开始界面背景、游戏模式选择、排行榜查看。<br>
2、游戏正式界面类`GameView`：管理全局的数据对象（帧动画、黑洞、障碍物、小球）。新的黑洞与障碍物的生成、全局各种力与碰撞的检测、根据得分判断游戏状态、游戏设置。<br>
3、游戏结束界面类`EndView`：展示结束界面（分数）、可选择进入排行榜以及回到开始界面。<br>
这些都是通过`Layabox`的UI界面自动生成的类上进行扩展。<br>

### 一些有空再写的额外类
分配：动态调整<br>
文件夹：未定<br>
排行榜类`Rank`，音效管理器`Music`。<br>
1、`rank.js`（排行榜类）：存储服务器排行榜信息（存储为一个排行榜对象，其中成员为`ID:score`）、显示排行榜界面、可返回开始界面。<br>
2、`music.js`（全局音效管理器类）：管理音乐的播放、暂停、静音。<br>
排行榜类`Rank`<br>
`rank.js`（排行榜类）：存储服务器排行榜信息（存储为一个排行榜对象，其中成员为`ID:score`）、显示排行榜界面、可返回开始界面。<br>
注：游戏策略类似于跳一跳，因此不再对游戏进度进行存档。

### 素材的收集（包括图片、音乐）
**图片**：旋转体（同一张图片不同比例的缩放得到大球和小球，绘制发光滤镜得到亮暗两种状态）、背景、障碍物、黑洞。<br>
**图片**：旋转体（同一张图片不同比例的缩放得到大球和小球，绘制发光滤镜得到亮暗两种状态）、背景、障碍物、黑洞等各种item。<br>
**音乐**：类似于游戏中的音乐（舒缓音乐+游戏过关时较为激动的音乐+撞击时的音效）。<br>

## 代码风格（统一）
+ 所有在UI视图中定义的变量名以View作为后缀，从而与自定义的变量名相区别。<br>

## 已创建的类与接口
### Barriers（障碍物类）
### Barriers（障碍物类--抽象类，有子类BlackHole、Stone、Zodiac）
**public property**
+ `blackholes:Laya.Animation[]`：存储背景中黑洞的数组，每个元素是一个动画类`Laya.Animation`。
+ `stones:Laya.Image[]`：存储背景中陨石的数组，每个元素是一个图片类`Laya.Image`。
+ `item`：该物体对应的动画或图像。

**public method**
+ `Barriers()`：构造函数，函数参数见代码。
+ `regenerateBarrier(backgroundImage:Laya.Image)`：更新背景各障碍物的位置（在构造Barriers类对象的时候会先初始化一次）。
+ `drawBarriers()`：将障碍物的动画和图像绘制到背景上。
+ `constructor(backgroundImage:Laya.Image,width:number,height:number,name:string)`：构造函数。
+ `randomGenerate(backgroundImage:Laya.Image)`：障碍物随机生成在背景某处。
+ `drawItem()`：将障碍物的动画或图像绘制到背景上。（abstract）
+ `detectCollisions(ball:Ball)`：检测item与球类的碰撞。（abstract）
+ `update()`：更新item位置。
+ `getInnerBounds(itemRec:Laya.Rectangle, xScale:number, yScale:number)`：获取图片区域有效区域。

### Ball(球类)
**public property**
+ `x,y`:获取球的位置
+ `vx,vy`:获取球的速度
+ `radius`:获取球的半径
+ `image`:获取球的图片Laya.Image
+ `animation`:获取球的动画

**public method**
+ `setForce(Fx: number, Fy: number, name: string)`:对小球增加受力，Fx/Fy分别为水平和数值方向的分量,name为该力的种类
+ `removeForce(name:string)`:移除小球名字为name的力
+ `collide(xRatio:number, yRatio:number)`:碰撞会改变小球的速度分量，使原先的<Vx,Vy>变成<Vx * xRatio, Vy * yRatio>
+ `update()`:对小球的位置和速度进行更新
+ `pause()`：使小球静止
+ `restart()`：使小球重新开始运动
+ `drawNormalBall()`：绘制小球普通状态的动画

### ScoreIndicator(计分器)
**public property**
@ -106,8 +122,31 @@
+ `turnOff():void`:关闭声音
+ `turnOn():void`:重新打开声音

### BarriersManagement(障碍物管理器)
**public property**
+ `blackHoles`:存黑洞的数组
+ `stones`:存陨石的数组
+ `zodiacs`:存星座的数组

**public method**
+ `regenerateBarrier(backgroundImage:Laya.Image)`:重新生成屏幕上所有障碍物
+ `drawBarriers()`:绘制各障碍物的动画或图像
+ `updateBarriers()`:刷新各障碍物的动画或图像

### GameView
**public method**
+ `gamePause`:暂停游戏
+ `gameRestart`:恢复此前暂停的游戏
+ `gameRestart`:恢复此前暂停的游戏

### EndView
**public method**
+ `init()`:结束界面还原初始化设置
+ `showEnd()`:显示结束的缓动动画

### GameMain
**public method**
+ `createEvents()`:创建各种响应时间
+ `toOnePlayerGameView()`:到单人游戏界面
+ `toTwoPlayersGameView()`:到双人游戏界面
+ `toEndView()`:到结束界面
+ `toStartView`：到开始界面

### ScoreIndicator(计分器)
**public property**
+ `data`:获取当前的分数
**public method**
+ `updateHeight(height:number)`:根据高度的变化记录奖励
+ `clearHeight()`:清空此前记录的高度
+ `gerReward(reward: number)`:接受奖励
+ `getPenalty(penalty: number)`:接受惩罚

### MusicManager(音乐管理器)
**public property**
+ `data`:获取当前的分数

**public method**
+ `onPlaySound(url:string)`:播放特殊音效，url可取值见包括Game.BlackHoleCollisionSound(和黑洞撞击)，Game.StoneCollisionSound(和岩石撞击的声音)
+ `turnOff():void`:关闭声音
+ `turnOn():void`:重新打开声音

### GameView
**public method**
+ `gamePause`:暂停游戏
+ `gameRestart`:恢复此前暂停的游戏

