function getId(id) {
    return document.getElementById(id)
  }
  
  function addToId(id, text) {
    getId(id).innerHTML = text
  }
  
  function getRec(id) {
    return getId(id).getBoundingClientRect()
  }
  
  function resetAppSize(id) {
    getId(id).style.width = `${window.innerWidth + 10}px`
    getId(id).style.height = `${window.innerHeight + 10}px`
  }
  
  function addClick(id, fn){
    getId(id).addEventListener('click', fn);
  }
  
  async function importPage(page){
    const getPage = await import(`../pages/${page}.js`)
    await getPage.default()
  }

  function toggleClass(id, effect){
    getId(id).classList.toggle(effect)
  }

  function addClass(id, fx){
    getId(id).classList.add(fx)
  }

  function removeClass(id, fx){
    getId(id).classList.remove(fx)
  }

  function idWH(id, width, height) {
    getId(id).style.width = width;
    getId(id).style.height = height;
  }

  function setAppSize(w, h) {
    resetAppSize("screen");
    getId("main").style.height = `${window.innerHeight}px`;
  
    let { width, height } = getRec("screen");
    const box = 2;
    if (height > window.innerHeight) {
      height = window.innerHeight;
      width = (height / h) * w;
    }
    if (width > window.innerWidth) {
      width = window.innerWidth;
      height = (width * h) / w;
    }
    idWH("screen", `${width}px`, `${height}px`);
    if (height == width) {
      if (window.innerHeight > window.innerWidth) {
        idWH("app", `${height / box}px`, `${height}px`);
      } else {
        idWH("app", `${width}px`, `${width / box}px`);
      }
    }
    if (height > width) {
      idWH("app", `${width}px`, `${width * box}px`);
    }
    if (height < width) {
      idWH("app", `${height * box}px`, `${height}px`);
    }
  }
  
  export {
    getId,
    addToId,
    getRec,
    resetAppSize,
    addClick,
    importPage,
    toggleClass,
    addClass,
    removeClass,
    idWH,
    setAppSize
  }