import * as echarts from '../../ec-canvas/echarts';

const app = getApp();
// 当前计时器
let currentInterval;
// 全局图表对象
let chart;
// 全局图表配置
let options = [
  // 0 水流折线图
  {
    xAxis: {
      type: 'time',
      name: '时间',
      splitLine: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      name: '流速 L/min',
      splitLine: {
        show: false
      }
    },
    series: [
      {
        data: [],
        type: 'line',
        label: {
          show: true
        }
      }
    ]
  },
  // 1 压力折线图
  {
    xAxis: {
      type: 'time',
      name: '时间',
      splitLine: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      name: '压力 ',
      splitLine: {
        show: false
      }
    },
    series: [
      {
        data: [],
        type: 'line',
        label: {
          show: true
        }
      }
    ]
  },
  // 2 温度折线图
  {
    xAxis: {
      type: 'time',
      name: '时间',
      splitLine: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      name: '温度 C',
      splitLine: {
        show: false
      }
    },
    series: [
      {
        data: [
          { value: ['2019/03/20 00:00', 19] },
          { value: ['2019/03/20 01:00', 18] },
          { value: ['2019/03/20 02:00', 17] },
          { value: ['2019/03/20 03:00', 16] },
          { value: ['2019/03/20 04:00', 17] },
          { value: ['2019/03/20 05:00', 18] },
          { value: ['2019/03/20 06:00', 19] },
          { value: ['2019/03/20 07:00', 20] },
          { value: ['2019/03/20 08:00', 22] },
          { value: ['2019/03/20 09:00', 24] }
        ],
        type: 'line',
        label: {
          show: true
        }
      }
    ]
  },
  // 3 湿度折线图
  {
    xAxis: {
      type: 'time',
      name: '时间',
      splitLine: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      name: '湿度 %RH',
      splitLine: {
        show: false
      }
    },
    series: [
      {
        data: [
          { value: ['2019/03/20 00:00', 50] },
          { value: ['2019/03/20 01:00', 43] },
          { value: ['2019/03/20 02:00', 42] },
          { value: ['2019/03/20 03:00', 40] },
          { value: ['2019/03/20 04:00', 37] },
          { value: ['2019/03/20 05:00', 38] },
          { value: ['2019/03/20 06:00', 45] },
          { value: ['2019/03/20 07:00', 50] },
          { value: ['2019/03/20 08:00', 52] },
          { value: ['2019/03/20 09:00', 60] }
        ],
        type: 'line',
        label: {
          show: true
        }
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
    clearInterval(currentInterval);
    initData(this.data.currentTab);
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

  /**
   * 当切换标签时触发，切换成不同的图表，重新获取数据
   */
  switchGraph: function(e) {
    clearInterval(currentInterval);
    this.setData({
      currentTab: e.currentTarget.dataset.current
    });
    if (this.data.currentTab !== 0 && this.data.currentTab !== 1) {
      chart.setOption(options[this.data.currentTab]);
      return;
    }
    initData(this.data.currentTab);
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

/**
 * 在当前时间点的前10秒随机生成10个模拟数据
 * @param currentTab 当前标签序号
 */
function initData(currentTab, here) {
  options[currentTab].series[0].data.length = 0;

  let now = new Date();
  for (let i = 10; i > 0; i--) {
    let dataTime = new Date(now);
    dataTime.setSeconds(dataTime.getSeconds() - i);
    options[currentTab].series[0].data.push({
      name: dataTime.toString(),
      value: [dataTime.getTime(), Math.round(Math.random() * 1000)]
    });
  }
}

/**
 * 在当前时间点随机生成一个数值构成坐标点
 */
function generateData() {
  let now = new Date();
  return {
    name: now.toString(),
    value: [now.getTime(), Math.round(Math.random() * 1000)]
  };
}
