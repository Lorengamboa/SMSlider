"use strict";

class NavigatorPlugin {
  constructor(slider){
    if (slider.plugins['navigator']) return;
     this.initialized = false;
     this.slider = slider;
   }

  drawBoth() {
    if (this.initialized) return;
    this.slider.plugins['navigator'] = [];

    this.drawLeftOne();
    this.drawRightOne();

    this.initialized = true;
  }

  drawLeftOne() {
    let nav_left = document.createElement("span");
    nav_left.className = "nav left";
    nav_left.innerHTML = "❮";
    nav_left.addEventListener("click", () => {
      this.slider.moveSlideBackward();
    });
    this.slider.targetElement.insertBefore(nav_left, this.slider.smslider_div.childNode);
    this.slider.plugins['navigator'].push({"left": nav_left});
  }

  drawRightOne() {
    let nav_right = document.createElement("span");
    nav_right.className = "nav right";
    nav_right.innerHTML = "❯";
    nav_right.addEventListener("click", () => {
      this.slider.moveSlideForward();
    });
    this.slider.targetElement.insertBefore(nav_right, this.slider.smslider_div.childNode);
    this.slider.plugins['navigator'].push({"right": nav_right});
  }

  //eliminate() {}
}

export default NavigatorPlugin;
