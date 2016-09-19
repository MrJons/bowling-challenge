
// impliment score increase for strike/spare on following roll(s).

var Bowling = function Bowling(){"use strict";
  this._frame = 1;
  this._roll = 1;
  this._rollScore1 = 0;
  this._rollScore2 = 0;
  this._totalScore = 0;
  this._currentKnockdown = 0;
  this._standingPins = 10;
  this._sX = "";
};

Bowling.prototype = {
  bowl: function () {
    this.rollScoreRecord();
    this.remainingPins();
    this.frameAndRoll();
  },
};


Bowling.prototype.rollScoreRecord = function(){
  this._currentKnockdown = this.pinsKnockdown();
  if(this._roll === 1){
    this._rollScore1 = this._currentKnockdown
  } else {
    this._rollScore2 = this._currentKnockdown
  }
  this.strikeOrSpare();
}

// Random pin knockdown assignment
Bowling.prototype.pinsKnockdown = function(){
  return Math.floor(Math.random() * (this._standingPins + 1));
}

Bowling.prototype.remainingPins = function(){
  this._standingPins -= this._currentKnockdown
}

Bowling.prototype.strikeOrSpare = function(){
  if (this._rollScore1 === 10) {
    this._sX = "Strike!"
  } else if (this._rollScore1 + this._rollScore2 === 10) {
    this._sX = "Spare!"
  }
}

Bowling.prototype.totalScoreUpdate = function(){
  this._totalScore += (this._rollScore1 + this._rollScore2);
}

// below 3 methods manage frame and roll count logic
Bowling.prototype.frameAndRoll = function(){
  this.frameIncrement();
  this.rollAlternate();
}

Bowling.prototype.frameIncrement = function(){
  if(this._roll === 2 || this._standingPins === 0){
    this._frame ++
    this.totalScoreUpdate();
  }
}

Bowling.prototype.rollAlternate = function(){
  if(this._roll === 1 && this._standingPins > 0){
    this._roll = 2;
  } else {
    this._roll = 1;
    this.frameReset();
  }
}

Bowling.prototype.frameReset = function(){
  this._rollScore1 = 0;
  this._rollScore2 = 0;
  this._currentKnockdown = 0;
  this._standingPins = 10;
}
