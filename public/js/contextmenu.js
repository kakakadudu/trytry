(function () {
  const menu = document.querySelector(".menu");
  // 注册右键菜单事件
  window.oncontextmenu = function (e) {
    e.preventDefault();
    menu.style.left = e.pageX + "px";
    menu.style.top = e.pageY + "px";
    menu.style.display = "block";
    navigator.clipboard.readText().then(text => {
      toggleDisabled(menu.children, !text.length, "粘贴");
    })
    toggleDisabled(menu.children, !document.getSelection().toString().length, "复制");
  }
  window.onmousedown = function (e) {
    if (isCheckP(e.target)) {
      if (checkIsDisabled(e.target)) {
        return;
      }
      if (e.target.innerText === "复制") {
        navigator.clipboard.writeText(document.getSelection().toString())
      }
      if (e.target.innerText === "粘贴") {
        navigator.clipboard.readText().then(text => {
          let p = document.createElement("p");
          p.innerText = text;
          document.querySelector(".wrap").appendChild(p);
        })
      }
      menu.style.display = "none";
    } else {
      removeHover(menu.children)
      menu.style.display = "none";
    }
  }

  // 移入/移出菜单项 更改样式
  menu.onmouseover = function (e) {
    if (isCheckP(e.target)) {
      removeHover(e.target.parentElement.children)
      if (checkIsDisabled(e.target)) {
        return;
      }
      e.target.classList.add("hover")
    }
  }

  /**
   * 检查是否位菜单项里的 p 元素
   * @param {Element} ele 
   * @returns 
   */
  function isCheckP(ele) {
    return ele.parentElement && ele.parentElement.className === "menu" && ele.nodeName === "P"
  }

  /**
   * 添加移入样式
   * @param {children} list 
   */
  function removeHover(list) {
    Array.from(list).find(item => {
      if (item.classList.contains("hover")) {
        item.classList.remove("hover")
      }
    })
  }
  /**
   * 是否禁用
   * @param {Element} ele 
   * @returns 
   */
  function checkIsDisabled(ele) {
    return ele.classList.contains("disabled");
  }
  /**
   * 添加/删除禁用样式
   * @param {*} list 
   * @param {boolean} type 添加：true  删除：false
   * @param {string} filter 条件
   */
  function toggleDisabled(list, type, filter) {
    Array.from(list).find(item => {
      if (item.innerText === filter) {
        if (type) {
          item.classList.add("disabled")
        } else {
          item.classList.remove("disabled")
        }
      }
    })
  }
})();