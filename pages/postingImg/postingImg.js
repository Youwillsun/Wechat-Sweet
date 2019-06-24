// pages/postingImg/postingImg.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 图片路径
    imgPath:[],
    // base64图片编码数组
    ImgBase64:[]
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
        var tempFilePath = result.tempFilePaths;// 获取图片路径[多个图片获取到的就是一个字符串数组]
        // 把字符串改成json对象数组
        var imgPathArray = []
        for(let n in tempFilePath){
          imgPathArray.push({path:tempFilePath[n]})
        }
        // 给data里对应的数组赋值
        that.setData({
          imgPath:imgPathArray
        });
        var fileManager = wx.getFileSystemManager();
        // 先定义一个数组，用来存放编码后的图片
        var base64 = [];
        for(let i in tempFilePath){// 循环对多张图片进行格式编码
          fileManager.readFile({
            filePath: tempFilePath[i],// 图片路径
            encoding: 'base64',// 编码格式
            success: (result) => {
              // 把编码后代图片放入数组
              base64.push(result.data);
              // console.log(base64);
            }
          });
        }
        // 把base64编码设置到data对应的数组里
        that.setData({
          ImgBase64:base64
        })
      },
      fail: ()=>{
        wx.showToast({
          title: '图片错误',
          duration: 1500
        });
      }
    });
  },

  //上传图片
  uploadImg(){
    var that = this;
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