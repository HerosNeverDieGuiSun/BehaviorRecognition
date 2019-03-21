import * as echarts from "../../../ec-canvas/echarts";

const app = getApp();

Page({
  data: {
    Sexarray: ['男', '女'],
    sex:'',
    date: '',
    username:'',
    height:null,
    weight:'',
    index: 0,
    showSex:true,
    currentDate: new Date().getTime(),
    minDate: new Date().getTime(),
    errorheight:'',
    errorweight:''
  },
  onChange(event) {
    this.setData({
      currentDate: event.detail.value
    });
  },
  bindPickerChange(e) {
    this.setData({
      // index: e.detail.value,
      sex: this.data.Sexarray[e.detail.value]
    })
    // this.data.sex = this.data.Sexarray[this.data.index]
    console.log(this.data.sex)
  },
  bindDateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  changeusername(e) {
    this.setData({
      username: e.detail
    })
  },
  changeheight(e) {
    this.setData({
      height: e.detail
    })
  },
  errorheightjudge(){
    if((this.data.height-0)>0 && (this.data.height-0)<3) {
      this.setData({
        errorheight: ""
      })
    }else {
      this.setData({
        errorheight: "请输入正确的身高"
      })
    }
  },
  changeweight(e) {
    this.setData({
      weight: e.detail
    })
  },
  errorweightjudge(){
    if((this.data.weight-0)>0 && (this.data.weight-0)<300) {
      this.setData({
        errorweight: ""
      })
    }else {
      this.setData({
        errorweight: "请输入正确的体重"
      })
    }
  },
  saveInfo () {
    // console.log(this.data.sex)
    // console.log(this.data.weight + '   '+this.data.username)
    if (this.data.errorheight=='' && this.data.errorweight=='') {
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
  }
});


