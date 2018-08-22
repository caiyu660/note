// pages/pagelife/pagelife.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
        './images/1.jpg',
        './images/2.jpg',
        './images/3.jpg'
      ],
      indicatorDots: true,
      autoplay: true,
      interval: 5000,
      duration: 1000
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('pagelife onLoad----->');
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('pagelife onReady----->');
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('pagelife onShow----->');
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('pagelife onHide----->');
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('pagelife onUnload----->');
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log('pagelife onPullDownRefresh----->');
    wx.showToast({
      title: '刷新页面',
      icon: 'none',
      duration: 2000
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    wx.showToast({
      title: '上拉更多',
      icon: 'none',
      duration: 2000
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    wx.showToast({
      title: '分享',
      icon: 'none',
      duration: 2000
    })
  },
  handleTap3: function(e){
    console.log('handleTap3--------->', e)
  },
  handleTap2: function () {
    console.log('handleTap2--------->')
  },
  handleTap1: function (e) {
    console.log('handleTap1--------->')
  }
})