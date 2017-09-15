import Painter from './Painter.js';
import Line from './Line.js';
import Particle from './Particle.js';
import Fireworks from './Fireworks.js';

const RED_LIMIT = 0;
const GREEN_LIMIT = 100;
const BLUE_LIMIT = 100;
const FIREWORKS_PROB = 50;
const FIREWORKS_VOLUME = 300;
const FIREWORKS_LIMIT = 3;
const PARTICLE_PROB = 20;
const PARTICLE_LIMIT = 10;
const ROW_LINES = 10;
const COL_LINES = 10;
const LINE_WIDTH = 2;
const TITLE_COLOR = {
  R: 0,
  G: 0,
  B: 0
}// end TITLE_COLOR
const MOVIE_COLOR = {
  R: 0,
  G: 0,
  B: 0
}// end MOVIE_COLOR
const START_COLOR = {
  R: 50,
  G: 0,
  B: 0
}// end START_COLOR
const QUIZ_COLOR = {
  R: 0,
  G: 100,
  B: 100
}// end BG_COLOR
const ENDING_COLOR = {
  R: 0,
  G: 0,
  B: 50
}// end START_COLOR
const START_PARTICLE_COLOR = {
  R: 255,
  G: 200,
  B: 50
}// end START_PARTICLE_COLOR
const QUIZ_PARTICLE_COLOR = {
  R: 255,
  G: 216,
  B: 45
}// end QUIZ_PARTICLE_COLOR
const FIREWORKS_COLORS = [
  {
    R: 150,
    G: 255,
    B: 255
  },
  {
    R: 255,
    G: 200,
    B: 200
  },
  {
    R: 200,
    G: 255,
    B: 200
  },
  {
    R: 255,
    G: 255,
    B: 100,
  },
  {
    R: 255,
    G: 100,
    B: 100
  },
  {
    R: 100,
    G: 255,
    B: 100
  },
  {
    R: 255,
    G: 200,
    B: 50
  },
];

export default class BackGround {
  constructor (opts = {}) {
    this.elements = [];
    this.w = opts.w;
    this.h = opts.h;

    this.color = {
      r: 0,
      g: 0,
      b: 0
    }// end color
    this.target = {
      r: QUIZ_COLOR.R,
      g: QUIZ_COLOR.G,
      b: QUIZ_COLOR.B
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
        this.paintBackGround(this.color, {r: TITLE_COLOR.R, g: TITLE_COLOR.G, b: TITLE_COLOR.B});
        this.gridMove();
        break;
      case book.MOVIE:
        this.paintBackGround(this.color, {r: MOVIE_COLOR.R, g: MOVIE_COLOR.G, b: MOVIE_COLOR.B});
        break;
      case book.START:
        this.paintBackGround(this.color, {r: START_COLOR.R, g: START_COLOR.G, b: START_COLOR.B});
        this.particleExpand({r: START_PARTICLE_COLOR.R, g: START_PARTICLE_COLOR.G, b: START_PARTICLE_COLOR.B});
        break;
      case book.QUIZ:
        this.paintBackGround(this.color, this.target);
        this.particleExpand({r: QUIZ_PARTICLE_COLOR.R, g: QUIZ_PARTICLE_COLOR.G, b: QUIZ_PARTICLE_COLOR.B});
        break;
      case book.ENDING:
        this.paintBackGround(this.color, {r: ENDING_COLOR.R, g: ENDING_COLOR.G, b: ENDING_COLOR.B});
        this.fireworksExpand();
        break;
      case book.BAD:
        this.paintBackGround(this.color, {r: MOVIE_COLOR.R, g: MOVIE_COLOR.G, b: MOVIE_COLOR.B});
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
      const rand1 = Math.floor(Math.random() * FIREWORKS_COLORS.length);
      const rand2 = Math.floor(Math.random() * FIREWORKS_COLORS.length);

      this.elements.push(new Fireworks({
        x: x,
        y: y,
        volume: FIREWORKS_VOLUME,
        color1: {r: FIREWORKS_COLORS[rand1].R, g: FIREWORKS_COLORS[rand1].G, b: FIREWORKS_COLORS[rand1].B},
        color2: {r: FIREWORKS_COLORS[rand2].R, g: FIREWORKS_COLORS[rand2].G, b: FIREWORKS_COLORS[rand2].B},
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