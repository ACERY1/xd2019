import React from "react";
import "./index.less";
import { Badge, PullToRefresh } from "antd-mobile";

import likeImg from "../../assets/like.png";
import likeSelectedImg from "../../assets/like_selected.png";
import MessageCard from "../../components/MessageCard";
import getProverb from "../../assets/proverb";
import debounce from "../../util/debounce";
export default class MessageBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [
        {
          author: "hmp",
          msg: getProverb(),
          like: 40
        },
        {
          author: "hmp",
          msg: getProverb(),
          like: 40
        },
        {
          author: "hmp",
          msg: getProverb(),
          like: 40
        },
        {
          author: "hmp",
          msg: getProverb(),
          like: 40
        },
        {
          author: "hmp",
          msg: getProverb(),
          like: 40
        }
      ],
      height: document.documentElement.clientHeight,
      refreshing: false,
    };
  }

  onRefresh = () => {
    this.setState({ refreshing: true });
    setTimeout(() => {
      this.setState(preState => {
        return {
          messages: preState.messages.concat([
            {
              author: "hmp",
              msg: getProverb(),
              like: 40
            },
            {
              author: "hmp",
              msg: getProverb(),
              like: 40
            },
            {
              author: "hmp",
              msg: getProverb(),
              like: 40
            },
            {
              author: "hmp",
              msg: getProverb(),
              like: 40
            },
            {
              author: "hmp",
              msg: getProverb(),
              like: 40
            }
          ]),
          refreshing: false
        };
      });
    }, 2000);
  };

  sendLike = debounce(messages => {
    console.log(messages);
  }, 2000);

  likeFn = index => {
    let messages = this.state.messages;
    messages[index].like++;
    let newState = Object.assign({}, messages, this.state);
    this.setState(newState);

    this.sendLike(this.state.messages);
  };

  componentDidMount() {
    const hei = this.state.height - ReactDOM.findDOMNode(this.ptr).offsetTop;
    setTimeout(() => this.setState({
      height: hei,
    }), 0);
  }
  
  render() {
    const { messages, refreshing, height } = this.state;
    return (
      <div className="msgBoard">
        <div className="msgBoard-content">
          <PullToRefresh damping={100} direction={"up"} onRefresh={this.onRefresh}
          ref={el => this.ptr = el}
          style={{
            height: height,
            overflow: 'auto',
            paddingBottom: '4vh'
          }}
          refreshing = {refreshing}
          >
            {messages.map((item, index) => {
              return (
                <MessageCard likeFn={this.likeFn} {...item} likeIndex={index} />
              );
            })}
          </PullToRefresh>
        </div>
      </div>
    );
  }
}
