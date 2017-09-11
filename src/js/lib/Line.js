export default class Line {
  constructor (opts = {}) {
    this.x = opts.x;
    this.y = opts.y;
    this.lineW = opts.lineW;
    this.point = opts.point;
  }// end constructor

  calcPoint (opts = {}) {
    if (this.point == (this.x == 0 ? this.y : this.x)) {
      const mult = this.x == 0 ? opts.h : opts.w;
      this.point = Math.floor(Math.random() * (mult - 1) + 1);
    }// end if
  }// end calcPoint
};// end Line