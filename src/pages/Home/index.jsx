import React from "react";
import { WingBlank, Carousel } from "antd-mobile";
import "./index.less";
import Moment from "../../util/moment";
import countTime from "../../util/countTime";
import throttle from "../../util/throttle";
import * as api from "../../util/api";

import bgImg from "../../assets/background2.png";
import titleImg from "../../assets/title.png";
import clockImg from "../../assets/clock.png";
import ballImg from "../../assets/second.png";
import startImg from "../../assets/start.png";
import TweenOne from "rc-tween-one";

const ArrowAnimation = [
  {
    y: 20,
    repeat: -1,
    duration: 600,
    yoyo: true,
    ease: 'easeOutCubic',
  },
];

const graduateTime = +new Date(
  Moment("20190621 24:00:00", "YYYYMMDD hh:mm:ss")
);
let intervalId = null;
let firstInTime = 0;

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messageNumber: 2373, // 已留言人数
      leftDay: "10", //剩余天数
      leftHour: "12", // 剩余小时
      leftMinute: "30", // 剩余分钟
      leftSecond: "23" // 剩余秒
    };
  }

  componentWillMount() {
    // 记录首次时间
    const firstTime = countTime(graduateTime);
    firstInTime = firstTime.sec;
    this.setState({
      leftDay: firstTime.day,
      leftHour: firstTime.hour,
      leftMinute: firstTime.min,
      leftSecond: firstTime.sec
    });

    const sayTime = throttle(() => {
      const time = countTime(graduateTime);
      this.setState({
        leftDay: time.day,
        leftHour: time.hour,
        leftMinute: time.min,
        leftSecond: time.sec
      });
      console.log("interval running");
    }, 800);

    intervalId = setInterval(sayTime, 1000);

    api.getAllMsgNumber().then(res => {
      this.setState({
        messageNumber: res.data.data,
      });
    })
  }

  componentWillUnmount() {
    clearInterval(intervalId);
    console.log("clear Interval");
  }

  render() {
    const {
      leftDay,
      leftHour,
      leftMinute,
      leftSecond,
      messageNumber
    } = this.state;
    return (
      <div className="home">
        <img className="home-title" src={titleImg} />
        <div className="home-clock">
          <div
            className="home-clock-main"
            style={{
              // 使指针与剩余时间对齐
              transform: `rotate(${((60 - firstInTime) / 60) * 360 + 90}deg)`
            }}
          >
            <img src={ballImg} alt="" className="ball" />
          </div>
          <p className="day">
            {leftDay}
            <span className="day-text">天</span>
          </p>
          <p className="hms">
            <span>{leftHour}</span>
            <span className="hms-text">时</span>
            <span>{leftMinute}</span>
            <span className="hms-text">分</span>
            <span>{leftSecond}</span>
            <span className="hms-text">秒</span>
          </p>
        </div>
        <p className="home-count">
          <span>已经有</span>
          <span className="text"> {messageNumber} </span>
          <span>人写下了留言</span>
        </p>
        <p className="home-slide">向上滑动开始写下你的毕业留言</p>
        <TweenOne animation={ArrowAnimation}>
          <img src={startImg} alt="" className="home-start" />
        </TweenOne>
      </div>
    );
  }
}
