import * as echarts from "../../ec-canvas/echarts";

const app = getApp();

Page({
  data: {
    currentTab: 0
  },
  switchGraph: function(e) {
    this.setData({
      currentTab: e.currentTarget.dataset.current
    });
  },
  swipeGraph: function(e) {
    this.setData({
      currentTab: e.detail.current
    });
  }
});
