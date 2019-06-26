// pages/postingFunny/postingFunny.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 存放发表的段子内容
    FunnyContent:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // 获取写下的段子文本
  FunnyContent(e){
    var that = this;
    that.setData({
      FunnyContent: e.detail.value
    })
  },

  // 把段子发给后台
  uploadFunny(){
    var that = this;
    console.log(that.data.FunnyContent)
    if(that.data.FunnyContent == ''){
      wx.showToast({
        title: '还没填写段子哦',
        duration: 1500
      })
    }else{
      // 从本地存储中获取到guid的数据
      wx.getStorage({
        key: 'Guid',
        // 获取成功，则发送请求
        success(res) {
          wx.request({
            url: "https://www.barteam.cn/ApiRoot/UpLoadJoke/UpLoadJokes",
            data: {
              "guid": res.data,
              "JokeContent": that.data.FunnyContent
            },
            header: { 'content-type': 'application/json', 'cookie': wx.getStorageSync('sessionid') },
            method: 'POST',
            dataType: 'json',
            responseType: 'text',
            success: (result) => {
              var res = result.data;
              if (res.status == 'ok') {
                wx.showToast({
                  title: res.mess,
                  duration: 1500
                });
              } else {
                wx.showToast({
                  title: res.mess,
                  duration: 1500
                });
              }
              // 趣图发表完成之后，重定向到本页面，完成刷新清除数据的效果
              wx.redirectTo({
                url: 'postingFunny',
              })
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
    }
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