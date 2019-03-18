import * as echarts from "../../ec-canvas/echarts";

const app = getApp();

Page({
  data: {
    ec: {
      onInit: initChart
    }
  }
});

function initChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: 230,
    height: 230
  });
  canvas.setChart(chart);

  var option = {
    backgroundColor: "#ffffff",
    color: ["#37A2DA", "#32C5E9", "#67E0E3"],
    series: [
      {
        name: "上周得分",
        type: "gauge",
        axisLine: {
          show: true,
          lineStyle: {
            width: 18,
            shadowBlur: 0,
            color: [[0.4, "#fd666d"], [0.8, "#37a2da"], [1, "#67e0e3"]]
          }
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
