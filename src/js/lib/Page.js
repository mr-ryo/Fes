import json from '../../config/question.json';

import SoundManager from './SoundManager.js';
import Painter from './Painter.js';
import BackGround from './BackGround.js';
import Slide from './Slide.js';

const RESOURCE_PATH = '../images/';
const TITLE_PATH = 'title/';

const MOVIE_WIDTH = 1920;
const MOVIE_HEIGHT = 1080;

export default class Page {
  constructor (opts = {}) {
    this.pageNo = opts.num;
    this.width = opts.w;
    this.height = opts.h;
    this.index = 0;
    this.bgm;
    this.mv;
    this.slide = [];
    this.book = opts.book;
    this.soundManager = new SoundManager({
      file: opts.soundFile,
      loop: opts.soundLoop,
      volume: opts.soundVolume
    });// end soundManager
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

    this.resource = {
      title: RESOURCE_PATH + TITLE_PATH +'logo.png',
      start: RESOURCE_PATH + TITLE_PATH +'start.png'
    }// end resource

    this.movies = {
      opening: '../movies/test.mp4'
    }// end movies
  }// end constructor

  drawSlide () {
    this.painter.clearCanvas();
    this.backGround.addBackGround();

    switch (this.pageNo) {
      case this.book.TITLE:
        this.addTitle();
        break;
      case this.book.MOVIE:
        this.addMovie();
        break;
      case this.book.START:
        this.addStart();
        break;
      case this.book.QUIZ:
        this.slide[this.index].addElements();
        break;
      case this.book.ENDING:
        this.addEnding();
        break;
      default:
        break;
    }//end switch
  }// end drawSlide

  moveSlide (direction) {
    switch (direction) {
      case 'up':
        if (this.index > 0)
          --this.index;
        break;
      case 'down':
        if (this.index < this.slide.length - 1) {
          ++this.index;
          this.backGround.changeColor();
        }// end if
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

  addTitle () {
    this.painter.alignImage(this.resource.title, {
      x: 0.5,
      y: 0.5,
      fit: 'height'
    });// end alignImage
  }// end addTitle

  addMovie () {
    if (this.mv == null) {
      const movie = document.createElement('video');
      movie.src = this.movies.opening;
      movie.width = MOVIE_WIDTH;
      movie.height = MOVIE_HEIGHT;
      this.mv = movie;
      this.mv.play();
    }// end if

    this.painter.alignMovie(this.mv, {
      x: 0.5,
      y: 0.5,
      fit: 'width'
    });// end alignMovie
  }// end addMovie

  addStart () {
    this.painter.alignImage(this.resource.start, {
      x: 0.5,
      y: 0.5,
      fit: 'width'
    });// end alignImage
  }// end addStart

  addQuestionSlide (opts = {}) {
    const question_stack = [];
    const json_len = Object.keys(json).length;
    const size = isNaN(opts.size) ? 0 : opts.size;
    let rand;
    let flg;

    for (let i = 0; i < size; ++i) {
      this.slide[i] = new Slide({
        num: (i + 1),
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

  addEnding () {
  }// end addEnding
};// end Page