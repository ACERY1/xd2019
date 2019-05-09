import React from "react";
import "./index.less";
import Moment from "moment";
import countTime from "../../util/countTime";
import throttle from "../../util/throttle";

import bgImg from "../../assets/background2.png";

const graduateTime = +new Date(
  Moment("20190621 24:00:00", "YYYYMMDD hh:mm:ss")
);

let intervalId = null;

// setInterval(sayTime, 1000)

// 进位 不足一秒进一秒
// console.log(Math.ceil(betweenTime / 1000))

console.log(Moment("20190621 12:00:00", "YYYYMMDD hh:mm:ss").toNow("s"));

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messageNumber: 100, // 已留言人数
      leftDay: "10", //剩余天数
      leftHour: "12", // 剩余小时
      leftMinute: "30", // 剩余分钟
      leftSecond: "23" // 剩余秒
    };
  }

  componentDidMount() {
    const sayTime = throttle(() => {
      const time = countTime(graduateTime);
      this.setState({
        leftDay: time.day,
        leftHour: time.hour,
        leftMinute: time.min,
        leftSecond: time.sec
      });
    }, 800);

    intervalId = setInterval(sayTime, 1000);
  }

  componentWillUnmount() {
    clearInterval(intervalId);
  }

  render() {
    const { leftDay, leftHour, leftMinute, leftSecond } = this.state;
    return (
      <div className="home">
        {leftDay}
        {leftHour}
        {leftMinute}
        {leftSecond}
      </div>
    );
  }
}
