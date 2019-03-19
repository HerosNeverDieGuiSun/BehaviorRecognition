import * as echarts from "../../ec-canvas/echarts";

const app = getApp();
// Current time interval object
let currentInterval;
// Global chart
let chart;
// Chart option
let options = [
  // 1 Water Flow Graph options
  {
    xAxis: {
      type: "time",
      name: "时间",
      splitLine: {
        show: false
      }
    },
    yAxis: {
      type: "value",
      name: "流速 L/min",
      splitLine: {
        show: false
      }
    },
    series: [
      {
        data: [],
        type: "line"
      }
    ]
  },
  // 2 Pressure Graph Options
  {
    xAxis: {
      type: "time",
      name: "时间",
      splitLine: {
        show: false
      }
    },
    yAxis: {
      type: "value",
      name: "压力 L/min",
      splitLine: {
        show: false
      }
    },
    series: [
      {
        data: [],
        type: "line"
      }
    ]
  }
];

Page({
  data: {
    ec: {
      onInit: initChart
    },
    currentTab: 0
  },
  onShow: function(e) {
    currentInterval = setInterval(() => {
      let data = options[this.data.currentTab].series[0].data;
      if (data.length > 10) {
        data.shift();
      }
      data.push(generateData());
      chart.setOption({
        series: [
          {
            data: data
          }
        ]
      });
    }, 1000);
  },
  // Switch tab on click
  switchGraph: function(e) {
    clearInterval(currentInterval);
    this.setData({
      currentTab: e.currentTarget.dataset.current
    });
    chart.setOption(options[this.data.currentTab]);
    currentInterval = setInterval(() => {
      let data = options[this.data.currentTab].series[0].data;
      if (data.length > 10) {
        data.shift();
      }
      data.push(generateData());
      chart.setOption({
        series: [
          {
            data: data
          }
        ]
      });
    }, 1000);
  }
});

function initChart(canvas, width, height) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  chart.setOption(options[0], true);

  return chart;
}

function generateData() {
  let now = new Date();
  return {
    name: now.toString(),
    value: [now.getTime(), Math.random() * 1000]
  };
}
