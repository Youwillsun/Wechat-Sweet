// pages/myImgLike/myImgLike.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 定义数组存放我点赞的趣图的数据
    myFunnyLikeInfo: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMyFunnyLikeInfo();
  },

  // 定义方法，请求我点赞的趣图的数据
  getMyFunnyLikeInfo() {
    var that = this;
    wx.getStorage({
      key: 'Guid',
      success: (res) => {
        wx.request({
          url: 'https://www.barteam.cn/ApiRoot/PersonalJokePraisedInfo/GetPersonalJokePraisedInfo',
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
              if (res.Data == "") {
                // 返回上一级
                wx.navigateBack({
                  delta: 1
                });
                wx.showToast({
                  title: '暂无点赞的段子',
                  duration: 1000
                });
              } else {
                that.setData({
                  myFunnyLikeInfo: res.Data
                })
              }
            }
          },
          fail: (result) => {
            var res = result.data;
            if (res.status == 'fail') {
              wx.showToast({
                title: res.mess,
                duration: 1000
              });
            }
          }
        });
      }
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
    this.getMyFunnyLikeInfo();
    wx.stopPullDownRefresh();
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