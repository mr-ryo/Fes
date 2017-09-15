export default class Question {
  constructor (opts = {}) {
    this.correct = opts.correct;

    this.resource = {
      sentence            : opts.sentence,
      description         : opts.description,
      sentenceRefImage    : opts.sentenceRefImage,
      descriptionRefImage : opts.descriptionRefImage
    }// end resource

    this.convertResource();
  }// end constructor

  convertResource () {
    for (const key in this.resource) {
      if (this.resource[key] != '') {
        const image = new Image();
        image.src = this.resource[key];
        this.resource[key] = image;
      }// end if
    }// end for
  }// end convertResource

  getResource (key) {
    return this.resource[key];
  }// end getResource
};// end Question