import React from "react";
import "./index.less";
import { Carousel } from "antd-mobile";
import Home from "../Home";
import MessageWrite from "../MessageWrite";

export default class Slide extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pages: [1, 2]
    };
  }

  goMsg = () => {
    setTimeout(() => {
      this.props.router.push("/message");
    }, 1800);
  }

  render() {
    const { pages } = this.state;
    return (
      <div>
        <Carousel
        vertical
        dots={false}
        >
          {pages.map(number => {
            if (number === 1) {
              return <Home />;
            }
            if (number === 2) {
              return <MessageWrite goMsg={this.goMsg} />;
            }
          })}
        </Carousel>
      </div>
    );
  }
}
