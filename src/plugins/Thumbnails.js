"use strict";

class ThumbnailPlugin {
  constructor(slider){
    if (slider.plugins['thumbnails']) return;
     this.initialized = false;
     this.slider = slider;
   }

  draw() {
    if (this.initialized) return;

    let tmnWidth = this.slider.slideObject.sliderWidth / this.slider.config.thumbnailsInView;
    var thumbnail_div = document.createElement("div");

    this.slider.smslider_div.style.height = "70%";
    thumbnail_div.className = "thumnails-menu";
    thumbnail_div.style.height = "30%" ;// 30% out of the slicer actual size
    thumbnail_div.style.width =
      tmnWidth * this.slider.slideObject.items.length + "px";

    this.slider.targetElement.style.height = `${this.slider.targetElement.offsetHeight +
      this.slider.slideObject.sliderHeight / 100 * 30}px`;

    for (var i = 0; i < this.slider.slideObject.items.length; i++) {
      let thumnails_element = document.createElement("div");
      let thumbnail_content = this.slider.slideObject.items[i].div.cloneNode(true);

      thumnails_element.className = "thumbnail";
      thumnails_element.style.width = tmnWidth + "px";
      thumnails_element.setAttribute("data-slide", i);
      thumnails_element.innerHTML = thumbnail_content.innerHTML;
      thumnails_element.childNodes.forEach(function(element) {
        element.className = "content";
      });
      thumbnail_div.appendChild(thumnails_element);
      thumnails_element.addEventListener("click", e => {
        e.stopPropagation();

        let itemselected = e.currentTarget;
        let currentSlide = Math.round(
          itemselected.getAttribute("data-slide") / this.slider.config.slidesInView
        );

        this.slider.displaySlide(currentSlide);
        this.slider.config.currentSlide = currentSlide;
      });

      this.slider.targetElement.appendChild(thumbnail_div);
    }
    this.slider.initialized = true;
    this.slider.plugins['thumbnail'] = thumbnail_div;
  }

  /**
   * Moves the thumbnail set slide forward
   * @private
   */
  translateThumbnail(slide) {
    let tmnWidth = this.slider.slideObject.sliderWidth / this.slider.config.thumbnailsInView;
    const distance = tmnWidth * slide;
    utils.translateXElement(this.slider.thumbnail_div, distance);
  }
}

export default ThumbnailPlugin;
