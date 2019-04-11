import * as echarts from '../../ec-canvas/echarts';
const app = getApp();

// 当前计时器
let currentInterval;
// 全局图表对象
let chart;
// 全局图表配置
let options = {
  xAxis: {
    type: 'time',
    name: '日期',
    splitLine: {
      show: false
    }
  },
  yAxis: {
    type: 'value',
    name: '分数',
    splitLine: {
      show: false
    }
  },
  series: [
    {
      data: [
        { value: ['2019/03/20', 80] },
        { value: ['2019/03/21', 63] },
        { value: ['2019/03/22', 72] },
        { value: ['2019/03/23', 80] },
        { value: ['2019/03/24', 77] },
        { value: ['2019/03/25', 68] },
        { value: ['2019/03/26', 85] },
        { value: ['2019/03/27', 90] },
        { value: ['2019/03/28', 72] },
        { value: ['2019/03/29', 80] }
      ],
      type: 'line',
      label: {
        show: true
      }
    }
  ]
}

Page({
  data: {
    ec: {
      onInit: initChart
    },
    currentTab: 0,
  },


});

function initChart(canvas, width, height) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  chart.setOption(options, true);

  return chart;
}


