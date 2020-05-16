((doc, win) => {
  let docEl = doc.documentElement;
  let resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';

  function recalc() {
    let designWidth = 750;
    let clientWidth = docEl.clientWidth;
    if (!clientWidth) return;
    docEl.style.fontSize = `${(100 * clientWidth) / (designWidth / 2)}px`;
  }

  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
