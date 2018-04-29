"use strict";

class DotsPlugin {
  constructor(slider) {
    if (slider.plugins['dots']) return;
    this.initialized = false;
    this.slider = slider;
    this.dotList = null;
  }

  draw() {
    if (this.initialized) return;

    let dotlist_div = document.createElement("div");

    dotlist_div.className =
      (this.slider.config.direction === "horizontal") ? "dots-menu horz" : "dots-menu vert";

    this.dotList = document
      .getElementById(this.slider.target)
      .getElementsByClassName("dot");

    let numberOfDots = Math.round(this.slider.slideObject.items.length / this.slider.config.slidesInView);

    for (let i = 0; i < numberOfDots; i++) {
      let dot_element = document.createElement("span");

      dot_element.className = "dot";
      dot_element.setAttribute("data-slide", i);
      dotlist_div.appendChild(dot_element);

      // adds click listener to badge navigators
      dot_element.addEventListener("click", e => {
        let slideNumber = Number(e.target.getAttribute("data-slide"));

        this.slider.displaySlide(slideNumber);
        this.slider.config.currentSlide = slideNumber;
      });
    }

    this.slider.targetElement.appendChild(dotlist_div);

    this.dotList[this.slider.config.currentSlide].className += " selected";

    this.slider.initialized = true;
  }

  /**
   * Marks one of the dots navigators avaiable to highlight
   * which of the present slides is actually being showed on the screen
   */
  updateDotsNavigator(slide) {
    this.dotList[this.slider.config.currentSlide].classList.remove("selected");
    this.dotList[slide].classList.add("selected");
  }

  //eliminate() {}
}


export default DotsPlugin;
