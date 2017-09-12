import Painter from './Painter.js';
import Line from './Line.js';
import Particle from './Particle.js';
import Fireworks from './Fireworks.js';

const RED_LIMIT = 10;
const GREEN_LIMIT = 100;
const BLUE_LIMIT = 100;
const FIREWORKS_PROB = 100;
const FIREWORKS_VOLUME = 300;
const FIREWORKS_LIMIT = 3;
const PARTICLE_PROB = 20;
const PARTICLE_LIMIT = 10;
const ROW_LINES = 10;
const COL_LINES = 10;
const LINE_WIDTH = 2;
const BG_COLOR = {
  R: 5,
  G: 55,
  B: 55
}// end BG_COLOR

export default class BackGround {
  constructor (opts = {}) {
    this.elements = [];
    this.w = opts.w;
    this.h = opts.h;

    this.color = {
      r: BG_COLOR.R,
      g: BG_COLOR.G,
      b: BG_COLOR.B
    }// end color
    this.target = {
      r: this.color.r,
      g: this.color.g,
      b: this.color.b
    }// end target

    this.painter = new Painter({
      canvas: opts.canvas,
      w: opts.w,
      h: opts.h
    });// end Painter
  }// end constructor

  addBackGround (book, no) {
    switch (no) {
      case book.TITLE:
        if (!this.elements.length)
          this.gridExpand();
        this.paintBackGround({r:0,g:0,b:0}, {r:0,g:0,b:0});
        this.gridMove();
        break;
      case book.MOVIE:
        this.paintBackGround({r:0,g:0,b:0}, {r:0,g:0,b:0});
        break;
      case book.START:
        this.paintBackGround({r:10,g:0,b:50}, {r:10,g:0,b:50});
        this.particleExpand({r: 45, g: 216, b: 255});
        break;
      case book.QUIZ:
        this.paintBackGround(this.color, this.target);
        this.particleExpand({r: 255, g: 216, b: 45});
        break;
      case book.ENDING:
        this.paintBackGround({r:0,g:0,b:50}, {r:0,g:0,b:50});
        this.fireworksExpand();
        break;
      default:
        break;
    }// end switch
  }// end addBackGround

  changeColor () {
    this.target.r = Math.floor(Math.random() * RED_LIMIT);
    this.target.g = Math.floor(Math.random() * GREEN_LIMIT);
    this.target.b = Math.floor(Math.random() * BLUE_LIMIT);
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

  fireworksExpand () {
    const birth = Math.floor(Math.random() * FIREWORKS_PROB);

    if (!birth && this.elements.length < FIREWORKS_LIMIT) {
      const x = Math.floor(Math.random() * this.w);
      const y = Math.floor(Math.random() * this.h);
      this.elements.push(new Fireworks({
        x: x,
        y: y,
        volume: FIREWORKS_VOLUME,
        painter: this.painter
      }));// end push
    }// end if

    let count = 0;
    this.elements.forEach((fireworks, index, array) => {
      fireworks.addFireworks();
      if (fireworks.getNotice())
        ++count;
    });// end forEach

    for (let i = 0, size = count; i < size; ++i) {
      this.elements.shift();
    }// end for
  }// end FireworksExpand

  particleExpand (color) {
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
        color: color,
        painter: this.painter
      }));// end push
    }// end if

    let count = 0;
    this.elements.forEach((particle, index, array) => {
      particle.addParticle();
      if (particle.getNotice())
        ++count;
    });// end forEach

    for (let i = 0, size = count; i < size; ++i) {
      this.elements.shift();
    }// end for
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
      key.calcPoint({
        w: this.w,
        h: this.h
      });// end calcPoint

      if (key.x == 0) {
        key.y += (key.y < key.point ? 1 : -1);
        endY = key.y;
        endX = this.w;
      } else {
        key.x += (key.x < key.point ? 1 : -1);
        endX = key.x;
        endY = this.h;
      }// end if

      this.painter.drawLine({
        x1: key.x,
        y1: key.y,
        x2: endX,
        y2: endY,
        w: key.lineW
      });// end drawLine
    });// end forEach
  }// end gridMove
};// end BackGround