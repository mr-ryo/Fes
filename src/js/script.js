/*
* ---JSON---
*/
import json from '../config/question.json';

/*
* ---Library---
*/
import Slide from './lib/Slide.js';
import SoundManager from './lib/SoundManager.js';
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
* ---Path---
*/
const RESOURCE_PATH = '../images/';
const resource = {
  bgm: '../sounds/game_maoudamashii_2_lastboss02.mp3'
}// end resource

/*
* ---インスタンス化---
*/
const painter = new Painter({
  canvas: $('.canvas').get(0),
  w: $(window).width(),
  h: $(window).height()
});// end painter
const soundManager = new SoundManager({
});// end soundManager

/*
* ------
*/
const wrap = $('.slideWrap');
const slide = [];
let index = 0;

/*
* ---関数---
*/
const orderQuestion = (array, volume) => {
  const questions = [];
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

    rand = 1;// debug

    questions.push(rand);
    key.addQuestion({
      q: json[rand]['Q'],
      a: json[rand]['A'],
      d: json[rand]['D']
    });// end addQuestion
  });// end forEach
}// end orderQuestion

const masterDraw = () => {
  const loop = () => {
    slide[index].addElements();
    window.requestAnimationFrame(loop);
  }// end loop

  window.requestAnimationFrame(loop);
}// end masterDraw

/*
* ------
*/
for (let i = 0, size = SLIDE_LEN; i < size; ++i) {
  slide[i] = new Slide({
    num: (i + 1),
    painter: painter
  });// end Sample
}// end for

orderQuestion(slide, Object.keys(json).length);
soundManager.play(resource.bgm, {
  loop: true,
  volume: 0.1
});// end play
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
      }// end if
      break;
    case KEY_RIGHT:
      slide[index].progEvent();
      break;
    case KEY_DOWN:
      if (index < SLIDE_LEN - 1) {
        ++index;
      }// end if
      break;
    default:
      break;
  }// end switch
});// end on keydown