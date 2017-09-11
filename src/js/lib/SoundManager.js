import { Howl } from 'howler';

export default class SoundManager {
  constructor (opts = {}) {
    if (opts.file != null)
      this.sound = new Howl({
        src: opts.file,
        loop: opts.loop,
        volume: opts.volume
      });// end Howl
  }// end constructor

  play () {
    if (this.sound != null)
      this.sound.play();
  }// end play

  pause () {
    if (this.sound != null)
      this.sound.pause();
  }// end pause

  soundEffect (file, opts = {}) {
    const effect = new Howl({
      src: [file],
      volume: opts.volume
    }).play();// end Howl
  }// end soundEffect
};// end SoundManager
