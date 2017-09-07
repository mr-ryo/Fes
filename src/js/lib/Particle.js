import Timestamp from './Timestamp.js';
import Circle from './Circle.js';

const CIRCLE_DURATION = 300;
const CIRCLE_RADIUS = 20;
const CIRCLE_LINE_WIDTH = 2;
const CIRCLE_SPACE = 5;
const PARTICLE_VOLUME = 7;

export default class Particle {
  constructor (opts = {}) {
    this.x = opts.x;
    this.y = opts.y;
    this.method = opts.method;
    this.painter = opts.painter;
    this.timestamp = new Timestamp({
    });// end timestamp
    this.circles = [];
    this.flg = false;

    this.timestamp.addTime();
  }// end constructor

  addParticle () {
    if (!this.circles.length) {
      this.circles.push(new Circle({
        painter: this.painter,
        x: this.x,
        y: this.y,
        r: CIRCLE_RADIUS,
        w: CIRCLE_LINE_WIDTH
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
    let v;

    this.circles.forEach((key, index, array) => {
      v = (time - CIRCLE_DURATION * index) / CIRCLE_DURATION;
      v = v >= 1 ? 1 : v;

      if (this.circles.length != PARTICLE_VOLUME) {
        if (v >= 1 && this.circles.length == index + 1) {
          array.push(new Circle({
            painter: this.painter,
            x: this.x,
            y: this.y + ((CIRCLE_RADIUS + CIRCLE_SPACE) * 2 * (index + 1)),
            r: CIRCLE_RADIUS,
            w: CIRCLE_LINE_WIDTH
          }));// end push
        }// end if
      }// end if

      key.addCircle(v);
    });// forEach
  }// end verticalDream

  horizontalDream () {
    const time = this.timestamp.calcTime();
    let v;

    this.circles.forEach((key, index, array) => {
      v = (time - CIRCLE_DURATION * index) / CIRCLE_DURATION;
      v = v >= 1 ? 1 : v;

      if (this.circles.length != PARTICLE_VOLUME) {
        if (v >= 1 && this.circles.length == index + 1) {
          array.push(new Circle({
            painter: this.painter,
            x: this.x + ((CIRCLE_RADIUS + CIRCLE_SPACE) * 2 * (index + 1)),
            y: this.y,
            r: CIRCLE_RADIUS,
            w: CIRCLE_LINE_WIDTH
          }));// end push
        }// end if
      }// end if

      key.addCircle(v);
    });// forEach
  }// end horizontalDream

  swimDream () {
  }// end swimDream

  confirmCompletion () {
    const time = this.timestamp.calcTime();

    if (time >= CIRCLE_DURATION * PARTICLE_VOLUME)
      this.flg = true;
  }// end confirmCompletion

  getNotice () {
    return this.flg;
  }// end getNotice
};// end Particle