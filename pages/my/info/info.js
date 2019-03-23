import * as echarts from "../../../ec-canvas/echarts";

const app = getApp();

Page({
  data: {
    imageurl:'',
    nickname:'',
    province:'',
    city:''
  },
  showimage () {
    var that = this
    wx.getSetting({
      success: function(res){
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            lang:"zh_CN",
            success: function(res) {
              // console.log(res.userInfo.avatarUrl)
              that.setData({
                imageurl: res.userInfo.avatarUrl,
                nickname: res.userInfo.nickName,
                province: res.userInfo.province,
                city: res.userInfo.city
              })
              console.log(res.userInfo)
            }
          })
          
        }
      }
    })
  },
  onShow() {
    this.showimage()
  },
});


