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
  }// end constructor

  addQuestion (opts = {}) {
    this.question = new Question({
      sentence: opts.q,
      correct: opts.a
    });// end Question
  }// end addQuestion

  progEvent () {
    if (this.event < 4) {
      ++this.event;

      switch (this.event) {
        case 4:
          break;
        case 3:
          this.startCount();
          this.addTime();
          break;
        case 2:
          break;
        case 1:
          break;
        default:
          break;
      }// end switch
    }// end if
  }// end conductor

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
};// end Sample
