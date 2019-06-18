// pages/indexComment/indexComment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    URL:"https://www.barteam.cn/ApiRoot/FunnyComment/GetFunnyComInfo"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.completeDescribe();
  },

  // 在详情页里，要展示详细的数据，所以更换describe对图片描述的样式，让其完全展示
  completeDescribe() {
    Component({
      queryMultipleNodes() {
        const query = wx.createSelectorQuery().in(this); query.select('#the-id').boundingClientRect(function (res) {
          res.top // 这个组件内 #the-id 节点的上边界坐标 
        }).exec()
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