// import SoundManager from './SoundManager.js';
import Question from './Question.js';
import Timestamp from './Timestamp.js';

const TIME_LIMIT = 10000;
const UNDER_POSITION = 300;
const NUMBER_DURATION = 300;
const NUMBER_INITIAL_POSITION = -25;
const SENTENCE_DURATION = 300;
const TIME_DURATION = 500;
const TIME_LASTDOWN = 5;
const CORRECT_DURATION = 300;
const DESCRIPTION_DURATION = 300;
const DESCRIPTION_INITIAL_POSITION = 25;
// E_NUM (EVENT_NUMBER)
const NUMBER_E_NUM = 1;
const SENTENCE_E_NUM = 2;
const TIME_E_NUM = 3;
const CORRECT_E_NUM = 4;
const DESCRIPTION_E_NUM = 5;

const RESOURCE_PATH = '../images/';
const CORRECT_PATH = 'correct/';
const Q_NUMBERS_PATH = 'q_numbers/';

export default class Slide {

  constructor (opts = {}) {
    this.num = opts.num;// 問題番号
    this.event = 0;// イベント進行状況

    this.question;
    this.timestamp = new Timestamp({
      duration: TIME_LIMIT
    });// end timestamp
    // this.soundManager = new SoundManager({
    // });// end soundManager
    this.soundManager = opts.soundManager;
    this.painter = opts.painter;

    this.resource = {
      correctSuccess: RESOURCE_PATH + CORRECT_PATH +'maru.png',
      correctFailure: RESOURCE_PATH + CORRECT_PATH +'batsu.png',
      number1: RESOURCE_PATH + Q_NUMBERS_PATH +'number1.png',
      number2: RESOURCE_PATH + Q_NUMBERS_PATH +'number2.png',
      number3: RESOURCE_PATH + Q_NUMBERS_PATH +'number3.png',
      number4: RESOURCE_PATH + Q_NUMBERS_PATH +'number4.png',
      number5: RESOURCE_PATH + Q_NUMBERS_PATH +'number5.png',
      number6: RESOURCE_PATH + Q_NUMBERS_PATH +'number6.png',
      number7: RESOURCE_PATH + Q_NUMBERS_PATH +'number7.png',
      number8: RESOURCE_PATH + Q_NUMBERS_PATH +'number8.png',
      number9: RESOURCE_PATH + Q_NUMBERS_PATH +'number9.png',
      number10: RESOURCE_PATH + Q_NUMBERS_PATH +'number10.png',
    };// end resource

    this.audio = {
      numberCall: '../sounds/se_maoudamashii_onepoint28.mp3',
      sentenceCall: '../sounds/se_maoudamashii_onepoint22.mp3',
      timeCall: '../sounds/se_maoudamashii_system40.mp3',
      correctCall: '../sounds/se_maoudamashii_onepoint11.mp3',
      descriptionCall: '../sounds/se_maoudamashii_onepoint07.mp3',
    }// end audio
  }// end constructor

  addQuestion (opts = {}) {
    this.question = new Question({
      sentence: opts.q,
      correct: opts.a,
      description: opts.d,
      sentenceRefImage: opts.img1,
      descriptionRefImage: opts.img2
    });// end Question
  }// end addQuestion

  addElements () {
    if (this.event >= NUMBER_E_NUM)
      this.addNumber();
    if (this.event >= SENTENCE_E_NUM && this.event <= TIME_E_NUM)
      this.addSentence();
    if (this.event == TIME_E_NUM)
      this.addTickTime();
    if (this.event == CORRECT_E_NUM)
      this.addCorrect();
    if (this.event == DESCRIPTION_E_NUM)
      this.addDescription();
  }// end addElements

  addNumber () {
    const time = this.timestamp.calcTime(this.timestamp.timer[NUMBER_E_NUM - 1]);
    const v = time >= NUMBER_DURATION ? 1 : time / NUMBER_DURATION;

    this.painter.ctx.save();
    this.painter.ctx.globalAlpha = v;
    this.painter.sharpImage(this.resource['number'+ this.num], {
      basisX: 'left',
      basisY: 'top',
      offsetX: 10,
      offsetY: 10 + NUMBER_INITIAL_POSITION * (1 - v),
      basisSize: 'width',
      w: 200,
      h: 0
    });// end sharpImage
    this.painter.ctx.restore();
  }// end addNumber

