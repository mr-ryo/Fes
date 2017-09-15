import SoundManager from './SoundManager.js';
import Question from './Question.js';
import Timestamp from './Timestamp.js';

const RESOURCE_PATH = './images/';
const CORRECT_PATH = 'correct/';
const Q_NUMBERS_PATH = 'q_numbers/';
const SOUND_PATH = './sounds/';

const SLIDE_EVENT_LEN = 5;
const TIME_LIMIT = 10000;
const UNDER_POSITION = 300;
// 問題番号
const NUMBER_DURATION = 300;
const NUMBER_OFFSETX = 10;
const NUMBER_OFFSETY = 10;
const NUMBER_WIDTH = 200;
const NUMBER_INITIAL_POSITION = -25;
// 問題文
const SENTENCE_DURATION = 300;
const SENTENCE_SCALE = 0.6;
// タイマー
const TIME_DURATION = 500;
const TIME_OFFSETX = 0;
const TIME_OFFSETY = 10;
const TIME_WIDTH = 100;
const TIME_LASTDOWN = 5;
// 正解
const CORRECT_DURATION = 300;
// 解説
const DESCRIPTION_DURATION = 300;
const DESCRIPTION_SCALE = 0.6;
const DESCRIPTION_INITIAL_POSITION = 25;
// E_NUM (EVENT_NUMBER)
const NUMBER_E_NUM = 1;
const SENTENCE_E_NUM = 2;
const TIME_E_NUM = 3;
const CORRECT_E_NUM = 4;
const DESCRIPTION_E_NUM = 5;
// サウンドボリューム
const NUMBER_SOUND_VOL = 0.1;
const SENTENCE_SOUND_VOL = 0.1;
const TIME_SOUND_VOL = 0.2;
const TIME_LIMIT_SOUND_VOL = 0.2;
const CORRECT_SOUND_VOL = 0.2;
const DESCRIPTION_SOUND_VOL = 0.2;

export default class Slide {

  constructor (opts = {}) {
    this.num = opts.num;// 問題番号
    this.event = 0;// イベント進行状況
    this.timelimit = 0;

    this.question;
    this.timestamp = new Timestamp({});
    this.soundManager = new SoundManager({});
    this.painter = opts.painter;

    this.resource = {
      correctSuccess: RESOURCE_PATH + CORRECT_PATH +'maru.png',
      correctFailure: RESOURCE_PATH + CORRECT_PATH +'batsu.png',
      number1       : RESOURCE_PATH + Q_NUMBERS_PATH +'number1.png',
      number2       : RESOURCE_PATH + Q_NUMBERS_PATH +'number2.png',
      number3       : RESOURCE_PATH + Q_NUMBERS_PATH +'number3.png',
      number4       : RESOURCE_PATH + Q_NUMBERS_PATH +'number4.png',
      number5       : RESOURCE_PATH + Q_NUMBERS_PATH +'number5.png',
      number6       : RESOURCE_PATH + Q_NUMBERS_PATH +'number6.png',
      number7       : RESOURCE_PATH + Q_NUMBERS_PATH +'number7.png',
      number8       : RESOURCE_PATH + Q_NUMBERS_PATH +'number8.png',
      number9       : RESOURCE_PATH + Q_NUMBERS_PATH +'number9.png',
      number10      : RESOURCE_PATH + Q_NUMBERS_PATH +'number10.png',
    }// end resource

    this.audio = {
      numberCall      : SOUND_PATH +'number.mp3',
      sentenceCall    : SOUND_PATH +'se_maoudamashii_system04.mp3',
      timeCall        : SOUND_PATH +'se_maoudamashii_system40.mp3',
      timeLimitCall   : SOUND_PATH +'se_maoudamashii_system01.mp3',
      correctCall     : SOUND_PATH +'se_maoudamashii_system48.mp3',
      descriptionCall : SOUND_PATH +'se_maoudamashii_system10.mp3',
    }// end audio

    this.convertResource();
  }// end constructor

  convertResource () {
    for (const key in this.resource) {
      const image = new Image();
      image.src = this.resource[key];
      this.resource[key] = image;
    }// end for
  }// end convertResource

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
      offsetX: NUMBER_OFFSETX,
      offsetY: NUMBER_OFFSETY + NUMBER_INITIAL_POSITION * (1 - v),
      basisSize: 'width',
      w: NUMBER_WIDTH,
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

    if (this.question.getResource('sentenceRefImage') != '') {
      this.painter.alignImage(this.question.getResource('sentenceRefImage'), {
        x: 0.5,
        y: 0.5,
        fit: 'height',
        scale: SENTENCE_SCALE
      });// end alignImage
      offsetY = UNDER_POSITION;
    }// end if

    this.painter.alignImage(this.question.getResource('sentence'), {
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

    if (time < 10)
      time = '0'+ time;
    if ((time +'').split('').length == 2)
      time = time +'.00';
    time = (time +'00').slice(0, 5);

    if (!this.timelimit && time == '00.00') {
      this.timelimit ^= 1;
      this.soundManager.soundEffect(this.audio.timeLimitCall, {
        volume: TIME_LIMIT_SOUND_VOL
      });// end soundEffect
    }// end if

    this.painter.ctx.save();
    this.painter.ctx.globalAlpha = v;
    this.painter.tickTime(time, {
      basisX: 'right',
      basisY: 'top',
      offsetX: TIME_OFFSETX,
      offsetY: TIME_OFFSETY,
      w: TIME_WIDTH * (2 - v)
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

    if (this.question.getResource('descriptionRefImage') != '') {
      this.painter.alignImage(this.question.getResource('descriptionRefImage'), {
        x: 0.5,
        y: 0.5,
        fit: 'height',
        scale: DESCRIPTION_SCALE,
        offsetY: DESCRIPTION_INITIAL_POSITION * (1 - v)
      });// end alignImage
    }// end if

    this.painter.alignImage(this.question.getResource('description'), {
      x: 0.5,
      y: 0.5,
      fit: 'width',
      offsetX: 0,
      offsetY: UNDER_POSITION + DESCRIPTION_INITIAL_POSITION * (1 - v)
    });// end alignImage
    this.painter.ctx.restore();
  }// end addDescription

  progEvent () {
    if (this.event < SLIDE_EVENT_LEN) {
      ++this.event;
      this.timestamp.addTime();

      switch (this.event) {
        case DESCRIPTION_E_NUM:
          this.soundManager.soundEffect(this.audio.descriptionCall, {
            volume: DESCRIPTION_SOUND_VOL
          });// end soundEffect
          break;
        case CORRECT_E_NUM:
          this.soundManager.soundEffect(this.audio.correctCall, {
            volume: CORRECT_SOUND_VOL
          });// end soundEffect
          break;
        case TIME_E_NUM:
          this.soundManager.soundEffect(this.audio.timeCall, {
            volume: TIME_SOUND_VOL
          });// end soundEffect
          break;
        case SENTENCE_E_NUM:
          this.soundManager.soundEffect(this.audio.sentenceCall, {
            volume: SENTENCE_SOUND_VOL
          });// end soundEffect
          break;
        case NUMBER_E_NUM:
          this.soundManager.soundEffect(this.audio.numberCall, {
            volume: NUMBER_SOUND_VOL
          });// end soundEffect
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
