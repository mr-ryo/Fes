import { Howl } from 'howler';

export default class SoundManager {
  constructor (opts = {}) {
  }// end constructor

  play (file, opts = {}) {
    const loop = opts.loop != null ? opts.loop : false;

    const sound = new Howl({
      src: [file],
      loop: loop,
      volume: opts.volume
    }).play();// end sound
  }// end play
};// end SoundManager
