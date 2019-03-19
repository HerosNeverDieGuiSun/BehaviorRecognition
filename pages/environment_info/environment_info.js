import * as echarts from "../../ec-canvas/echarts";

const app = getApp();

Page({
  data: {
    currentTab: 0
  },
  // Switch tab on click
  switchGraph: function(e) {
    this.setData({
      currentTab: e.currentTarget.dataset.current
    });
  },
  // Switch tab on swipe
  swipeGraph: function(e) {
    this.setData({
      currentTab: e.detail.current
    });
  }
});
