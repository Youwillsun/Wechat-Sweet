// pages/myImgLike/myImgLike.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 定义数组存放我点赞的趣图的数据
    myImgLikeInfo: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMyImgLikeInfo();
  },

  // 定义方法，请求我点赞的趣图的数据
  getMyImgLikeInfo() {
    var that = this;
    wx.getStorage({
      key: 'Guid',
      success: (res) => {
        wx.request({
          url: 'https://www.barteam.cn/ApiRoot/PersonalFunnyPraisedInfo/GetPersonalFunPraisedInfo',
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
              if(res.Data == ""){
                // 返回上一级
                wx.navigateBack({
                  delta: 1
                });
                wx.showToast({
                  title: '暂无点赞趣图',
                  duration: 2000
                });
              }else{
                that.setData({
                  myImgLikeInfo: res.Data
                })
              }
            }
          },
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
    this.getMyImgLikeInfo();
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