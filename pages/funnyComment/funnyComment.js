// pages/funnyComment/funnyComment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    JokeComData: [], //这是段子评论页的评论数据
    JokeInfoData: [], //这是段子评论页，被评论的数据
    funnyId: '', //获取到段子每个id
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    this.setData({
      funnyId: this.options.funnyId
    })

    // 调用获取段子评论界面的数据
    this.getFunnyComData()
  },
  // 获取段子评论界面的数据
  getFunnyComData() {
    let guid = wx.getStorageSync("Guid")
    let sessionid = wx.getStorageSync('sessionid')
    let {
      funnyId
    } = this.data
    wx.request({
      url: 'https://www.barteam.cn/ApiRoot/JokeComment/GetJokeComInfo',
      method: "post",
      data: {
        guid: guid,
        jokeId: funnyId
      },
      header: {
        'content-type': "application/json",
        'cookie': sessionid
      },
      success: (res) => {
        let {
          JokeComData,
          JokeInfoData
        } = res.data
        this.setData({
          JokeComData: JokeComData,
          JokeInfoData: JokeInfoData
        })
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
    this.getFunnyComData();
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