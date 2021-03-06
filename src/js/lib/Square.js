const ALPHA = 0.8;

export default class Square {
  constructor (opts = {}) {
    this.painter = opts.painter;
    this.x = opts.x;
    this.y = opts.y;
    this.w = opts.w;
    this.h = opts.h;
    this.color = opts.color;
  }// end constructor

  addSquare (v1, v2, volume) {
    const v = v2 >= (volume - 1) ? volume - v2 : v1;
    const drawWidth = this.w * v;
    const drawHeight = this.h * v;
    const x = this.x + (this.w - drawWidth) * 0.5;
    const y = this.y + (this.h - drawHeight) * 0.5;

    this.painter.ctx.save();
    this.painter.ctx.globalAlpha = ALPHA;
    this.painter.ctx.strokeStyle = 'rgb('+ this.color.r +','+ this.color.g +','+ this.color.b +')'
    this.painter.drawSquare({
      x: x,
      y: y,
      w: drawWidth,
      h: drawHeight
    });// end drawSquare
    this.painter.ctx.restore();
  }// end addSquare
};// end Square