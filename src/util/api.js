import axios from "axios";

const http = axios.create({
  // baseURL: "http://localhost:8000",
  baseURL: "http://193.112.69.104:9090",
  // headers: {'X-Requested-With': 'XMLHttpRequest'},
  responseType: "json"
});

export const postMsg = ({ content, sign }) => {
  return http.post("/msg", { content, sign });
};

export const getAllMsg = ({ page = 0, size = 10, sortKey = "msgId" }) => {
  return http.get(`/msg?page=${page}&size=${size}&sortKey=${sortKey}`);
};

export const getMsgById = ({ msgId = 0 }) => {
  return http.get(`/msg/${msgId}`);
};

export const likeMsg = ({ msgId = 0, count = 1 }) => {
  return http.get(`/msg/${msgId}/like?count=${count}`);
};

export const getAllMsgNumber = () => {
  return http.get(`/msgCount`);
};
