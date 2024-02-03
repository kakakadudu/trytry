(function () {
  const wall = document.querySelector(".wall");
  const wallRect = wall.getBoundingClientRect();
  const inp = document.querySelector("input");
  const labelWidth = 200, labelHeight = 200;
  const msgs = ["世界和平", "Love is love.", "Luck comes from the east."];
  let vw = document.documentElement.clientWidth,
    vh = document.documentElement.clientHeight;
  let zIndex = 1;

  for (let i = 0; i < msgs.length; i++) {
    createLabel(msgs[i]);
  }


  // 注册输入框事件
  inp.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      if (inp.value.length > 100) {
        return alert("说太多了！");
      }
      createLabel(inp.value);
      inp.value = "";
    }
  })


  window.oncontextmenu = function (e) {
    e.preventDefault();
  }
  window.onclick = function (e) {
    if (e.target.nodeName === "SPAN" && e.target.classList.contains("del")) {
      e.target.parentElement.remove();
    }
  }
  window.onmousedown = function (e) {
    const label = getLabel(e.target);
    if (!label) {
      return;
    }
    zIndex++;
    const labelRect = label.getBoundingClientRect();
    let left = labelRect.left, top = labelRect.top;
    let pageX = e.pageX, pageY = e.pageY;
    window.onmousemove = function (e) {
      // console.log(e.pageX, e.pageY)
      label.style.zIndex = zIndex;
      let cleft = e.pageX - pageX + left, ctop = e.pageY - pageY + top;
      if (cleft < 0) {
        cleft = 0;
      }
      if (ctop < 0) {
        ctop = 0;
      }
      if (cleft > wallRect.width - labelWidth) {
        cleft = wallRect.width - labelWidth;
      }
      if (ctop > wallRect.height - labelHeight) {
        ctop = wallRect.height - labelHeight;
      }
      label.style.left = cleft + "px";
      label.style.top = ctop + "px";
    }
    window.onmouseup = window.onmouseleave = function (e) {
      window.onmousemove = null;
    }
  }

  window.onresize = function () {
    let cw = document.documentElement.clientWidth,
      ch = document.documentElement.clientHeight;
    for (let i = 0; i < wall.children.length; i++) {
      let label = wall.children[i];
      let oleft = parseFloat(label.style.left);
      // x / oleft = cw / vw
      let cleft = (cw - labelWidth) / (vw - labelWidth) * oleft;
      label.style.left = `${cleft}px`;

      let otop = parseFloat(label.style.top);
      let ctop = (ch - labelHeight) / (vh - labelHeight) * otop;
      label.style.top = `${ctop}px`;
    }
    vw = document.documentElement.clientWidth;
    vh = document.documentElement.clientHeight;
  }


  /**
   * 得到标签
   * @param {Element} ele 
   * @returns 
   */
  function getLabel(ele) {
    if (ele.nodeName === "DIV" && ele.classList.contains("label")) {
      return ele;
    }
    if (ele.nodeName === "SPAN" && ele.classList.contains("del")) {
      return ele.parentElement;
    }
  }

  /**
   * 创建标签
   * @param {string} msg 
   */
  function createLabel(msg) {
    const label = document.createElement("div");
    label.className = "label";
    label.innerHTML = msg;
    label.style.zIndex = zIndex;
    label.style.left = `${getRandom(0, wallRect.width - labelWidth)}px`;
    label.style.top = `${getRandom(0, wallRect.height - labelHeight)}px`;
    label.style.backgroundColor = `rgb(${getRandom(100, 200)},${getRandom(100, 200)},${getRandom(100, 200)})`;
    const span = document.createElement("span");
    span.className = "del";
    span.innerHTML = "x";
    label.appendChild(span);
    wall.appendChild(label);

    /**
     * 产生一个 {min,max} 的随机数，可以取到 max
     * @param {number} min 
     * @param {number} max 
     * @returns 
     */
    function getRandom(min, max) {
      return Math.floor(Math.random() * (max + 1 - min) + min);
    }
  }
})();