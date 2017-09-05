import SoundManager from './SoundManager.js';
import Painter from './Painter.js';
import Question from './Question.js';
import Timestamp from './Timestamp.js';

const TIME_LIMIT = 90;
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
    this.soundManager = new SoundManager({
    });// end soundManager
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
      description: opts.d
    });// end Question
  }// end addQuestion

  addElements () {
    switch (this.event) {
      case DESCRIPTION_E_NUM:
        this.addDescription();
      case CORRECT_E_NUM:
        this.addCorrect();
      case TIME_E_NUM:
        this.addTickTime();
      case SENTENCE_E_NUM:
        this.addSentence();
      case NUMBER_E_NUM:
        this.addNumber();
      default:
        break;
    }// end switch
  }// end addElements

  addNumber () {
    this.painter.sharpImage(this.resource['number'+ this.num], {
      basisX: 'left',
      basisY: 'top',
      offsetX: 10,
      offsetY: 10,
      basisSize: 'width',
      w: 200,
      h: 0
    });// end sharpImage
  }// end addNumber

  addSentence () {
    this.painter.alignImage(RESOURCE_PATH +'sentence/'+ this.question.sentence, {
      x: 0.5,
      y: 0.5,
      fit: 'width'
    });// end alignImage
  }// end addSentence

  addTickTime () {
    const time = this.timestamp.countDown(this.timestamp.timer[TIME_E_NUM - 1], TIME_LIMIT);

    this.painter.tickTime(time +'', {
      basisX: 'right',
      basisY: 'top',
      offsetX: 0,
      offsetY: 10,
      w: 100
    });// end tickTime
  }// end addTickTime

  addCorrect () {
    const img = this.question.correct == 1 ? this.resource.correctSuccess : this.resource.correctFailure;

    this.painter.alignImage(img, {
      x: 0.5,
      y: 0.5,
      fit: 'height'
    });// end alignImage
  }// end addCorrect

  addDescription () {
    this.painter.alignImage(RESOURCE_PATH +'description/'+ this.question.description, {
      x: 0.5,
      y: 0.5,
      fit: 'width',
      offsetX: 0,
      offsetY: 300
    });// end alignImage
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
