import {
  getId,
  addToId,
  addClass,
  removeClass,
  getRec
} from "../scripts/helper.js";

const pointerHTML = `
    <div class="key" id="monkeyBox">
    <img src="images/monkey.webp" id="monkeyImage" alt="monkey" width="309" height="340" id="monkey" class=""/>
    </div>
    <div id="banana_box">

    </div>
    <div class="banana" id="bananaBox" data-new="true">
    <img src="images/banana.webp" id="bananaImage" alt="banana" width="74" height="101"/>
    </div>
  `;

function pointer() {
  let count = 0;

  addClass("app", "app_background");
  addToId("app", pointerHTML);

  let target;
  

  function onKeyDown(event) {
    target = getId(event.target.parentNode.id)
    addClass(event.target.id, "cursor_cell")


    const banana = `
    <div class="banana" id="bananaBox_${count}" data-new="true">
      <img src="images/banana.webp" id="bananaImage_${count}" alt="banana" width="74" height="101"/>
    </div>`;
    event.preventDefault();
    
  
    if (target && target.id !== 'screen') {
      
      target.setPointerCapture(event.pointerId);
      target.onpointermove = onKeyMove;

      target.onpointerup = (event) => {
        const childEl = event.target.children[0].id
        removeClass(childEl, 'cursor_cell')
        if(getId(childEl).className === 'faded_blue'){
          target.style.pointerEvents = 'none'
          getId(childEl).remove()
          removeClass('monkeyBox', 'faded_red')
        }
        target.onpointermove = null;
        target.onpointerup = null;
        
        
        if (event.target.id !== "monkeyImage" && getId(event.target.id).dataset.new == "true") {
          getId("app").insertAdjacentHTML("beforeend", banana);
          getId(event.target.id).dataset.new = false;
          getId('app').onpointerdown = onKeyDown
          getId('app').ondragstart = () => false;
          count++;
        }
      };
    }
    return;
  }

  function checkImagePos(event){
    const monkeyXPos = getRec('monkeyBox').x;
    const monkeyYPos = getRec('monkeyBox').y;
    const monkeyWidth = getId("monkeyBox").getBoundingClientRect().width;
    const monkeyHeight = getId("monkeyBox").getBoundingClientRect().height;
    if(event.target.children[0].id.includes('bananaImage')){
      const bananaXPos = getId(event.target.children[0].id).getBoundingClientRect().x
      const bananaYPos = getId(event.target.children[0].id).getBoundingClientRect().y
      if(bananaYPos > monkeyYPos && bananaYPos < monkeyYPos + monkeyHeight / 3 && bananaXPos > monkeyXPos && bananaXPos < monkeyXPos + monkeyWidth / 4){
        addClass(event.target.children[0].id, 'faded_blue')
        addClass('monkeyBox', 'faded_red')
      } else {
        removeClass(event.target.children[0].id, 'faded_blue')
        removeClass('monkeyBox', 'faded_red')
      }
    } else {
      return
    }
  }

  function onKeyMove(event) {
    let newLeft =
    event.clientX - target.offsetWidth / 2 - target.parentNode.offsetLeft;
    let newTop =
    event.clientY - target.offsetHeight / 2 - target.parentNode.offsetTop;

    if (newTop < 0) {
      newTop = 0;
    }

    if (newLeft < 0) {
      newLeft = 0;
    }

    const rightEdge = target.parentNode.offsetWidth - target.offsetWidth;
    const bottomEdge = target.parentNode.offsetHeight - target.offsetHeight;
    if (newLeft > rightEdge) {
      newLeft = rightEdge;
    }
    if (newTop > bottomEdge) {
      newTop = bottomEdge;
    }
    target.style.left = `${newLeft}px`;
    target.style.top = `${newTop}px`;

    target.style.left = `${(target.offsetLeft / target.parentNode.offsetWidth) * 100}%`;
    target.style.top = `${(target.offsetTop / target.parentNode.offsetHeight) * 100}%`;
    checkImagePos(event)
  }

  getId('app').onpointerdown = onKeyDown
  getId('app').ondragstart = () => false;
  document.body.oncontextmenu = () => false;
}

export default pointer;