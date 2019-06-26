// pages/ranking/ranking.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 趣图的数据
    funnyImg: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getFunnyImg();
  },

  // 获取趣图的数据
  getFunnyImg() {
    var that = this;
    // 从本地存储中获取到guid的数据
    wx.getStorage({
      key: 'Guid',
      // 获取成功，则发送请求
      success(res) {
        wx.request({
          url: "https://www.barteam.cn/ApiRoot/RankingList/GetRankList",
          data: {
            "guid": res.data
          },
          header: { 'content-type': 'application/json', 'cookie': wx.getStorageSync('sessionid') },
          method: 'post',
          dataType: 'json',
          responseType: 'text',
          success: (result) => {
            // console.log(result)
            var res = result.data;
            if (res.status == 'ok') {
              that.setData({
                funnyImg: res.Data
              })
            }
          },
          // 1、请求失败，展示失败的信息
          fail: (result) => {
            var res = result.data;
            if (res.status === 'fail') {
              wx.showToast({
                title: res.mess,
                duration: 1500
              })
            }
          }
        })
      }
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
    this.getFunnyImg();
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