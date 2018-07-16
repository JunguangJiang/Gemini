// namespace Game{
//     export const fallingStoneImage: string = "res/atlas/ui/fallingStone.png"
// }
// //坠落的陨石类
// class FallingStone extends Stone{
//     constructor(backgroundImage:Laya.Image,width:number,height:number,name:string)
//     {
//         super(backgroundImage,width,height,name);
//         // this.item = new Laya.Image();
//     }
//     //绘制item
//     public drawItem():void
//     {
//         this.item.loadImage(Game.fallingStoneImage);
//         this.item.scaleX=this._width/200;
//         this.item.scaleY=this._height/200;
//     }
// }
// //坠落的陨石类
// class FallingStone extends Barrier<Laya.Image>{
//     constructor(backgroundImage:Laya.Image,width:number,height:number,name:string)
//     {
//         super(backgroundImage,width,height,name);
//         this.item = new Laya.Image();
//     }
//     // //绘制item
//     // public drawItem():void
//     // {
//     //     this.item.loadImage(Game.fallingStoneImage);
//     //     this.item.scaleX=this._width/200;
//     //     this.item.scaleY=this._height/200;
//     // }
//     //绘制item
//     public drawItem():void
//     {
//         this.item.loadImage(Game.fallingStoneImage);
//         this.item.scaleX=this._width/600;
//         this.item.scaleY=this._height/600;
//     }
//     //判断球是否与陨石相撞，0为不相撞，1为上下碰撞，2为左右碰撞
//      public detectCollisions(ball:Ball):number
//      {
//         let ballRec=new Laya.Rectangle(ball.x-ball.radius,ball.y-ball.radius,ball.radius*2,ball.radius*2);
//         //判断是否与障碍物碰撞反弹(先判断上下方向再判断左右方向)
//         let itemRec=this.item.getBounds();
//         itemRec=itemRec.setTo(itemRec.x+itemRec.width/10,itemRec.y+itemRec.height/10,itemRec.width*4/5,itemRec.height*4/5);
//         let inStone:number=0;//无碰撞是0，上下方向是1，左右方向是2
//         if((ballRec.x>=itemRec.x-ballRec.width)&&(ballRec.right<=itemRec.right+ballRec.width))
//         {
//             if(((ballRec.bottom>=itemRec.y)&&(ballRec.y<itemRec.y)&&(ball.vy>0))||//向上反弹
//             ((ballRec.y<=itemRec.bottom)&&(ballRec.bottom>itemRec.bottom)&&(ball.vy<0)))//向下反弹
//             {
//                 inStone=1;
//             }
//         }
//         if((ballRec.y>=itemRec.y-ballRec.height)&&(ballRec.bottom<=itemRec.bottom+ballRec.height))//向左反弹
//         {
//             if(((ballRec.right>=itemRec.x)&&(ballRec.x<itemRec.x)&&(ball.vx>0))||//向左反弹
//             ((ballRec.x<=itemRec.right)&&(ballRec.right>itemRec.right)&&(ball.vx<0)))//向右反弹
//             {
//                 inStone=2;
//             }
//         }
//         return inStone;
//      }
// }
//# sourceMappingURL=FallingStone.js.map