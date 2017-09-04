const fontFamily = 'Yu Gothic';

export default class Painter {
  constructor (opts = {}) {
    this.canvas = opts.canvas;
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = opts.w;
    this.canvas.height = opts.h;
  }// end constructor

  drawing (reserv) {
    for (let i = 0, size = reserv.length; i < size; ++i) {
      this.alignText(reserv[i], {
        x: 10,
        y: 16 * (i + 1)
      });// end alignText
    }// end for
  }// end drawing

  clearCanvas () {
    const loop = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      window.requestAnimationFrame(loop);
    }// end loop

    window.requestAnimationFrame(loop);
  }// end clearCanvas

  alignImage (img, opts = {}) {
    let x = isNaN(opts.x) ? 0 : opts.x;
    let y = isNaN(opts.y) ? 0 : opts.y;

    switch (opts.fit) {
      case 'witdh':
        const drawWidth = this.canvas.width;
        const drawHeight = this.canvas.height * (img.width / img.height);// ?
        break;
      case 'height':
        const drawWidth = this.canvas.width * (img.width / img.height);// ?
        const drawHeight = this.canvas.height;
        break;
      default:
        const drawWidth = img.width;
        const drawHeight = img.height;
        break;
    }// end switch

    x = (this.canvas.width - drawWidth) * x;
    y = (this.canvas.height - drawHeight) * y;

    this.ctx.drawImage(
      img,
      x,
      y,
      drawWidth,
      drawHeight
    );// end drawImage
  }// end alignImage

  alignText (str, opts = {}) {
    const x = isNaN(opts.x) ? 0 : opts.x;
    const y = isNaN(opts.y) ? 0 : opts.y;

    this.ctx.font = '16px '+ fontFamily;
    this.ctx.fillStyle = 'rgb(255, 255, 255)';
    this.ctx.fillText(str, x, y);
  }// end alignText
};// end Painter