import React from "react";
import "./index.less";
import html2canvas from "../../util/html2canvas";
import QRCode from "qrcode.react";
import countTime from "../../util/countTime";
import * as api from "../../util/api";
import Moment from "../../util/moment";
import { Toast } from "antd-mobile";

const serverURL = "http://api.helloyzy.cn:2019/#/";
const graduateTime = +new Date(
  Moment("20190621 24:00:00", "YYYYMMDD hh:mm:ss")
);

export default class Share extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      msgId: 3,
      content: "",
      sign: "",
      likeCount: 6,
      status: 0,
      createTime: "",
      updateTime: "",
      posterImg: "",
      isRenderOK: false
    };
  }

  componentWillMount() {}

  componentDidMount() {
    Toast.loading("生成海报中，请稍后~", 0);
    const msgId = this.props.params.msgId;
    api.getMsgById({ msgId }).then(res => {
      const data = res.data.data;
      this.setState(Object.assign({}, this.state, { ...data }), () => {
        html2canvas(this.refs.poster, {
          // config here
          height: window.clientHeight,
          width: window.clientWidth,
          allowTaint: true,
          useCORS: true
        }).then(canvas => {
          this.setState(
            {
              posterImg: canvas.toDataURL(),
              isRenderOK: true
            },
            () => {
              Toast.hide();
            }
          );
        });
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
