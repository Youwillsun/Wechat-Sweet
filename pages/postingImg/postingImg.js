// pages/postingImg/postingImg.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 图片路径
    imgPath:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 从本地相册或相机选择图片
  chooseImg(){
    var that = this;
    // 选择趣图
    wx.chooseImage({
      count: 4,// 最大选择数量四张，默认9张
      sizeType: ['original','compressed'],// 原图或压缩图，默认二者皆有
      sourceType: ['album','camera'],// 相册图片还是相机拍摄，默认二者皆有
      success: (result)=>{
        var tempFilePath = result.tempFilePaths;// 获取图片路径
        that.setData({
          imgPath:tempFilePath
        })
        var fileManager = wx.getFileSystemManager();
        for(let i in tempFilePath){// 循环对多张图片进行格式编码
          fileManager.readFile({
            filePath: tempFilePath[i],// 图片路径
            encoding: 'base64',// 编码格式
            success: (result) => {
              console.log("第"+i+"张"+result.data);
            },
            fail: () => {},
            complete: () => {}
          });
        }
      },
      fail: ()=>{},
      complete: ()=>{}
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