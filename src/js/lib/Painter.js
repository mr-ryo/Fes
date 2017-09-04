const fontFamily = 'Yu Gothic';
const fontSize = 16;

export default class Painter {
  constructor (opts = {}) {
    this.canvas = opts.canvas;
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = opts.w;
    this.canvas.height = opts.h;
  }// end constructor

  drawing (reserv) {
    for (let i = 0, size = reserv.length; i < size; ++i) {
      if (isNaN(reserv[i])) {
        switch (reserv[i].method) {
          case 'align':
            this.alignImage(reserv[i].src, {
              x: reserv[i].x,
              y: reserv[i].y,
              fit: reserv[i].fit
            });// end alignImage
            break;
          case 'sharp':
            this.sharpImage(reserv[i].src, {
              basisX: reserv[i].basisX,
              basisY: reserv[i].basisY,
              offsetX: reserv[i].offsetX,
              offsetY: reserv[i].offsetY,
              basisSize: reserv[i].basisSize,
              w: reserv[i].w,
              h: reserv[i].h
            });// end sharpImage
            break;
          case 'time':
            break;
          default:
            break;
        }// end switch
      } else {
        this.alignText(reserv[i], {
          x: 10,
          y: 16 * (i + 1)
        });// end alignText
      }// end if
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
    const image = new Image();
    image.src = img;
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

  alignText (str, opts = {}) {
    const x = isNaN(opts.x) ? 0 : opts.x;
    const y = isNaN(opts.y) ? 0 : opts.y;

    this.ctx.font = fontSize +'px '+ fontFamily;
    this.ctx.fillStyle = 'rgb(255, 255, 255)';
    this.ctx.fillText(str, x, y);
  }// end alignText

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
};// end Painter