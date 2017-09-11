import Page from './lib/Page.js';
import $ from 'jquery';

const SLIDE_LEN = 10;
const KEY_UP = 38;
const KEY_DOWN = 40;
const KEY_LEFT = 37;
const KEY_RIGHT = 39;
const KEY_NEXT = 78;
const KEY_BACK = 66;
const KEY_COLOR = 67;
const BGM_VOLUME = 0.1;
const DISP_WIDTH = $(window).width();
const DISP_HEIGHT = $(window).height();

const BOOK = {
  TITLE: 0,
  MOVIE: 1,
  START: 2,
  QUIZ: 3,
  ENDING: 4
}// end BOOK

const resource = {
  bgm_title: '../sounds/bgm_maoudamashii_fantasy13.mp3',
  bgm_quiz: '../sounds/bgm_maoudamashii_cyber29.mp3',
  bgm_ending: '../sounds/bgm_maoudamashii_fantasy10.mp3'
}// end resource

const page = [];
let index = 0;
let bgm;

const makeBook = () => {
  let file;

  for (const key in BOOK) {

    switch (BOOK[key]) {
      case BOOK.TITLE:
        file = resource.bgm_title;
        break;
      case BOOK.START:
        file = resource.bgm_quiz;
        break;
      case BOOK.ENDING:
        file = resource.bgm_ending;
        break;
      default:
        break;
    }// end switch

    page.push(new Page({
      canvas: $('.canvas').get(0),
      num: BOOK[key],
      w: DISP_WIDTH,
      h: DISP_HEIGHT,
      book: BOOK,
      soundFile: file,
      soundLoop: true,
      soundVolume: 0.1
    }));// ene push
  }// end for

  page[BOOK.QUIZ].addQuestionSlide({
    size: SLIDE_LEN
  });// end addQuestionSlide
}// end addPage

const masterDraw = () => {
  const loop = () => {
    page[index].drawSlide();
    window.requestAnimationFrame(loop);
  }// end loop

  window.requestAnimationFrame(loop);
}// end masterDraw

makeBook();
page[index].soundManager.play();
masterDraw();

$(window).on('keydown', (e) => {
  switch (e.keyCode) {
    case KEY_BACK:
      if (index > 0) {
        page[index].soundManager.pause();
        --index;
        page[index].soundManager.play();
      }// end if
      break;
    case KEY_NEXT:
      if (index < Object.keys(BOOK).length - 1) {
        page[index].soundManager.pause();
        ++index;
        page[index].soundManager.play();
      }// end if
      break;
    case KEY_LEFT:
      page[index].moveSlide('left');
      break;
    case KEY_UP:
      page[index].moveSlide('up');
      break;
    case KEY_RIGHT:
      page[index].moveSlide('right');
      break;
    case KEY_DOWN:
      page[index].moveSlide('down');
      break;
    case KEY_COLOR:
      page[index].backGround.changeColor();
      break;
    default:
      break;
  }// end switch
});// end on keydown