import * as echarts from "../../ec-canvas/echarts";

const app = getApp();

Page({
  data: {
    currentTab: 0,
    message: "Waiting for the message to come in."
  },
  switchGraph: function(e) {
    this.setData({
      currentTab: e.currentTarget.dataset.current
    });
  },
  getMessage: function(e) {
    let that = this;
    wx.request({
      url: "http://localhost:8888/api/hello",
      header: {
        "Content-Type": "application/json"
      },
      success: function(response) {
        console.log(response);
      }
    });
  }
});
