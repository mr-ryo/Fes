import SoundManager from './SoundManager.js';
import Question from './Question.js';
import Timestamp from './Timestamp.js';

const TIME_LIMIT = 90;

export default class Slide {

  constructor (opts = {}) {
    this.num = opts.num;
    this.event = 0;
    this.question;
    this.timer = 0;
    this.timestamp = new Timestamp({
      duration: TIME_LIMIT
    });// end timestamp
    this.soundManager = new SoundManager({
    });// end soundManager

    this.resource = {
    };// end resource

    this.audio = {
      numberCall: '../sounds/se_maoudamashii_onepoint28.mp3',
      sentenceCall: '../sounds/se_maoudamashii_onepoint22.mp3',
      correctCall: '../sounds/se_maoudamashii_onepoint07.mp3',
    }// end audio
  }// end constructor

  addQuestion (opts = {}) {
    this.question = new Question({
      sentence: opts.q,
      correct: opts.a
    });// end Question
  }// end addQuestion

  addSlide (wrap) {
    wrap.append('<div class="slide"></div>');
  }// end addSlide

  addTime () {
    const loop = () => {
      this.timer = this.timestamp.calcTime();

      if (this.timer > 0)
        window.requestAnimationFrame(loop);
    }// end loop

    window.requestAnimationFrame(loop);
  }// end addTime

  progEvent () {
    if (this.event < 4) {
      ++this.event;

      switch (this.event) {
        case 4:
          this.soundManager.play(this.audio.correctCall, {
            volume: 0.1
          });// end play
          break;
        case 3:
          this.startCount();
          this.addTime();
          break;
        case 2:
          this.soundManager.play(this.audio.sentenceCall, {
            volume: 0.1
          });// end play
          break;
        case 1:
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
    }// end if
  }// recesEvent

  startCount () {
    this.timestamp.startCount();
  }// end startCount

  getEvent () {
    const reserv = [];

    switch (this.event) {
      case 4:
        reserv.push(this.question.correct);
      case 3:
        reserv.push(this.timer);
      case 2:
        reserv.push(this.question.sentence);
      case 1:
        reserv.push(this.num);
      default:
        break;
    }// end switch

    return reserv.reverse();
  }// end getEvent
};// end Slide
