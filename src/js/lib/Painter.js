const TIME_LENGTH = 5;

const RESOURCE_PATH = '../images/';
const COMMON_PATH = 'common/';
const NUMBERS_PATH = 'numbers/';
const ALPHABETS_PATH = 'alphabets/';

const DREAM_COLOR = 'rgb(255, 216, 45)';

export default class Painter {
  constructor (opts = {}) {
    this.canvas = opts.canvas;
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = opts.w;
    this.canvas.height = opts.h;

    this.resource = {
      grid: RESOURCE_PATH + COMMON_PATH +'grid.png',
      ring: RESOURCE_PATH + COMMON_PATH +'ring.png',
      dot: RESOURCE_PATH + NUMBERS_PATH +'dot.png',
      number0: RESOURCE_PATH + NUMBERS_PATH +'number0.png',
      number1: RESOURCE_PATH + NUMBERS_PATH +'number1.png',
      number2: RESOURCE_PATH + NUMBERS_PATH +'number2.png',
      number3: RESOURCE_PATH + NUMBERS_PATH +'number3.png',
      number4: RESOURCE_PATH + NUMBERS_PATH +'number4.png',
      number5: RESOURCE_PATH + NUMBERS_PATH +'number5.png',
      number6: RESOURCE_PATH + NUMBERS_PATH +'number6.png',
      number7: RESOURCE_PATH + NUMBERS_PATH +'number7.png',
      number8: RESOURCE_PATH + NUMBERS_PATH +'number8.png',
      number9: RESOURCE_PATH + NUMBERS_PATH +'number9.png',
      a: RESOURCE_PATH + ALPHABETS_PATH + 'a.png',
      b: RESOURCE_PATH + ALPHABETS_PATH + 'b.png',
      c: RESOURCE_PATH + ALPHABETS_PATH + 'c.png',
      d: RESOURCE_PATH + ALPHABETS_PATH + 'd.png',
      e: RESOURCE_PATH + ALPHABETS_PATH + 'e.png',
      f: RESOURCE_PATH + ALPHABETS_PATH + 'f.png',
      g: RESOURCE_PATH + ALPHABETS_PATH + 'g.png',
      h: RESOURCE_PATH + ALPHABETS_PATH + 'h.png',
      i: RESOURCE_PATH + ALPHABETS_PATH + 'i.png',
      j: RESOURCE_PATH + ALPHABETS_PATH + 'j.png',
      k: RESOURCE_PATH + ALPHABETS_PATH + 'k.png',
      l: RESOURCE_PATH + ALPHABETS_PATH + 'l.png',
      m: RESOURCE_PATH + ALPHABETS_PATH + 'm.png',
      n: RESOURCE_PATH + ALPHABETS_PATH + 'n.png',
      o: RESOURCE_PATH + ALPHABETS_PATH + 'o.png',
      p: RESOURCE_PATH + ALPHABETS_PATH + 'p.png',
      q: RESOURCE_PATH + ALPHABETS_PATH + 'q.png',
      r: RESOURCE_PATH + ALPHABETS_PATH + 'r.png',
      s: RESOURCE_PATH + ALPHABETS_PATH + 's.png',
      t: RESOURCE_PATH + ALPHABETS_PATH + 't.png',
      u: RESOURCE_PATH + ALPHABETS_PATH + 'u.png',
      v: RESOURCE_PATH + ALPHABETS_PATH + 'v.png',
      w: RESOURCE_PATH + ALPHABETS_PATH + 'w.png',
      x: RESOURCE_PATH + ALPHABETS_PATH + 'x.png',
      y: RESOURCE_PATH + ALPHABETS_PATH + 'y.png',
      z: RESOURCE_PATH + ALPHABETS_PATH + 'z.png',
    }// end resource
  }// end constructor

  clearCanvas () {
    const loop = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      window.requestAnimationFrame(loop);
    }// end loop

