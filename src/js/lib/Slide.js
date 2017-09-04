import SoundManager from './SoundManager.js';
import Question from './Question.js';
import Timestamp from './Timestamp.js';

const TIME_LIMIT = 90;

const RESOURCE_PATH = '../images/';

export default class Slide {

  constructor (opts = {}) {
    this.num = opts.num;
    this.event = 0;
    this.timer = 0;

    this.question;
    this.timestamp = new Timestamp({
      duration: TIME_LIMIT
    });// end timestamp
    this.soundManager = new SoundManager({
    });// end soundManager

    this.resource = {
      correctSuccess: 'maru.png',
      correctFailure: 'batsu.png'
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
      correct: opts.a,
      description: opts.d
    });// end Question
  }// end addQuestion

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

  progEvent () {
    if (this.event < 5) {
      ++this.event;

      switch (this.event) {
        case 5:
          break;
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

  getEvent () {
    const reserv = [];

    switch (this.event) {
      case 5:
        reserv.push({
          src: RESOURCE_PATH +'description/'+ this.question.description,
          method: 'align',
          x: 0.5,
          y: 0.5,
          fit: 'width'
        });// end push
      case 4:
        reserv.push({
          src: RESOURCE_PATH +'correct/'+ (this.question.correct == 1 ? this.resource.correctSuccess : this.resource.correctFailure),
          method: 'align',
          x: 0.5,
          y: 0.5,
          fit: 'height'
        });// end push
      case 3:
        reserv.push(this.timer);
      case 2:
        reserv.push({
          src: RESOURCE_PATH +'sentence/'+ this.question.sentence,
          method: 'align',
          x: 0.5,
          y: 0.5,
          fit: 'width'
        });// end push
      case 1:
        reserv.push({
          src: RESOURCE_PATH +'q_numbers/'+ this.num,
          method: 'sharp',
          basisX: 'left',
          basisY: 'top',
          offsetX: 10,
          offsetY: 10,
          basisSize: 'width',
          w: 200,
          h: 0
        });// end push
      default:
        break;
    }// end switch

    return reserv.reverse();
  }// end getEvent
};// end Slide
