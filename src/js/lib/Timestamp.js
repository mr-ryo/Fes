export default class Timestamp {
  constructor (opts = {}) {
    this.timer = [];
  }// end constructor

  getCurrentTime () {
    return new Date().getTime();
  }// end getTime

  addTime () {
    this.timer.push(this.getCurrentTime());
  }// end addTime

  discardTime () {
    this.timer.shift();
  }// end discardTime

  removeTime () {
    this.timer.pop();
  }// end removeTime

  calcTime (time) {
    return this.getCurrentTime() - time;
  }// end calcTime

  countDown (startTime, startSeconds) {
    let elapsed = startSeconds - (this.getCurrentTime() - startTime) * 0.001;
    elapsed = Math.floor(elapsed * 100);
    elapsed /= 100;

    return elapsed >= 0 ? elapsed : 0;
  }// end calcTime
};// end Timestamp