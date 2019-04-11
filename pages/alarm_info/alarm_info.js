import * as echarts from '../../ec-canvas/echarts';

const app = getApp();

// 当前计时器
let currentInterval;
// 全局图表对象
let chart;
// 全局图表配置
let options = [
  // 0 睡眠报警直方图
    // -----------------------------------------------
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
  //  1 离家报警直方图
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
          { value: ['2019/03/23', 7] },
          { value: ['2019/03/24', 1] },
          { value: ['2019/03/25', 0] },
          { value: ['2019/03/26', 8] },
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
  // 2 洗漱报警直方图
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
          { value: ['2019/03/20', 9] },
          { value: ['2019/03/21', 4] },
          { value: ['2019/03/22', 2] },
          { value: ['2019/03/23', 3] },
          { value: ['2019/03/24', 1] },
          { value: ['2019/03/25', 0] },
          { value: ['2019/03/26', 1] },
          { value: ['2019/03/27', 4] },
          { value: ['2019/03/28', 2] },
          { value: ['2019/03/29', 3] }
        ],
        type: 'bar',
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