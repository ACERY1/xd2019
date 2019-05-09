/**
 * 获取距离基准时间的剩余时间
 * 如获取到距离 2019-06-12 24:00 的剩余时间
 * @param {Number} benchTime 基准时间的Unix时间戳
 * @return {Object} {day, hour, min, sec}
 */

export default benchTime => {
  const daySec = 86400; // 一天的秒数
  const HourSec = 3600; // 一小时的秒数
  const MinSec = 60; // 一分钟的秒数

  const nowTime = +new Date();

  // 四舍五入进位毫秒数
  const betweenTime = Math.ceil((benchTime - nowTime) / 1000);

  // 计算差值
  const leftDay = parseInt(betweenTime / daySec);
  const leftHour = parseInt((betweenTime - leftDay * daySec) / HourSec);
  const leftMinute = parseInt((betweenTime - leftDay * daySec - leftHour*HourSec) / MinSec);
  const leftSec = parseInt(betweenTime - leftDay * daySec - leftHour*HourSec - leftMinute * MinSec);

  return {
    day: leftDay,
    hour: leftHour,
    min: leftMinute,
    sec: leftSec
  }
};
