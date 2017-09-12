import Timestamp from './Timestamp.js';
import Circle from './Circle.js';
import Square from './Square.js';

const PARTICLE_VOLUME = 7;
const GRAIN_DURATION = 300;
const GRAIN_SPACE = 5;
const GRAIN_REMOVE = 5;
const CIRCLE_RADIUS = 20;
const CIRCLE_LINE_WIDTH = 2;
const SQUARE_WIDTH = 40;
const SQUARE_HEIGHT = 25;

export default class Particle {
  constructor (opts = {}) {
    this.x = opts.x;
    this.y = opts.y;
    this.method = opts.method;
    this.color = opts.color;

    this.painter = opts.painter;
    this.timestamp = new Timestamp({
    });// end timestamp
    this.grains = [];
    this.flg = false;

    this.timestamp.addTime();
  }// end constructor

  addParticle () {
    if (!this.grains.length) {
      // this.grains.push(new Circle({
      //   painter: this.painter,
      //   x: this.x,
      //   y: this.y,
      //   r: CIRCLE_RADIUS,
      //   w: CIRCLE_LINE_WIDTH
      // }));// end push
      this.grains.push(new Square({
        painter: this.painter,
        x: this.x,
        y: this.y,
        w: SQUARE_WIDTH,
        h: SQUARE_HEIGHT
      }));// end push
    }// end if

    switch (this.method) {
      case 'vertical':
        this.verticalDream();
        break;
      case 'horizontal':
        this.horizontalDream();
        break;
      case 'swim':
        this.horizontalDream();
        break;
      default:
        break;
    }// switch

    this.confirmCompletion();
  }// addParticle

  verticalDream () {
    const time = this.timestamp.calcTime();
    let baseV;
    let v1;
    let v2;

    this.grains.forEach((key, index, array) => {
      baseV = (time - GRAIN_DURATION * index) / GRAIN_DURATION;
      v1 = baseV >= 1 ? 1 : baseV;
      v2 = baseV >= GRAIN_REMOVE ? GRAIN_REMOVE : baseV;

      if (this.grains.length != PARTICLE_VOLUME) {
        if (v1 >= 1 && this.grains.length == index + 1) {
          // array.push(new Circle({
          //   painter: this.painter,
          //   x: this.x,
          //   y: this.y + ((CIRCLE_RADIUS + GRAIN_SPACE) * 2 * (index + 1)),
          //   r: CIRCLE_RADIUS,
          //   w: CIRCLE_LINE_WIDTH
          // }));// end push
          array.push(new Square({
            painter: this.painter,
            x: this.x,
            y: this.y + (SQUARE_HEIGHT + GRAIN_SPACE) * (index + 1),
            w: SQUARE_WIDTH,
            h: SQUARE_HEIGHT,
            color: this.color
          }));// end push
        }// end if
      }// end if

      // key.addCircle(v);
      key.addSquare(v1, v2, GRAIN_REMOVE);
    });// forEach
  }// end verticalDream

  horizontalDream () {
    const time = this.timestamp.calcTime();
    let baseV;
    let v1;
    let v2;

    this.grains.forEach((key, index, array) => {
      baseV = (time - GRAIN_DURATION * index) / GRAIN_DURATION;
      v1 = baseV >= 1 ? 1 : baseV;
      v2 = baseV >= GRAIN_REMOVE ? GRAIN_REMOVE : baseV;

      if (this.grains.length != PARTICLE_VOLUME) {
        if (v1 >= 1 && this.grains.length == index + 1) {
          // array.push(new Circle({
          //   painter: this.painter,
          //   x: this.x + ((CIRCLE_RADIUS + GRAIN_SPACE) * 2 * (index + 1)),
          //   y: this.y,
          //   r: CIRCLE_RADIUS,
          //   w: CIRCLE_LINE_WIDTH
          // }));// end push
          array.push(new Square({
            painter: this.painter,
            x: this.x + (SQUARE_WIDTH + GRAIN_SPACE) * (index + 1),
            y: this.y,
            w: SQUARE_WIDTH,
            h: SQUARE_HEIGHT,
            color: this.color
          }));// end push
        }// end if
      }// end if

      // key.addCircle(v);
      key.addSquare(v1, v2, GRAIN_REMOVE);
    });// forEach
  }// end horizontalDream

  swimDream () {
  }// end swimDream

  confirmCompletion () {
    const time = this.timestamp.calcTime();

    if (time >= GRAIN_DURATION * (PARTICLE_VOLUME + GRAIN_REMOVE))
      this.flg = true;
  }// end confirmCompletion

  getNotice () {
    return this.flg;
  }// end getNotice
};// end Particle