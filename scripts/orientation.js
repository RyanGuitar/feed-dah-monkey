import { addClick, getId, importPage } from "./helper.js";

function checkOrientation() {
  if ("orientation" in screen) {
    addClick("landing_page", fullscreen);
  } else {
    return;
  }
}

function fullscreen() {
  getId("main").requestFullscreen();
  window.screen.orientation
    .lock("landscape")
    .then(
      (success) => console.log(success),
      (failure) => console.log(failure)
    )
    .then(importPage("game"));
}

export { checkOrientation };