    window.requestAnimationFrame(loop);
  }// end clearCanvas

  alignImage (img, opts = {}) {
    const image = new Image();
    image.src = img;
    const scale = isNaN(opts.scale) ? 1 : opts.scale;
    const offsetX = isNaN(opts.offsetX) ? 0 : opts.offsetX;
    const offsetY = isNaN(opts.offsetY) ? 0 : opts.offsetY;
    let x = isNaN(opts.x) ? 0 : opts.x;
    let y = isNaN(opts.y) ? 0 : opts.y;
    let drawWidth;
    let drawHeight;

    switch (opts.fit) {
      case 'width':
        drawWidth = this.canvas.width;
        drawHeight = this.canvas.width * (image.height / image.width);
        break;
      case 'height':
        drawWidth = this.canvas.height * (image.width / image.height);
        drawHeight = this.canvas.height;
        break;
      default:
        drawWidth = image.width;
        drawHeight = image.height;
        break;
    }// end switch

    drawWidth *= scale;
    drawHeight *= scale;
    x = offsetX + (this.canvas.width - drawWidth) * x;
    y = offsetY + (this.canvas.height - drawHeight) * y;

    this.ctx.drawImage(
      image,
      x,
      y,
      drawWidth,
      drawHeight
    );// end drawImage
  }// end alignImage

  sharpImage (img, opts = {}) {
    const image = new Image();
    image.src = img;
    const offsetX = isNaN(opts.offsetX) ? 0 : opts.offsetX;
    const offsetY = isNaN(opts.offsetY) ? 0 : opts.offsetY;
    let w = isNaN(opts.w) ? 0 : opts.w;
    let h = isNaN(opts.h) ? 0 : opts.h;
    let drawWidth;
    let drawHeight;

    switch (opts.basisSize) {
      case 'width':
        drawWidth = w;
        drawHeight = w * (image.height / image.width);
        break;
      case 'height':
        drawWidth = h * (image.width / image.height);
        drawHeight = h;
        break;
      default:
        drawWidth = image.width;
        drawHeight = image.height;
        break;
    }// end switch

    let x = offsetX + (opts.basisX == 'left' ? 0 : this.canvas.width - drawWidth);
    let y = offsetY + (opts.basisY == 'top' ? 0 : this.canvas.height - drawHeight);

    this.ctx.drawImage(
      image,
      x,
      y,
      drawWidth,
      drawHeight
    );// end drawImage
  }// end sharpImage

  tickTime (time, opts = {}) {
    const str = time.split('');
    const drawWidth = opts.w / TIME_LENGTH;
    const offsetX = isNaN(opts.offsetX) ? 0 : opts.offsetX;
    const offsetY = isNaN(opts.offsetY) ? 0 : opts.offsetY;
    let src;
    let x;

    if (str.length == 1) {
      this.alignImage(this.resource['number'+ str[0]], {
        x: 0.5,
        y: 0.5,
        fit: 'height'
      });// end alignImage

      return;
    }// end if

    for (let i = 0, size = TIME_LENGTH; i < size; ++i) {

      if (str[i] == null)
        break;
      else if (str[i] == '.')
        src = this.resource.dot;
      else
        src = this.resource['number'+ str[i]];

      switch (opts.basisX) {
        case 'left':
          x = offsetX + drawWidth * i;
          break;
        case 'right':
          x = offsetX + drawWidth * -(size - i);
          break;
        default:
          x = 0;
          break;
      }// end switch

      this.sharpImage(src, {
        basisX: opts.basisX,
        basisY: opts.basisY,
        offsetX: x,
        offsetY: offsetY,
        basisSize: 'width',
        w: drawWidth,
        h: 0
      });// end sharpImage
    }// end for
  }// end tickTime

  drawLine (opts = {}) {
    const w = isNaN(opts.w) ? 1 : opts.w;

    this.ctx.save();
    this.ctx.globalAlpha = 0.6;
    this.ctx.lineWidth = w;
    this.ctx.strokeStyle = DREAM_COLOR;
    this.ctx.beginPath();
    this.ctx.moveTo(opts.x1, opts.y1);
    this.ctx.lineTo(opts.x2, opts.y2);
    this.ctx.stroke();
    this.ctx.restore();
  }// end drawLine

  drawCircle (opts = {}) {
    const x = isNaN(opts.x) ? 0 : opts.x;
    const y = isNaN(opts.y) ? 0 : opts.y;
    const r = isNaN(opts.r) ? 0 : opts.r;
    const w = isNaN(opts.w) ? 0 : opts.w;
    const alpha = isNaN(opts.alpha) ? 1 : opts.alpha;
    const startAngle = 0;
    const endAngle = 360 * Math.PI / 180;

    this.ctx.save();
    this.ctx.globalAlpha = alpha;
    this.ctx.lineWidth = w;
    this.ctx.strokeStyle = DREAM_COLOR;
    this.ctx.beginPath();
    this.ctx.arc(x, y, r, startAngle, endAngle, false);
    this.ctx.stroke();
    this.ctx.restore();
  }// end drawCircle

  drawSquare (opts = {}) {
    const x = isNaN(opts.x) ? 0 : opts.x;
    const y = isNaN(opts.y) ? 0 : opts.y;
    const w = isNaN(opts.w) ? 0 : opts.w;
    const h = isNaN(opts.h) ? 0 : opts.h;

    this.ctx.beginPath();
    this.ctx.rect(x, y, w, h);
    this.ctx.stroke();
  }// end drawSquare
};// end Painter