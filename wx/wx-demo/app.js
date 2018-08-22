//app.js
App({
  onLaunch: function (options) {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs);
    console.log('app onLaunch---->', options);
  },
  onShow: function(options) {
    console.log('app onShow---->', options);
    //throw new Error('api error');
  },
  onHide: function() {
    console.log('app onHide---->');
  },
  onError: function(e){
    // 小程序异常捕获 
    console.log('error--->', arguments); 
  },
  /**
   * 页面不存在 主要适用场景  分享出去的页面某天下限了 再次访问的时候需要回到首页
   */
  onPageNotFound: function(){
    console.log('page not found, to 404 page');
    wx.showToast({
        title: '您访问的页面不存在',
        icon: 'none',
        duration: 2000
    })
    setTimeout(() => {
        wx.switchTab({
            url: '/pages/index/index',
        })
    }, 3000);
  },
  globalData: {
    userInfo: null
  }
});