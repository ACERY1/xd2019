import React from "react";
import "./index.less";
import Texty from "rc-texty";
import "rc-texty/assets/index.css";
import { Button } from "antd-mobile";
import AnimatedNumber from "animated-number-react";
import { Link } from "react-router";

import tower1Img from "../../assets/loading1.png";
import getProverb from "../../assets/proverb";
import throttle from "../../util/throttle";

let intervalId = null;
export default class Loading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: 100,
      proverb: "",
      isProverbLoaded: false,
      isContentLoaded: false
    };
  }
  componentWillMount() {
    this.setState({
      proverb: getProverb(),
      isProverbLoaded: true
    });
    intervalId = setInterval(() => {
      this.setState(
        {
          isProverbLoaded: false
        },
        () => {
          this.setState({
            proverb: getProverb(),
            isProverbLoaded: true
          });
        }
      );
      console.log("interval running");
    }, 3200);
    setTimeout(() => {
      this.setState({
        isContentLoaded: true
      });
    }, 3200);
  }
  componentWillUnmount() {
    clearInterval(intervalId);
    console.log("clear Interval");
  }

  render() {
    const { progress, proverb, isProverbLoaded, isContentLoaded } = this.state;
    const formatValue = value => parseInt(value);
    return (
      <div className="loading">
        <img src={tower1Img} alt="" className="loading-img" />
        <p className="loading-text">加载中</p>
        <p className="loading-progress">
          <AnimatedNumber
            value={progress}
            formatValue={formatValue}
            duration={3000}
            easing="easeInOutExpo"
          />
          %
        </p>
        {isProverbLoaded ? (
          <Texty
            className="proverb"
            duration={300}
            interval={30}
            type={"scale"}
            appear={true}
          >
            {proverb}
          </Texty>
        ) : null}

        {isContentLoaded ? (
          <div className="button">
            <Link to="/home">
              <Button
                size="small"
                onClick={() => {}}
                // style={{'background-color': '#d62f2f', 'border': 'none'}}
                className="button-inner"
              >
                进入
              </Button>
            </Link>
          </div>
        ) : null}
      </div>
    );
  }
}
