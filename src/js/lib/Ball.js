export default class Ball {

  constructor (opts = {}) {
    this.distance = 0;// 距離
    this.angle = 0;// 進む角度
    this.color = opts.color;// 色
    this.size = opts.size;// 大きさ
    this.x = opts.x;// x座標
    this.y = opts.y;// y座標
    this.pointX = 0;// 目標x座標
    this.pointY = 0;// 目標y座標
    this.pastX = [];// 過去のx座標
    this.pastY = [];// 過去のy座標
  }// end constructor

};// end Ball