import React from "react";
import "./index.less";
import html2canvas from "html2canvas";
import QRCode from "qrcode.react";
import countTime from "../../util/countTime";
import Moment from "moment";
import {Toast} from 'antd-mobile';

const serverURL = "";
const graduateTime = +new Date(
  Moment("20190621 24:00:00", "YYYYMMDD hh:mm:ss")
);

export default class Share extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      msgId: 3,
      content: "嘿，兄弟，我们好久不见你在哪里",
      sign: "王星锦测试3",
      likeCount: 6,
      status: 0,
      createTime: "2019-05-12T16:38:02",
      updateTime: "2019-05-12T16:38:02",
      posterImg: "",
      isRenderOK: false
    };
  }

  componentWillMount() {
    const msgId = this.props.params.msgId;
  }

  componentDidMount() {
    Toast.loading('生成海报中，请稍后~', 0)
    html2canvas(this.refs.poster, {
      // config here
      height: window.clientHeight,
      width: window.clientWidth,
      allowTaint: true,
      useCORS: true
    }).then(canvas => {
      this.setState({
        posterImg: canvas.toDataURL(),
        isRenderOK: true
      }, ()=> {
        Toast.hide()
      });
    });
  }

  render() {
    const { msgId, content, sign, posterImg, isRenderOK } = this.state;
    const times = countTime(graduateTime);

    return (
      <div className="share">
        {isRenderOK ? (
          <img src={posterImg} alt="" className="posterImg" />
        ) : (
          <div className="share-main" ref="poster">
            <p className="hint">/这是留在西电的第{msgId}条留言/</p>
            <p className="content">{content}</p>
            <p className="sign"> -- {sign}</p>
            <p className="time">
              -------- 距离毕业还有{times.day}天{times.hour}时{times.min}分
              {times.sec}秒 --------
            </p>
            <div className="code">
              <QRCode size={60} value={serverURL} />
            </div>
          </div>
        )}
        <p>{"{ 长按保存图片 }"}</p>
      </div>
    );
  }
}
