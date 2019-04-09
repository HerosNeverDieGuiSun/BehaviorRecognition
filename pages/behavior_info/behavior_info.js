import * as echarts from '../../ec-canvas/echarts';

const app = getApp();
// 当前计时器
let currentInterval;
// 全局图表对象
let chart;
// 全局图表配置
let options = [
  // 0 睡眠直方图
  {
    xAxis: {
      type: 'time',
      name: '日期 天',
      splitLine: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      name: '时间 分钟',
      splitLine: {
        show: false
      }
    },
    series: [
      {
        data: [
          { value: ['2019/03/20', 540] },
          { value: ['2019/03/21', 480] },
          { value: ['2019/03/22', 523] },
          { value: ['2019/03/23', 600] },
          { value: ['2019/03/24', 472] },
          { value: ['2019/03/25', 492] },
          { value: ['2019/03/26', 456] },
          { value: ['2019/03/27', 575] },
          { value: ['2019/03/28', 534] },
          { value: ['2019/03/29', 500] }
        ],
        type: 'bar',
        label: {
          show: true
        }
      }
    ]
  },
  // 1 离家直方图
  {
    xAxis: {
      type: 'time',
      name: '日期',
      splitLine: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      name: '次',
      splitLine: {
        show: false
      }
    },
    series: [
      {
        data: [
          { value: ['2019/03/20', 3] },
          { value: ['2019/03/21', 4] },
          { value: ['2019/03/22', 2] },
          { value: ['2019/03/23', 3] },
          { value: ['2019/03/24', 1] },
          { value: ['2019/03/25', 0] },
          { value: ['2019/03/26', 1] },
          { value: ['2019/03/27', 1] },
          { value: ['2019/03/28', 2] },
          { value: ['2019/03/29', 3] }
        ],
        type: 'bar',
        label: {
          show: true
        }
      }
    ]
  },
  // 2 洗漱直方图
  {
    xAxis: {
      type: 'category',
      name: '时点',
      splitLine: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      name: '次',
      splitLine: {
        show: false
      }
    },
    series: [
      {
        data: [
          { value: ['周一 日', 2] },
          { value: ['周一 夜', 1] },
          { value: ['周二 日', 2] },
          { value: ['周二 夜', 2] },
          { value: ['周三 日', 1] },
          { value: ['周三 夜', 2] },
          { value: ['周四 日', 3] },
          { value: ['周四 夜', 3] },
          { value: ['周五 日', 2] },
          { value: ['周五 夜', 3] },
          { value: ['周六 日', 2] },
          { value: ['周六 夜', 1] },
          { value: ['周日 日', 2] },
          { value: ['周日 夜', 1] },
        ],
        type: 'bar',
        label: {
          show: true
        }
      }
    ]
  },
  // 3 用餐折线图
  {
    xAxis: {
      type: 'time',
      name: '日期',
      splitLine: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      name: '总时长 min',
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
  },
  // 4 如厕直方图
  {
    xAxis: {
      type: 'time',
      name: '日期',
      splitLine: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      name: '次',
      splitLine: {
        show: false
      }
    },
    series: [
      {
        data: [
          { value: ['2019/03/20', 3] },
          { value: ['2019/03/21', 4] },
          { value: ['2019/03/22', 2] },
          { value: ['2019/03/23', 3] },
          { value: ['2019/03/24', 1] },
          { value: ['2019/03/25', 0] },
          { value: ['2019/03/26', 1] },
          { value: ['2019/03/27', 1] },
          { value: ['2019/03/28', 2] },
          { value: ['2019/03/29', 3] }
        ],
        type: 'bar',
        label: {
          show: true
        }
      }
    ]
  },
];

Page({
  data: {
    ec: {
      onInit: initChart
    },
    currentTab: 0,
  },

  /**
   * 当切换标签时触发，切换成不同的图表，重新获取数据
   */
  switchGraph: function(e) {
    clearInterval(currentInterval);
    this.setData({
      currentTab: e.currentTarget.dataset.current
    });
    chart.setOption(options[this.data.currentTab]);
  },

});

function initChart(canvas, width, height) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  chart.setOption(options[0], true);

  chart.on('click', (params) => {
    console.log(params);
  })
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
