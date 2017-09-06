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
const KEY_UP = 38;
const KEY_DOWN = 40;
const KEY_LEFT = 37;
const KEY_RIGHT = 39;
const KEY_COLOR = 67;
const ROW_LINES = 5;
const COL_LINES = 5;
const DISP_WIDTH = $(window).width();
const DISP_HEIGHT = $(window).height();

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
  w: DISP_WIDTH,
  h: DISP_HEIGHT
});// end painter
const soundManager = new SoundManager({
});// end soundManager

/*
* ------
*/
const wrap = $('.slideWrap');
const slide = [];
let lines = [];
let bgColor = {
  r: 255,
  g: 255,
  b: 255
}// end bgColor
let afterColor = {
  r: 255,
  g: 255,
  b: 255
}// end afterColor
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

    questions.push(rand);
    key.addQuestion({
      q: json[rand]['Q'],
      a: json[rand]['A'],
      d: json[rand]['D'],
      img1: json[rand]['Q_I'],
      img2: json[rand]['D_I']
    });// end addQuestion
  });// end forEach
}// end orderQuestion

const gridExpand = (array) => {
  for (let i = 0, size = ROW_LINES + COL_LINES; i < size; ++i) {
    const x = i < ROW_LINES ? 0 : Math.floor(Math.random() * DISP_WIDTH);
    const y = i < ROW_LINES ? Math.floor(Math.random() * DISP_HEIGHT) : 0;
    const mult = x == 0 ? DISP_HEIGHT : DISP_WIDTH;
    const point = Math.floor(Math.random() * (mult - 1) + 1);

    array[i] = {
      x1: x,
      y1: y,
      x2: (i < ROW_LINES ? DISP_WIDTH : x),
      y2: (i < ROW_LINES ? y : DISP_HEIGHT),
      p: point
    }// end kay
  }// end for
}// end gridExpand

const gridMove = (array) => {
  array.forEach((key, index, array) => {
    if (key.p == (key.x1 == 0 ? key.y1 : key.x1)) {
      const mult = key.x1 == 0 ? DISP_HEIGHT : DISP_WIDTH;
      key.p = Math.floor(Math.random() * (mult - 1) + 1);
    }// end if

    if (key.x1 == 0) {
      key.y1 += (key.y1 < key.p ? 1 : -1);
      key.y2 = key.y1
    } else {
      key.x1 += (key.x1 < key.p ? 1 : -1);
      key.x2 = key.x1;
    }// end if

    painter.drawLine({
      x1: key.x1,
      y1: key.y1,
      x2: key.x2,
      y2: key.y2
    });
  });// end forEach
}// end gridMove

const changeColor = (palette) => {
  palette.r = Math.floor(Math.random() * 255);
  palette.g = Math.floor(Math.random() * 255);
  palette.b = Math.floor(Math.random() * 255);
}// end changeColor

const paintBackGround = (palette1, palette2) => {
  if (palette1.r - palette2.r != 0)
    palette1.r += (palette1.r - palette2.r > 0 ? -1 : 1);
  if (palette1.g - palette2.g != 0)
    palette1.g += (palette1.g - palette2.g > 0 ? -1 : 1);
  if (palette1.b - palette2.b != 0)
    palette1.b += (palette1.b - palette2.b > 0 ? -1 : 1);

  painter.ctx.fillStyle = 'rgb('+ palette1.r +','+ palette1.g +','+ palette1.b +')';
  painter.ctx.fillRect(0, 0, DISP_WIDTH, DISP_HEIGHT);
}// end add

const addBackGround = () => {
  paintBackGround(bgColor, afterColor);
  gridMove(lines);
}// end addBackGround

const masterDraw = () => {
  const loop = () => {
    addBackGround();
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
gridExpand(lines);
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
        changeColor(afterColor);
      }// end if
      break;
    case KEY_RIGHT:
      slide[index].progEvent();
      break;
    case KEY_DOWN:
      if (index < SLIDE_LEN - 1) {
        ++index;
        changeColor(afterColor);
      }// end if
      break;
    case KEY_COLOR:
      changeColor(afterColor);
      break;
    default:
      break;
  }// end switch
});// end on keydown