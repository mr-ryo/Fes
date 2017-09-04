export default class Question {
  constructor (opts = {}) {
    this.sentence = opts.sentence;
    this.correct = opts.correct;
    this.description = opts.description;
  }// end constructor
};// end Question