  addSentence () {
    const time = this.timestamp.calcTime(this.timestamp.timer[SENTENCE_E_NUM - 1]);
    const v = time >= SENTENCE_DURATION ? 1 : time / SENTENCE_DURATION;
    let offsetY = 0;

    this.painter.ctx.save();
    this.painter.ctx.globalAlpha = v;

    if (this.question.sentenceRefImage != '') {
      this.painter.alignImage(RESOURCE_PATH +'reference/'+ this.question.sentenceRefImage, {
        x: 0.5,
        y: 0.5,
        fit: 'height',
        scale: 0.6
      });// end alignImage
      offsetY = UNDER_POSITION;
    }// end if

    this.painter.alignImage(RESOURCE_PATH +'sentence/'+ this.question.sentence, {
      x: 0.5,
      y: 0.5,
      fit: 'width',
      offsetY: offsetY
    });// end alignImage
    this.painter.ctx.restore();
  }// end addSentence

  addTickTime () {
    const pureTime = this.timestamp.calcTime(this.timestamp.timer[TIME_E_NUM - 1]);
    const v = pureTime >= TIME_DURATION ? 1 : pureTime / TIME_DURATION;
    let time = this.timestamp.countDown(this.timestamp.timer[TIME_E_NUM - 1], TIME_LIMIT);

    if (time < TIME_LASTDOWN + 1) {
      time = Math.floor(time) +'';
    } else {
      if (time < 10)
        time = '0'+ time;
      if ((time +'').split('').length == 2)
        time = time +'.00';
      time = (time +'00').slice(0, 5);
    }// end if

    this.painter.ctx.save();
    this.painter.ctx.globalAlpha = v;
    this.painter.tickTime(time, {
      basisX: 'right',
      basisY: 'top',
      offsetX: 0,
      offsetY: 10,
      w: 100 * (2 - v)
    });// end tickTime
    this.painter.ctx.restore();
  }// end addTickTime

  addCorrect () {
    const time = this.timestamp.calcTime(this.timestamp.timer[CORRECT_E_NUM - 1]);
    const v = time >= CORRECT_DURATION ? 1 : time / CORRECT_DURATION;
    const img = this.question.correct == 1 ? this.resource.correctSuccess : this.resource.correctFailure;

    this.painter.ctx.save();
    this.painter.ctx.globalAlpha = v;
    this.painter.alignImage(img, {
      x: 0.5,
      y: 0.5,
      fit: 'height',
      scale: v
    });// end alignImage
    this.painter.ctx.restore();
  }// end addCorrect

  addDescription () {
    const time = this.timestamp.calcTime(this.timestamp.timer[DESCRIPTION_E_NUM - 1]);
    const v = time >= DESCRIPTION_DURATION ? 1 : time / DESCRIPTION_DURATION;

    this.painter.ctx.save();
    this.painter.ctx.globalAlpha = v;

    if (this.question.descriptionRefImage != '') {
      this.painter.alignImage(RESOURCE_PATH +'reference/'+ this.question.descriptionRefImage, {
        x: 0.5,
        y: 0.5,
        fit: 'height',
        scale: 0.6,
        offsetY: DESCRIPTION_INITIAL_POSITION * (1 - v)
      });// end alignImage
    }// end if

    this.painter.alignImage(RESOURCE_PATH +'description/'+ this.question.description, {
      x: 0.5,
      y: 0.5,
      fit: 'width',
      offsetX: 0,
      offsetY: UNDER_POSITION + DESCRIPTION_INITIAL_POSITION * (1 - v)
    });// end alignImage
    this.painter.ctx.restore();
  }// end addDescription

  progEvent () {
    if (this.event < 5) {
      ++this.event;
      this.timestamp.addTime();

      switch (this.event) {
        case DESCRIPTION_E_NUM:
          this.soundManager.play(this.audio.descriptionCall, {
            volume: 0.1
          });// end play
          break;
        case CORRECT_E_NUM:
          this.soundManager.play(this.audio.correctCall, {
            volume: 0.1
          });// end play
          break;
        case TIME_E_NUM:
          this.soundManager.play(this.audio.timeCall, {
            volume: 0.1
          });// end play
          break;
        case SENTENCE_E_NUM:
          this.soundManager.play(this.audio.sentenceCall, {
            volume: 0.1
          });// end play
          break;
        case NUMBER_E_NUM:
          this.soundManager.play(this.audio.numberCall, {
            volume: 0.1
          });// end play
          break;
        default:
          break;
      }// end switch
    }// end if
  }// end progEvent

  recesEvent () {
    if (this.event > 0) {
      --this.event;
      this.timestamp.removeTime();
    }// end if
  }// recesEvent
};// end Slide
