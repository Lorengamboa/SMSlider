"use strict";

require("./styles/index.css");

const {
  DotsPlugin,
  NavigatorPlugin,
  ThumbnailPlugin
} = require("./plugins");
const { Slide } = require("./Slide");
const utils = require("./utils");
const { settings } = require("./config");
const {
  DIRECTION_VERTICAL,
  MOBILE_SWIPE_EVENTS,
  PC_SWIPE_EVENTS,
  MOBILE_SWIPE_THUMBNAIL_EVENTS,
  PC_SWIPE_THUMBNAIL_EVENTS,
  STATE_PAUSED,
  STATE_PLAYING
} = require("./constants");
const { addAutoplay, swiperEvent } = require("./events");

/**
 * SMSlider Class constructor
 */
export default class SMSlider {
  constructor(options) {

    if (!options.container) throw new Error("target option is required to initialize the plugin 😭");

    this.target = options.container;

    this.config = Object.assign({}, settings, options);

    // SMSlider Configuration
    this.state = STATE_PAUSED;

    // slide item object
    this.slideObject = {
      items: [],
      sliderWidth: null,
      sliderHeight: null
    };

    // swipe object
    this.swipe = {
      startPosition: 0,
      endPosition: 0
    };

    this.plugins = {};

    this.init();
  }

  /**
   * Initialize Plugin
   * @public
   */
  init() {
    var _this = this;

    detectDevice();
    initContainer();

    if (!this.targetElement)
      throw new Error("Something is wrong with your selector 😭");

    // Parent element target
    let target_element = this.targetElement;
    target_element.style.backgroundColor = this.config.backgroundColor;

    // sm-slider element content
    let target_content = target_element.innerHTML;
    target_element.classList.add("sm-slider");
    target_element.innerHTML = "";
    target_element.style.overflow = "hidden";
    target_element.style.overflowY = "hidden";

    // sm-slider container
    this.smslider_div = document.createElement("div");
    this.smslider_div.className = "sm-slider-container";
    this.smslider_div.style.transition = `${this.config.sliderTransitionTime}s`;
    this.smslider_div.style.transitionTimingFunction = this.config.transitionFlow;
    this.smslider_div.innerHTML = target_content;

    target_element.appendChild(this.smslider_div);

    // sets initial values for the slide components
    _this.slideObject.sliderWidth = target_element.offsetWidth;
    _this.slideObject.sliderHeight = target_element.offsetHeight;

    // Start drawing children
    if (this.smslider_div.children) drawSlides();

    checkConfiguration();
    this.smslider_div.style.display = "block";
    require("./window")(_this);

    /*******************************************************************
        Private functions to build up the slider html element
    ********************************************************************/

    /**
     * Function that will check all the slider's properties 1 by 1 to
     * check their current values and eventually make them work
     */
    function checkConfiguration() {
      renderPlugins();
      renderEvents();
    }

    /**
     * Draws select plugins on their respectives
     * containers
     */
    function renderPlugins() {
      // checks if navigator option is activated
      if (_this.config.navigator) {
        const navigatorPlugin = new NavigatorPlugin(_this);
        _this.plugins["navigator"] = navigatorPlugin;
        navigatorPlugin.drawBoth();
      }

      // checks if dots option is activated
      if (_this.config.dots) {
        const dotsPlugins = new DotsPlugin(_this);
        _this.plugins["dots"] = dotsPlugins;
        dotsPlugins.draw();
      }

      // checks if drawThumbnails option is activated
      if (_this.config.thumbnail) {
        const thumbnailPlugin = new ThumbnailPlugin(_this);
        _this.plugins["thumbnails"] = thumbnailPlugin;
        thumbnailPlugin.draw();
      }
    }

    /**
     * Attach conf events to its slider
     */
    function renderEvents() {
      // checks if autoplay is on
      if (_this.config.autoplay) addAutoplay();
      // checks swipeable property value
      if (_this.config.swipeable) swiperEvent.call(_this, _this.smslider_div);
    }

    /**
     * Draws slides
     */
    function drawSlides() {
      let children = _this.smslider_div.children;

      if (_this.config.direction === DIRECTION_VERTICAL) {
        _this.smslider_div.style.height =
        children.length * _this.slideObject.sliderHeight + "px";
      } else
        _this.smslider_div.style.width =
        children.length * _this.slideObject.sliderWidth + "px";

      let slideWidth = _this.slideObject.sliderWidth / _this.config.slidesInView;
      let slideHeight = _this.slideObject.sliderHeight;

      for (let i = 0; i < children.length; i++) {
        var slide = new Slide(children[i], slideWidth, slideHeight);
        _this.slideObject.items.push(slide);
        slide.draw();
      }
    }

    /*
      Looks up for an html element which contains a property value that
      matches up with the target container value
     */
    function initContainer() {
      let targetElementId = document.getElementById(_this.target);
      let targetElementClass = document.getElementsByClassName(_this.target);
      let targetElementQuery = document.querySelector(_this.target);

      if (targetElementId) _this.targetElement = targetElementId;
      else if (targetElementClass.length)
        _this.targetElement = targetElementClass;
      else if (targetElementQuery) _this.targetElement = targetElementQuery;
    }

    /**
     * Detects the device used to run the plugin
     */
    function detectDevice() {
      if (utils.isMobileDevice()) {
        _this.device = "mobile";
        _this.events = {
          "swiper": MOBILE_SWIPE_EVENTS,
          "thumbnail": MOBILE_SWIPE_THUMBNAIL_EVENTS
        };
      } else {
        _this.device = "computer";
        _this.events = {
          "swiper": PC_SWIPE_EVENTS,
          "thumbnail": PC_SWIPE_THUMBNAIL_EVENTS
        };
      }
    }
  }

