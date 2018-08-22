//index.js
//获取应用实例
const app = getApp()
const pageName = 'index';
Page({
  data: {
    info: '从url获取的数据',
    pageInfo: '从页面实例获取'
  },
  onLoad: function () {
    console.log(`${pageName} onLoad ----->`);
    wx.setNavigationBarTitle({
        title: '小程序分享'
    })
  },
  onShow: function() {
    console.log(`${pageName} onShow ----->`);
  },
  onReady: function() {
    console.log(`${pageName} onReady ----->`);
  },
  onHide: function() {
    console.log(`${pageName} onHide ----->`);
  },
  onUnload: function() {
    console.log(`${pageName} onUnload ----->`);
  },
  //事件处理函数
  openCmplink: function() {
    wx.navigateTo({
      url: '../cmplink/cmplink'
    })
  },
  openPageLifeCycyle: function() {
    wx.navigateTo({
        url: `../pagelife/pagelife`
      })
  },
  openPageLink: function() {
    getApp().globalData.globalInfo = '从全局变量获取';
    wx.setStorageSync('storeInfo','从本地存储获取');
    wx.navigateTo({
        url: `../pagelink/pagelink?info=${this.data.info}`
      })
  },
  openCmpLifePage: function(){
    wx.navigateTo({
        url: '../cmplife/cmplife'
      })
  },
  openTemplate: function(){
    wx.navigateTo({
        url: '../template/template'
      })
  },
  openWxs: function() {
    wx.navigateTo({
        url: '../wxs/wxs'
      })
  }
})
