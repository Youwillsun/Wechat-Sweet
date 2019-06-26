// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 存储获取到的个人数据
    mineInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMineInfo();
  },
  // 获取个人信息页面的数据
  getMineInfo(){
    var that = this;
    // 从本地存储中获取到guid的数据
    wx.getStorage({
      key: 'Guid',
      // 获取成功，则发送请求
      success(res) {
        wx.request({
          url: "https://www.barteam.cn/ApiRoot/Personal/GetPersonal",
          data: {
            "guid": res.data
          },
          header: { 'content-type': 'application/json', 'cookie': wx.getStorageSync('sessionid') },
          method: 'POST',
          dataType: 'json',
          responseType: 'text',
          success: (result) => {
            var res = result.data;
            if (res.status == 'ok') {
              that.setData({
                mineInfo: res.Data
              });
            }
          },
          // 请求失败，展示失败信息
          fail: (result) => {
            var res = result.data;
            if (res.status == 'fail') {
              wx.showToast({
                title: res.mess,
                duration: 1500
              });
            }
          }
        });
      }
    });
  },
  // 点击进入我的趣图页面
  myImg() {
    wx.navigateTo({
      url: '../myImg/myImg',
      success: (result) => { },
      fail: () => { },
      complete: () => { }
    });
  },
  // 点击进入我的趣图评论页面
  myImgComment() {
    // wx.navigateTo({
    //   url: '../indexComment/indexComment',
    //   success: (result) => {},
    //   fail: () => { },
    //   complete: () => { }
    // });
    wx.showToast({
      title: '功能暂未开放',
      icon: 'none',
      duration: 1000
    })
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
    // wx.navigateTo({
    //   url: '../funnyComment/funnyComment',
    //   success: (result) => {},
    //   fail: () => { },
    //   complete: () => { }
    // });
    wx.showToast({
      title: '功能暂未开放',
      icon: 'none',
      duration: 1000
    })
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