  /*******************************************************************
                      SMSLIDER API METHODS
  ********************************************************************/

  /**
   * Displays a specific slide from the slider's stack
   * @public
   */
  displaySlide(slide) {
    this.state = STATE_PLAYING;
    if (this.config.direction === DIRECTION_VERTICAL) {
      const position = this.slideObject.sliderHeight * slide;
      utils.translateYElement(this.smslider_div, position);

    } else {
      const position = this.slideObject.sliderWidth * slide;
      utils.translateXElement(this.smslider_div, position);
    }

    this.smslider_div.addEventListener(
      "transitionend",
      () => {
        this.state = STATE_PAUSED
      },
      false
    );

    if (this.config.dots) this.plugins["dots"].updateDotsNavigator(slide);
  }

  /**
   * Moves slider to the previous slide position stack
   * @public
   */
  moveSlideBackward() {
    let numberSlides = Math.round(
      this.slideObject.items.length / this.config.slidesInView
    );
    if (this.config.currentSlide - 1 < 0) {
      if (this.config.loop) {
        this.displaySlide(numberSlides - 1);
        this.config.currentSlide = numberSlides - 1;
      }
      return;
    }
    this.displaySlide(this.config.currentSlide - 1);
    this.config.currentSlide--;
  }

  /**
   * Moves slider to the next position slide stack
   * @public
   */
  moveSlideForward() {
    let numberSlides = Math.round(
      this.slideObject.items.length / this.config.slidesInView
    );
    if (this.config.currentSlide + 1 > numberSlides - 1) {
      if (this.config.loop) {
        this.displaySlide(0);
        this.config.currentSlide = 0;
      }
      return;
    }
    this.displaySlide(this.config.currentSlide + 1);
    this.config.currentSlide++;
  }

  /**
   * Stops autoplay
   * @public
   */
  stopAutoplay() {
    this.autoplayInteval = null;
  }

  /**
   * Plays autoplay
   * @public
   */
  playAutoplay() {
    addAutoplay();
  }


}

window["SMSlider"] = SMSlider;
