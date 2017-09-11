import Painter from './Painter.js';
import Line from './Line.js';
import Particle from './Particle.js';

const RED_LIMIT = 10;
const GREEN_LIMIT = 150;
const BLUE_LIMIT = 150;
const PARTICLE_PROB = 20;
const PARTICLE_LIMIT = 8;
const ROW_LINES = 10;
const COL_LINES = 10;
const LINE_WIDTH = 2;

let bgColor = {
  r: 5,
  g: 52,
  b: 55
}// end bgColor
let afterColor = {
  r: bgColor.r,
  g: bgColor.g,
  b: bgColor.b
}// end afterColor

export default class BackGround {
  constructor (opts = {}) {
    this.elements = [];
    this.w = opts.w;
    this.h = opts.h;

    this.painter = new Painter({
      canvas: opts.canvas,
      w: opts.w,
      h: opts.h
    });// end Painter
  }// end constructor

  addBackGround () {
    this.paintBackGround(bgColor, afterColor);
    this.particleExpand();
    // gridMove(lines);
  }// end addBackGround

  changeColor (palette) {
    palette.r = Math.floor(Math.random() * RED_LIMIT);
    palette.g = Math.floor(Math.random() * GREEN_LIMIT);
    palette.b = Math.floor(Math.random() * BLUE_LIMIT);

    return palette;
  }// end changeColor

  paintBackGround (palette1, palette2) {
    if (palette1.r - palette2.r != 0)
      palette1.r += (palette1.r - palette2.r > 0 ? -1 : 1);
    if (palette1.g - palette2.g != 0)
      palette1.g += (palette1.g - palette2.g > 0 ? -1 : 1);
    if (palette1.b - palette2.b != 0)
      palette1.b += (palette1.b - palette2.b > 0 ? -1 : 1);

    this.painter.ctx.fillStyle = 'rgb('+ palette1.r +','+ palette1.g +','+ palette1.b +')';
    this.painter.ctx.fillRect(0, 0, this.w, this.h);
  }// end paintBackGround

  particleExpand () {
    const birth = Math.floor(Math.random() * PARTICLE_PROB);

    if (!birth && this.elements.length < PARTICLE_LIMIT) {
      let method;

      switch (Math.floor(Math.random() * 3)) {
        case 0:
          method = 'vertical';
          break;
        case 1:
          method = 'horizontal';
          break;
        case 2:
          method = 'swim';
          break;
        default:
          break;
      }// switch

      this.elements.push(new Particle({
        x: Math.floor(Math.random() * this.w),
        y: Math.floor(Math.random() * this.h),
        method: method,
        painter: this.painter
      }));// end push
    }// end if

    this.elements.forEach((particle, index, array) => {
      particle.addParticle();
    });// end forEach

    this.elements.forEach((particle, index, array) => {
      if (particle != null)// エラー回避
        if (particle.getNotice())
          this.elements.shift();
    });// end forEach
  }// end particleExpand

  gridExpand () {
    let x;
    let y;
    let mult;
    let point;
    let w;

    for (let i = 0, size = ROW_LINES + COL_LINES; i < size; ++i) {
      x = i < ROW_LINES ? 0 : Math.floor(Math.random() * this.w);
      y = i < ROW_LINES ? Math.floor(Math.random() * this.h) : 0;
      mult = x == 0 ? this.h : this.w;
      point = Math.floor(Math.random() * (mult - 1) + 1);
      w = Math.floor(Math.random() * LINE_WIDTH + 1);

      this.elements.push(new Line({
        x: x,
        y: y,
        lineW: w,
        point: point
      }));// end push
    }// end for
  }// end gridExpand

  gridMove () {
    let endX;
    let endY;

    this.elements.forEach((key, index, array) => {
      if (key.x == 0) {
        key.y += (key.y < key.point ? 1 : -1);
        endY = key.y;
        endX = this.w;
      } else {
        key.x += (key.x < key.point ? 1 : -1);
        endX = key.x;
        endY = this.h;
      }// end if

      painter.drawLine({
        x1: key.x,
        y1: key.y,
        x2: endX,
        y2: endY,
        w: key.lineW
      });// end drawLine
    });// end forEach
  }// end gridMove
};// end BackGround