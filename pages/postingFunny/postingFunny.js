// pages/postingFunny/postingFunny.js
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

  postingFunny(){
    wx.showToast({
      title: '这是发表段子帖子的事件',
      icon: 'none',
      image: '',
      duration: 1500,
      mask: false,
      success: (result) => {
        // 清空文本
        console.log(123)

        // 跳转页面
        wx.switchTab({
          url: '../funny/funny',
          success: (result)=>{
            
          },
          fail: ()=>{},
          complete: ()=>{}
        });
          
      },
      fail: () => {},
      complete: () => {}
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