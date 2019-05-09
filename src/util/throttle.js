export default (fn, gapTime) => {
  var lastTime = null;
  return function() {
    var nowTime = +new Date();
    if (nowTime - lastTime >= gapTime || !lastTime) {
      lastTime = nowTime;
      fn();
    }
  };
};
