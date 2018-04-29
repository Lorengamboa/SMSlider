"use strict";

/**
 * Detects if the device being used is a mobile
 */
function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
};

function translateXElement(el, position) {
  el.style.transform = `translate(-${position}px)`;
}

function translateYElement(el, position) {
  el.style.transform = `translateY(-${position}px)`;
}


module.exports = { isMobileDevice, translateXElement, translateYElement };
