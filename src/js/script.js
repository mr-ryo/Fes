/*
* ---JSON---
*/
import json from '../config/question.json';

/*
* ---Library---
*/
import Slide from './lib/Slide.js';
import Painter from './lib/Painter.js';
import $ from 'jquery';

/*
* ---定数---
*/
const SLIDE_LEN = 10;
const SLIDE_DURATION = 1000;
const KEY_UP = 38;
const KEY_DOWN = 40;
const KEY_LEFT = 37;
const KEY_RIGHT = 39;

/*
* ---初期設定---
*/
const wrap = $('.slideWrap');
const slide = [];
const questions = [];
const painter = new Painter({
  canvas: $('.canvas').get(0),
  w: $(window).width(),
  h: $(window).height()
});// end painter

let index = 0;

/*
* ---関数---
*/
const move = () => {
  wrap.animate({
    top: $('.slide').height() * -index
  }, SLIDE_DURATION);// end animate
}// end move

const orderQuestion = (array, volume) => {
  let rand;
  let flg;

  array.forEach((key, index, array) => {
    while (true) {
      flg = 0;
      rand = Math.floor(Math.random() * volume + 1);

      for (const key of questions) {
        if (key == rand) {
          ++flg;
          break;
        }// end if
      }// end for

      if (!flg)
        break;
    }// end while

    questions.push(rand);
    key.addQuestion({
      q: json[rand]['Q'],
      a: json[rand]['A']
    });// end addQuestion
  });// end forEach
}// end orderQuestion

const masterDraw = () => {
  let reserv;

  const loop = () => {
    reserv = slide[index].getEvent();
    painter.drawing(reserv);
    window.requestAnimationFrame(loop);
  }// end loop

  window.requestAnimationFrame(loop);
}// end masterDraw

/*
* ------
*/
for (let i = 0, size = SLIDE_LEN; i < size; ++i) {
  slide[i] = new Slide({
    num: (i + 1)
  });// end Sample

  slide[i].addSlide(wrap);
}// end for

orderQuestion(slide, Object.keys(json).length);
painter.clearCanvas();
masterDraw();

$(window).on('keydown', (e) => {
  switch (e.keyCode) {
    case KEY_LEFT:
      slide[index].recesEvent();
      break;
    case KEY_UP:
      if (index > 0) {
        --index;
        move();
      }// end if
      break;
    case KEY_RIGHT:
      slide[index].progEvent();
      break;
    case KEY_DOWN:
      if (index < SLIDE_LEN - 1) {
        ++index;
        move();
      }// end if
      break;
    default:
      break;
  }// end switch
});// end on keydown