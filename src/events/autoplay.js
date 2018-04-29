"use strict";

const {
  STATE_PAUSED,
  AUTOPLAY_INTERVAL,
} = require("../constants");

/**
 * Makes the slider slide by itself after a period of time
 */
var addAutoplay =  () => {
  this.autoplayInteval = setInterval(() => {
    if (this.state === STATE_PAUSED) this.moveSlideForward();
  }, AUTOPLAY_INTERVAL);
}

module.exports = { addAutoplay };
