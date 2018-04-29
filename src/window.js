"use strict";

const resizeSlider = function(ctx) {
  let _this = ctx;

  window.addEventListener('resize', function(e) {
    let slideWidth = _this.targetElement.offsetWidth / _this.config.slidesInView;
    _this.slideObject.items.forEach(function(el) {
      el.setWidth(slideWidth);
    });
    _this.slideObject.sliderWidth = slideWidth;
  });
}

module.exports = resizeSlider;
