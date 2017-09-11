import json from '../../config/question.json';

import SoundManager from './SoundManager.js';
import Painter from './Painter.js';
import BackGround from './BackGround.js';
import Slide from './Slide.js';

export default class Page {
  constructor (opts = {}) {
    this.width = opts.w;
    this.height = opts.h;
    this.index = 0;
    this.slide = [];
    this.soundManager = new SoundManager({});
    this.painter = new Painter({
      canvas: opts.canvas,
      w: opts.w,
      h: opts.h
    });// end Painter
    this.backGround = new BackGround({
      canvas: opts.canvas,
      w: opts.w,
      h: opts.h
    });// end BackGround
  }// end constructor

  drawSlide () {
    this.painter.clearCanvas();
    this.backGround.addBackGround();
    this.slide[this.index].addElements();
  }// end drawSlide

  moveSlide (direction) {
    switch (direction) {
      case 'up':
        if (this.index > 0)
          --this.index;
        break;
      case 'down':
        if (this.index < this.slide.length - 1)
          ++this.index;
          // changeColor(afterColor);
        break;
      case 'left':
        this.slide[this.index].recesEvent();
        break;
      case 'right':
        this.slide[this.index].progEvent();
        break;
      default:
        break;
    }// end switch
  }// ene moveSlide

  addQuestionSlide (opts = {}) {
    const question_stack = [];
    const json_len = Object.keys(json).length;
    const size = isNaN(opts.size) ? 0 : opts.size;
    let rand;
    let flg;

    for (let i = 0; i < size; ++i) {
      this.slide[i] = new Slide({
        num: (i + 1),
        soundManager: this.soundManager,
        painter: this.painter
      });// end Slide

      while (true) {
        flg = 0;
        rand = Math.floor(Math.random() * json_len + 1);

        for (const key of question_stack) {
          if (key == rand) {
            ++flg;
            break;
          }// end if
        }// end for

        if (!flg)
          break;
      }// end while

      question_stack.push(rand);
      this.slide[i].addQuestion({
        q: json[rand]['Q'],
        a: json[rand]['A'],
        d: json[rand]['D'],
        img1: json[rand]['Q_I'],
        img2: json[rand]['D_I']
      });// end addQuestion
    }// end for
  }// end addQuestionSlide

  addSound (opts = {}) {
    soundManager.play(opts.file, {
      loop: opts.loop,
      volume: opts.soundVolume
    });// play
  }// end addSound

};// end Page