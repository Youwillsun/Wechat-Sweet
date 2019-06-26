// pages/funny/funny.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //段子信息列表
    jokeInfoList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getJokeInfo();
  },
  //获取每条段子的内容以及用户基本信息
  getJokeInfo() {
    let guid = wx.getStorageSync('Guid')
    let sessionid = wx.getStorageSync('sessionid')
    let that = this;
    wx.request({
      method: 'post',
      url: 'https://www.barteam.cn/ApiRoot/JokeInfo/GetJokeInfo',
      data: {
        guid: guid
      },
      header: {
        'content-type': 'application/json',
        'cookie': sessionid
      },
      success(res) {
        if (res.data.status == 'ok') {
          that.setData({
            jokeInfoList: res.data.Data
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.getJokeInfo();
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})