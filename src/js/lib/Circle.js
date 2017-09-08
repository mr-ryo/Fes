export default class Circle {
  constructor (opts = {}) {
    this.painter = opts.painter;
    this.x = opts.x;
    this.y = opts.y;
    this.r = opts.r;
    this.w = opts.w;
  }// end constructor

  addCircle (v) {
    const drawRadius = this.r * v;

    this.painter.drawCircle({
      x: this.x,
      y: this.y,
      r: drawRadius,
      w: this.w
    });// end drawCircle
  }// end addCircle
};// end Circle