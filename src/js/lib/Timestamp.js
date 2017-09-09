export default class Timestamp {
  constructor (opts = {}) {
    this.timer = [];
  }// end constructor

  getStartTime () {
    return this.timer[0];
  }// end getStartTime

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
    const t = isNaN(time) ? this.timer[0] : time;

    return this.getCurrentTime() - t;
  }// end calcTime

  countDown (startTime, startSeconds) {
    let elapsed = startSeconds - (this.getCurrentTime() - startTime);
    elapsed = Math.floor(elapsed * 0.1);
    elapsed /= 100;

    return elapsed >= 0 ? elapsed : 0;
  }// end calcTime
};// end Timestamp