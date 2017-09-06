export default class Question {
  constructor (opts = {}) {
    this.sentence = opts.sentence;
    this.correct = opts.correct;
    this.description = opts.description;
    this.sentenceRefImage = opts.sentenceRefImage;
    this.descriptionRefImage = opts.descriptionRefImage;
  }// end constructor
};// end Question