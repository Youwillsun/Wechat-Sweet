// components/funnyCpt/funnyCpt.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 跳转到段子详情页
  funnyComment() {
    // 获取当前页面的路由对象
    var pages = getCurrentPages();
    var currPage = null;
    if (pages.length) {
      // 获取当前页面的路由
      currPage = pages[pages.length - 1].route;
    }
    if (currPage == 'pages/funnyComment/funnyComment') {
      // 如果当前的页面就是详情页，那么在次点击就啥也不干
    } else {
      // 保留当前页面跳转到应用内某个页面
      wx.showToast({
        title: '加载中···',
        mask: false,
        success: (result) => {
          wx.navigateTo({
            url: '../../pages/funnyComment/funnyComment',
            success: function (res) {
              // 跳转成功，自动关闭加载
              wx.hideToast();
            },
            fail: function (res) { },
            complete: function (res) { }
          });
        },
        fail: () => { },
        complete: () => { }
      });
    }
  },
  // 点击头像，进入我的页面
  headerEvent() {
    wx.switchTab({
      url: '../../pages/mine/mine',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  // 点赞事件
  likeEvent() {
    wx.showToast({
      title: '这是点赞的事件函数',
      duration: 1500
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})