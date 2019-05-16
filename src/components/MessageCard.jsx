import React from "react";
import "./messageCard.less";
import likeImg from "../assets/like.png";
import likeSelectedImg from "../assets/like_selected.png";
import getProverb from "../assets/proverb";
import { Toast } from "antd-mobile";

export default class MessageCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLike: false,
      proverb: getProverb(),
      random: Math.ceil(Math.random() * 3),
      likeCount: 0
    };
  }

  like = index => {
    if (this.state.isLike) {
      if (this.state.likeCount < 10) {
        this.setState(
          preState => {
            return {
              likeCount: preState.likeCount + 1
            };
          },
          () => {
            this.props.likeFn(index, this.state.likeCount);
          }
        );
      } else {
        Toast.info("点赞最多10个喔");
      }
    } else {
      this.setState(preState => {
        return {
          isLike: true,
          likeCount: preState.likeCount + 1
        };
      }, () => {
        this.props.likeFn(index, this.state.likeCount);
      });

    }
  };

  onLikeChange = cb => {
    cb(this.state.nowLikeNumber);
  };

  render() {
    const { isLike, proverb, random } = this.state;
    const {
      like: nowLikeNumber,
      sign: author,
      proverb: msg,
      likeIndex,
      goPoster
    } = this.props;
    return (
      <div className="msgCard">
        <div className={`msgCard-item card${random}`} onClick={goPoster}>
          <p className="message">{msg || proverb}</p>
          <p className="author">-- {author || "2019我毕业"}</p>
          <p className="like">
            {isLike ? (
              <img
                src={likeSelectedImg}
                alt=""
                className="like-icon"
                onClick={this.like.bind(this, likeIndex)}
              />
            ) : (
              <img
                src={likeImg}
                alt=""
                className="like-icon"
                onClick={this.like.bind(this, likeIndex)}
              />
            )}
            <span className="like-text">{nowLikeNumber || 0}</span>
          </p>
        </div>
      </div>
    );
  }
}
