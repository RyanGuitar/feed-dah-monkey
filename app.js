import { addToId, setAppSize } from "./scripts/helper.js";
import { checkOrientation } from "./scripts/orientation.js";

const landingHTML = `
  <div id="landing_page">
    <div id="landing_title">Feed Dah Monkey</div>
    <div id="landing_images">
      <img src="images/monkey.webp" alt="monkey" id="landing_monkey" width="309" height="340">
      <img src="images/banana.webp" alt="banana" id="landing_banana" width="74" height="101"></img>
    </div>
    <div id="landing_start">click to start</div>
  </div>
`;

window.onload = () => {
  setAppSize(2, 1);
  addToId("app", landingHTML);
  checkOrientation();
  window.onresize = () => {
    setAppSize(2, 1);
  };
};
