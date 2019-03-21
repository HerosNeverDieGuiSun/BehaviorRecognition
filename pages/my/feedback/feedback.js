import * as echarts from "../../../ec-canvas/echarts";
// import Notify from '../../../dist/notify/notify';
// import Toast from '../../../dist/toast/toast';
const app = getApp();

Page({
  data: {
    condition:true
  },
  submmit () {
    wx.showToast({
      title:'成功',
      icon:'success',
      duration: 1000
     })
   
    setTimeout(function () {
      wx.switchTab({
        url: '/pages/my/info/info'//实际路径要写全
      })
    }, 1200) 
  }
});
