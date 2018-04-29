"use strict";

const {
  DIRECTION_HORIZONTAL,
  MIN_SWIPE_PORCENTAGE
} = require("../constants");

const swiperEvent = function (target) {

  target.addEventListener(
    this.events.swiper[0],
    (e) => {
      e.stopPropagation();
      if(this.config.direction === DIRECTION_HORIZONTAL) {
        this.swipe.startPosition =
          this.device === "mobile" ? e.changedTouches[0].screenX : e.pageX;
      } else {
        this.swipe.startPosition =
          this.device === "mobile" ? e.changedTouches[0].screenY : e.pageY;
      }
    },
    false
  );

  target.addEventListener(
    this.events.swiper[1],
    (e) => {
      e.stopPropagation();
      if (this.config.direction === DIRECTION_HORIZONTAL) {
        this.swipe.finalPosition =
          this.device === "mobile" ? e.changedTouches[0].screenX : e.pageX;
      } else {
        this.swipe.finalPosition =
          this.device === "mobile" ? e.changedTouches[0].screenY : e.pageY;
      }
      if (
        this.swipe.finalPosition - this.swipe.startPosition > this.slideObject.sliderWidth / 100 * MIN_SWIPE_PORCENTAGE ||
        this.swipe.finalPosition + this.swipe.startPosition > -(this.slideObject.sliderWidth / 100 * MIN_SWIPE_PORCENTAGE)
      ) {
        if (this.swipe.finalPosition > this.swipe.startPosition) this.moveSlideBackward();
        else this.moveSlideForward();
      }

      this.swipe.startPosition = 0;
      this.swipe.finalPosition = 0;
    },
    false
  );
}

module.exports = { swiperEvent };
