import React from "react";
import "./index.less";
import { Badge, PullToRefresh, Toast, Switch } from "antd-mobile";

import likeImg from "../../assets/like.png";
import clickImg from "../../assets/click.png";
import likeSelectedImg from "../../assets/like_selected.png";
import MessageCard from "../../components/MessageCard";
import getProverb from "../../assets/proverb";
import debounce from "../../util/debounce";
import * as api from "../../util/api";
export default class MessageBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      height: document.documentElement.clientHeight,
      refreshing: false,
      page: 0,
      size: 10,
      sortKey: "msgId",
      checked: false
    };
  }

  onRefresh = () => {
    this.setState({ refreshing: true });
    api
      .getAllMsg({
        size: 10,
        page: this.state.page,
        sortKey: this.state.sortKey
      })
      .then(res => {
        if (res.data.data.content.length === 0) {
          this.setState(preState => {
            return {
              messages: preState.messages.concat(res.data.data.content),
              refreshing: false
            };
          });
        } else {
          this.setState(preState => {
            return {
              messages: preState.messages.concat(res.data.data.content),
              refreshing: false,
              page: preState.page + 1
            };
          });
        }
      });
  };

  sendLike = debounce(({ index, likeCount }) => {
    const msgId = this.state.messages[index].msgId;
    api
      .likeMsg({
        msgId,
        count: likeCount
      })
      .then(res => {
        if (!res.data.code) {
          Toast.success(`喜欢该留言${likeCount}次`, 1.2);
        } else {
          Toast.fail("点赞失败！");
        }
      })
      .catch(err => {
        Toast.fail("点赞失败！");
      });
  }, 2000);

  likeFn = (index, likeCount) => {
    let messages = this.state.messages;
    messages[index].likeCount++;
    let newState = Object.assign({}, messages, this.state);
    this.setState(newState);
    this.sendLike({ index, likeCount });
  };

  switchFn = () => {
    if (this.state.checked) {
      // 时间
      this.setState(
        {
          messages: [],
          page: 0,
          checked: false,
          sortKey: "msgId"
        },
        () => {
          api
            .getAllMsg({
              page: this.state.page,
              size: this.state.size,
              sortKey: this.state.sortKey
            })
            .then(res => {
              this.setState({
                messages: res.data.data.content,
                page: 1
              });
            });
        }
      );
    } else {
      // 热度排序
      this.setState(
        {
          messages: [],
          page: 0,
          checked: true,
          sortKey: "likeCount"
        },
        () => {
          api
            .getAllMsg({
              page: this.state.page,
              size: this.state.size,
              sortKey: this.state.sortKey
            })
            .then(res => {
              this.setState({
                messages: res.data.data.content,
                page: 1
              });
            });
        }
      );
    }
  };

  goPoster = (item, evt) => {
    if (evt.target.nodeName === "IMG") {
      return false;
    } else {
      this.props.router.push(`/share/${item.msgId}`);
    }
  };

  componentDidMount() {
    const hei = this.state.height - ReactDOM.findDOMNode(this.ptr).offsetTop;
    setTimeout(
      () =>
        this.setState({
          height: hei
        }),
      0
    );
    api
      .getAllMsg({ page: 0, size: 10, sortKey: this.state.sortKey })
      .then(res => {
        this.setState({
          messages: res.data.data.content,
          page: 1
        });
      });
  }

  render() {
    const { messages, refreshing, height } = this.state;
    return (
      <div className="msgBoard">
        <p className="msgBoard-hint">
          <img src={clickImg} alt="" />
          <span>点击卡片分享你喜欢的留言</span>
        </p>
        <div className="switch">
          <p>按热度排序</p>
          <Switch
            checked={this.state.checked}
            onChange={this.switchFn}
            platform="android"
          />
        </div>
        <div className="msgBoard-content">
          <PullToRefresh
            damping={100}
            direction={"up"}
            onRefresh={this.onRefresh}
            ref={el => (this.ptr = el)}
            style={{
              height: height,
              overflow: "auto",
              paddingBottom: "4vh"
            }}
            refreshing={refreshing}
          >
            {messages.map((item, index) => {
              return (
                <MessageCard
                  likeFn={this.likeFn}
                  proverb={item.content}
                  sign={item.sign}
                  like={item.likeCount}
                  likeIndex={index}
                  goPoster={this.goPoster.bind(this, item)}
                />
              );
            })}
          </PullToRefresh>
        </div>
      </div>
    );
  }
}
