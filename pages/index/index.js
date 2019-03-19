import * as echarts from "../../ec-canvas/echarts";

const app = getApp();

Page({
  data: {
    ec: {
      onInit: initChart
    },
    warningCount: 100,
    cognitionState: true
  },
  onLoad: function(e) {
    let interval = 1000 / this.data.warningCount;
    let currentDisplayCount = -1;
    let destinationCount = this.data.warningCount;
    setInterval(() => {
      if (currentDisplayCount !== destinationCount) {
        this.setData({
          warningCount: ++currentDisplayCount
        });
      }
    }, interval);
  },
  // Navigate to corresponding pages
  showInfoPage: function(e) {
    let destination = e.currentTarget.dataset.url;
    wx.navigateTo({
      url: `../${destination}/${destination}`
    });
  }
});

function initChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    series: [
      {
        name: "上周得分",
        type: "gauge",
        axisLine: {
          lineStyle: {
            width: 10,
            color: [[0.2, "#9b413b"], [0.8, "#72849a"], [1, "#a7c3af"]]
          }
        },
        axisTick: {
          length: 10,
          lineStyle: {
            color: "auto"
          }
        },
        splitLine: {
          length: 15,
          lineStyle: {
            color: "auto"
          }
        },
        detail: {
          fontSize: "20"
        },
        data: [
          {
            value: 95
          }
        ]
      }
    ]
  };

  chart.setOption(option, true);

  return chart;
}
