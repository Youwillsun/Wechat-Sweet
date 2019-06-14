// pages/mine/mine.js
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
  // 点击进入我的趣图页面
  myImg() {
    wx.navigateTo({
      url: '../myImg/myImg',
      success: (result) => {

      },
      fail: () => { },
      complete: () => { }
    });
  },
  // 点击进入我的趣图评论页面
  myImgComment() {
    wx.navigateTo({
      url: '../indexComment/indexComment',
      success: (result) => {

      },
      fail: () => { },
      complete: () => { }
    });
  },
  // 点击进入我点赞的趣图
  myImgLike() {
    wx.navigateTo({
      url: '../myImgLike/myImgLike',
      success: (result) => {

      },
      fail: () => { },
      complete: () => { }
    });

  },
  // 点击进入我的段子页面
  myFunny() {
    wx.navigateTo({
      url: '../myFunny/myFunny',
      success: (result) => {

      },
      fail: () => { },
      complete: () => { }
    });
  },
  // 点击进入我的趣图评论页面
  myFunnyComment() {
    wx.navigateTo({
      url: '../funnyComment/funnyComment',
      success: (result) => {

      },
      fail: () => { },
      complete: () => { }
    });
  },
  // 点击进入我点赞的趣图
  myFunnyLike() {
    wx.navigateTo({
      url: '../myFunnyLike/myFunnyLike',
      success: (result) => {

      },
      fail: () => { },
      complete: () => { }
    });

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