import Page from './lib/Page.js';
import $ from 'jquery';

const SLIDE_LEN = 10;
const KEY_UP = 38;
const KEY_DOWN = 40;
const KEY_LEFT = 37;
const KEY_RIGHT = 39;
const KEY_COLOR = 67;
const BGM_VOLUME = 0.1;
const DISP_WIDTH = $(window).width();
const DISP_HEIGHT = $(window).height();

const resource = {
  bgm: '../sounds/bgm_maoudamashii_cyber29.mp3'
}// end resource

const masterDraw = () => {
  const loop = () => {
    page.drawSlide();
    window.requestAnimationFrame(loop);
  }// end loop

  window.requestAnimationFrame(loop);
}// end masterDraw

const page = new Page({
  canvas: $('.canvas').get(0),
  w: DISP_WIDTH,
  h: DISP_HEIGHT
});// end Page

page.addQuestionSlide({
  size: SLIDE_LEN
});// end addQuestionSlide

masterDraw();

$(window).on('keydown', (e) => {
  switch (e.keyCode) {
    case KEY_LEFT:
      page.moveSlide('left');
      break;
    case KEY_UP:
      page.moveSlide('up');
      break;
    case KEY_RIGHT:
      page.moveSlide('right');
      break;
    case KEY_DOWN:
      page.moveSlide('down');
      break;
    case KEY_COLOR:
      break;
    default:
      break;
  }// end switch
});// end on keydown