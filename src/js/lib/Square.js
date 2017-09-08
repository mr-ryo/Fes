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
    const x = this.x + (this.w - drawWidth) * 0.5;
    const y = this.y + (this.h - drawHeight) * 0.5;


    this.painter.drawSquare({
      x: x,
      y: y,
      w: drawWidth,
      h: drawHeight
    });// end drawSquare
  }// end addSquare
};// end Square