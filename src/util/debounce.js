export default (fn, boomTime) => {
  var timer = null;
  return function(arg) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn(arg);
    }, boomTime);
  };
};
