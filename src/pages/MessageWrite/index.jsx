import React from "react";
import "./index.less";
import { Link } from "react-router";
import { Carousel, TextareaItem, Button, InputItem, Toast } from "antd-mobile";
import * as api from "../../util/api";
import * as emojHandler from "../../util/emojHandler";


const randArray =[Math.ceil(Math.random() * 3), Math.ceil(Math.random() * 3) ,Math.ceil(Math.random() * 3), Math.ceil(Math.random() * 3)]
export default class MessageWrite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topMessages: [],
      step: 1,
      message: "",
      author: "",
      onProcessing: false,
    };
    this.autoFocusInst = null;
    this.autoFocusInst2 = null;
  }

  nextStep = () => {
    if (this.state.message) {
      this.setState({
        step: 2
      });
    } else {
      alert("留言不能为空");
    }
  };

  finish = () => {
    this.setState({
      onProcessing: true,
    });
    // alert(emojHandler.uploadEmojiString(this.state.message))
    // console.log(emojHandler.utf16ToEntity(this.state.message))
    // alert(emojHandler.utf16ToEntity(this.state.message))
    // alert(this.state.message)
    api
      .postMsg({
        content: this.state.message,
        sign: this.state.author
      })
      .then(res => {
        if (!res.data.code) {
          Toast.success("发布成功！");
          this.props.goMsg();
        }
      })
      .catch(err => {
        this.setState({
          onProcessing: false
        });
      })
      ;
  };


  componentWillMount() {
    api.getAllMsg({ page: 0, size: 4, sortKey: "likeCount" }).then(res => {
      this.setState(() => {
        return Object.assign({}, this.state, {
          topMessages: res.data.data.content
        });
      });
    });
  }

  formClick = (el)=> {
    el.focus();
  }
  formClick2 = ()=> {
    this.autoFocusInst2.focus();
  }

  componentDidUpdate(nextProps, nextState) {
  }
  
  
  componentDidMount() {
  }
  

  render() {
    const { topMessages, step, message, author, testImg, onProcessing } = this.state;
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
            {topMessages.map((obj, index) => {
              return (
                <div
                  className={`write-board card${randArray[index]}`}
                >
                  <p className="message">
                    {" "}
                    {obj.content.length <= 35
                      ? obj.content
                      : obj.content.substr(0, 34) + "..."}
                  </p>
                  <p className="author">—{obj.sign}</p>
                </div>
              );
            })}
          </Carousel>
        </div>

        <Link to="/message" className="linkBox">
          <p className="write-link">戳我查看更多留言 ></p>
        </Link>
        {step === 1 ? (
          <div className="write-text-1" onClick={this.formClick.bind(this, this.autoFocusInst)}>
            <TextareaItem
              className="t1-main"
              autoHeight
              rows={6}
              clear
              ref={el => this.autoFocusInst = el}
              focus={true}
              value={message}
              onChange={evt => {
                this.setState({ message: evt });
              }}
              count={48}
              placeholder={"点击这里写下你的留言"}
            />
            <Button
              className="t1-button"
              type="primary"
              onClick={this.nextStep}
            >
              下一步
            </Button>
          </div>
        ) : null}
        {step === 2 ? (
          <div className="write-text-2" onClick={this.formClick2}>
            <InputItem
              className="main"
              placeholder={"留下你的署名吧"}
              maxLength={16}
              value={author}
              ref={el => this.autoFocusInst2 = el}
              onChange={val => {
                this.setState({
                  author: val
                });
              }}
            />
            {author ? (
              <Button
                className="t2-button"
                type="primary"
                onClick={this.finish}
                disabled={onProcessing}
              >
                完成
              </Button>
            ) : null}
          </div>
        ) : null}
      </div>
    );
  }
}
