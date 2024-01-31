/**
 * 放大镜
 */

(function () {
  var config = {
    small: {
      dom: document.querySelector(".small"),
      width: 300,
      height: 300,
      src: "./public/images/greenCat.png",
      imgWidth: 520,
      imgHeight: 520,
    },
    big: {
      dom: document.querySelector(".big"),
      width: 500,
      height: 500,
      src: "./public/images/greenCat_886.png",
      imgWidth: 886,
      imgHeight: 886
    },
    move: {
      dom: document.querySelector(".move"),
    }
  };
  // 设置 move 的宽高
  setMoveRect();
  // 初始化图片背景
  initDivBg();
  // 小图片鼠标事件
  smallBindEvent();

  function setMoveRect() {
    // moveSize/ smallSize  = bigSize / bigImgSize
    config.move.dom.style.width = (config.move.width = config.big.width / config.big.imgWidth * config.small.width) + "px";
    config.move.dom.style.height = (config.move.height = config.big.height / config.big.imgHeight * config.small.height) + "px";
  }
  function initDivBg() {
    config.small.dom.style.background = `url("${config.small.src}") left top/100% 100% no-repeat`;
    config.big.dom.style.background = `url("${config.big.src}") no-repeat`;
  }
  function smallBindEvent() {
    config.small.dom.onmouseenter = function (e) {
      config.move.dom.style.display = "block";
      config.big.dom.style.display = "block";
    }
    config.small.dom.onmousemove = function (e) {
      let offset = getOffset(e);
      let position = {
        left: offset.x - config.move.width / 2,
        top: offset.y - config.move.height / 2
      }
      if (position.left < 0) {
        position.left = 0;
      }
      if (position.top < 0) {
        position.top = 0;
      }
      if (position.left > config.small.width - config.move.width) {
        position.left = config.small.width - config.move.width;
      }
      if (position.top > config.small.height - config.move.height) {
        position.top = config.small.height - config.move.height;
      }
      config.move.dom.style.left = position.left + "px";
      config.move.dom.style.top = position.top + "px";
      // 设置大图片的背景位置
      // moveDiff / smallSize = positionDiff / bigSize
      let diffX = position.left / config.small.width * config.big.imgWidth;
      let diffY = position.top / config.small.height * config.big.imgHeight;
      config.big.dom.style.backgroundPosition = `-${diffX}px -${diffY}px`;
    }
    config.small.dom.onmouseleave = function (e) {
      config.move.dom.style.display = "none";
      config.big.dom.style.display = "none";
    }
  }
  /**
   * 获取鼠标距离事件源内边距的位置
   * @param {MouseEvent} event 
   * @returns 
   */
  function getOffset(event) {
    if (event.target === config.small.dom) {
      return {
        x: event.offsetX,
        y: event.offsetY
      }
    } else {
      let target = getComputedStyle(event.target);
      return {
        x: event.offsetX + parseFloat(target.left),
        y: event.offsetY + parseFloat(target.top)
      }
    }
  }
})();