import Timestamp from './Timestamp.js';
import Ball from './Ball';

const INITIAL_SIZE = 40;// 直径
const FIREWORKS_DURATION = 1000;
const FIREWORKS_FADEOUT = 250;
const FIREWORKS_VOLUME = 300;
const SPREAD = 6.5;
const GRAVITY = 1.15;
const BALL_SIZE = 3;
const LOCUS_LIMIT = 11;
const LOCUS_COE = 0.3;
const START_COLOR = {
  R: 150,
  G: 255,
  B: 255
}// end START_COLOR
const END_COLOR = {
  R: 255,
  G: 200,
  B: 200
}// end END_COLOR

export default class Fireworks {

  constructor (opts = {}) {
    this.x = opts.x; // x座標
    this.y = opts.y; // y座標
    this.volume = opts.volume; // 花火を形成する玉の個数
    this.balls = [];// 花火を形成する玉の入れ物
    this.flg = false;

    this.painter = opts.painter;
    this.timestamp = new Timestamp({});

    this.addBalls();
    this.timestamp.addTime();
  }// end constructor

  addFireworks () {
    const time = this.timestamp.calcTime();
    let x = 0;
    let y = 0;
    let alpha = 0;
    let v1 = time / FIREWORKS_DURATION;
    let v2 = (time - FIREWORKS_DURATION + FIREWORKS_FADEOUT) / FIREWORKS_FADEOUT;
    v1 = v1 >= 1 ? 1 : v1;
    v2 = v2 >= 0 ? v2 : 0;
    v2 = v2 >= 1 ? 1 : v2;

    this.balls.forEach((ball, index, array) => {
      if (v1 != 1)
        ball.pointY += GRAVITY;

      x = ball.x + ball.pointX * v1;
      y = ball.y + ball.pointY * v1;

      this.painter.ctx.save();
      ball.pastX.forEach((PointX, pIndex, xPoints) => {
        alpha = (1 - v2) * (pIndex / xPoints.length * LOCUS_COE);

        this.painter.ctx.fillStyle = ball.color;
        this.painter.ctx.globalAlpha = alpha;
        this.painter.drawCircle({
          x: PointX,
          y: ball.pastY[pIndex],
          r: ball.size,
          method: 'fill'
        });
      })// end forEach
      this.painter.ctx.restore();

      if (ball.pastX.length >= LOCUS_LIMIT) {
        ball.pastX.shift();
        ball.pastY.shift();
      }// end if

      ball.pastX.push(x);
      ball.pastY.push(y);
    });// end forEach

    if (time > FIREWORKS_DURATION)
      this.flg = true;
  }// end addFireworks

  addBalls () {
    let x;
    let y;
    let distance;
    let angle;
    let color;
    let pointX;
    let pointY;
    let index;

    for (let i = 0, size = this.volume; i < size; ++i) {
      [x, y, distance] = this.calcStartPoint(this.x, this.y);

      this.balls.push(new Ball({
        x: x,
        y: y,
        color: '',
        size: BALL_SIZE
      }));// end push

      [angle, color, pointX, pointY] = this.inveParam(x, y, distance);
      index = this.balls.length - 1;
      this.balls[index].distance = distance;
      this.balls[index].angle = angle;
      this.balls[index].color = color;
      this.balls[index].pointX = pointX;
      this.balls[index].pointY = pointY;
      this.balls[index].pastX.push(x);
      this.balls[index].pastY.push(y);
    }// end for
  }// end addBalls

  calcStartPoint (x1, y1) {
    let x2 = 0;
    let y2 = 0;
    let distance = 0;

    while (true) {
      x2 = Math.floor(Math.random() * INITIAL_SIZE + (x1 - INITIAL_SIZE * 0.5));
      y2 = Math.floor(Math.random() * INITIAL_SIZE + (y1 - INITIAL_SIZE * 0.5));
      distance = getDistanceFromPoints({x: x1, y: y1}, {x: x2, y: y2});

      if (distance <= INITIAL_SIZE * 0.5)
        break
    }// end for

    return [x2, y2, distance];
  }// end calcStartPoint

  inveParam (argX, argY, distance) {
    const angle = getAngleFromPoints({x: this.x, y: this.y}, {x: argX, y: argY});
    const [x, y] = getPoint(angle, distance * SPREAD);
    const color = this.separatColor(distance);

    return [angle, color, x, y];
  }// end inveParam

  separatColor (distance) {
    if (distance > INITIAL_SIZE * 0.5 * 0.6)
      return 'rgb('+ END_COLOR.R +','+ END_COLOR.G +','+ END_COLOR.B +')';
    else
      return 'rgb('+ START_COLOR.R +','+ START_COLOR.G +','+ START_COLOR.B +')';
  }// end separatColor

  getNotice () {
    return this.flg;
  }// end getNotice
};// end Fireworks

function getAngleFromPoints(p1, p2) {
  const radian = Math.atan2(p2.y - p1.y, p2.x - p1.x);
  return radian;
}// end getAngleFromPoints

function getDistanceFromPoints(p1, p2) {
  const distance = Math.abs(Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2)));
  return distance;
}// end getDistanceFromPoints

function getPoint(angle, distance) {
  const x = Math.cos(angle) * distance;
  const y = Math.sin(angle) * distance;
  return [x, y];
}// end getPoint