import React from "react";
import "./index.less";
import { Link } from "react-router";
import { Carousel, TextareaItem, Button } from "antd-mobile";

export default class MessageWrite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topMessages: [
        {
          author: "丁香炜炜",
          msg: "没在这个校园里谈过一次恋爱，就要走了"
        },
        {
          author: "西电老王",
          msg: "想要你陪我从校服到礼服"
        },
        {
          author: "乔奶奶私生子",
          msg: "约晨读约自习约健身——你走了以后我和谁约呀"
        },
        {
          author: "北雷吴亦凡",
          msg: "大学四年，室友间最默契的大概就是安空调的决定了"
        }
      ]
    };
  }

  render() {
    const { topMessages } = this.state;
    return (
      <div className="write">
        <div className="box">
          <Carousel
            frameOverflow="visible"
            cellSpacing={10}
            slideWidth={0.7}
            autoplay
            infinite
            dots={false}
          >
            {topMessages.map(obj => {
              return (
                <div
                  className={`write-board card${Math.ceil(Math.random() * 3)}`}
                >
                  <p className="message"> {obj.msg.length <=35?obj.msg : obj.msg.substr(0, 34) + '...'}</p>
                  <p className="author">—{obj.author}</p>
                </div>
              );
            })}
          </Carousel>
        </div>

        <Link to="/message" className="linkBox">
          <p className="write-link">戳我查看更多留言 ></p>
        </Link>
        <div className="write-text-1" >
            <TextareaItem 
            className="t1-main"
            autoHeight
            rows={6}
            clear
            count={48}
            ></TextareaItem>
            <Button 
            className="t1-button"
            type="primary"
            > 下一步</Button>
        </div>
      </div>
    );
  }
}
