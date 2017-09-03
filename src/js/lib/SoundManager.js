import { Howl } from 'howler';

export default class SoundManager {
  constructor (opts = {}) {
  }// end constructor

  play (file, opts = {}) {
    const sound = new Howl({
      src: [file],
      volume: opts.volume
    }).play();// end sound
  }// end play
};// end SoundManager
