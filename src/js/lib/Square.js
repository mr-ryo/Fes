export default class Square {
  constructor (opts = {}) {
    this.painter = opts.painter;
    this.x = opts.x;
    this.y = opts.y;
    this.w = opts.w;
    this.h = opts.h;
  }// end constructor

  addSquare (v) {
    const drawWidth = this.w * v;
    const drawHeight = this.h * v;

    this.painter.drawSquare({
      x: this.x,
      y: this.y,
      w: drawWidth,
      h: drawHeight
    });// end drawSquare
  }// end addSquare
};// end Square