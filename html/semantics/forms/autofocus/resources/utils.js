'use strict';

function waitForAnimationFrame() {
  return new Promise((resolve, reject) => {
    requestAnimationFrame(resolve);
  });
}

function waitForLoad(target) {
  return new Promise((resolve, reject) => {
    target.addEventListener('load', resolve);
  });
}
