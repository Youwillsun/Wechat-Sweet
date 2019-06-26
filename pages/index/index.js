//index.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 保存请求过来的数据
    ImgData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData();
  },

  //页面加载时获取传过来的接口数据并渲染
  getData() {
    var that = this;
    // 从本地存储中获取到guid的数据
    wx.getStorage({
      key: 'Guid',
      // 获取成功，则发送请求
      success(res) {
        wx.request({
          url: "https://www.barteam.cn/ApiRoot/FunnyImg/GetFunnyImgInfo",
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
                ImgData: res.Data
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
    this.getData();
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