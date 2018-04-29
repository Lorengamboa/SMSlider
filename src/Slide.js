"use strict";

class Slide {
  constructor(el, width, height) {
    this.div = el;
    this.width = width;
    this.height = height;
  }

  draw() {
    this.div.className = "slide";
    this.div.style.width = this.width + "px";
    this.div.style.height = this.height + "px";
  }

  setWidth(width) {
    this.width = width;
    this.div.style.width = width + "px";
  }

  setHeight(height) {
    this.height = height;
    this.div.style.height = height + "px";
  }

  delete() {
    this.div.remove();
  }

  hide() {
    this.div.style.visibility = "hidden";
  }

  show() {
    this.div.style.visibility = "visible";
  }
}

module.exports = { Slide };
