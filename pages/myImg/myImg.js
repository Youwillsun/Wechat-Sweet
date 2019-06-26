//Page Object
Page({
  data: {
    // 定义数组存放我的趣图的数据
    myImgInfo:[]
  },
  //options(Object)
  onLoad: function(options) {
    this.getMyImgInfo();
  },
  // 定义方法，请求我的趣图的数据
  getMyImgInfo(){
    var that = this;
    wx.getStorage({
      key: 'Guid',
      success: (res) => {
        wx.request({
          url: 'https://www.barteam.cn/ApiRoot/PersonalPublishFunnyImgInfo/GetPersonFunnyInfo',
          data: {
            "guid":res.data
          },
          header: {'content-type':'application/json', 'cookie': wx.getStorageSync('sessionid') },
          method: 'POST',
          dataType: 'json',
          responseType: 'text',
          success: (result)=>{
            var res = result.data;
            if(res.status == 'ok'){
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
                  myImgInfo: res.Data
                })
              }
            }
          },
          fail:(result)=>{
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
  onReady: function() {
    
  },
  onShow: function() {
    
  },
  onHide: function() {

  },
  onUnload: function() {

  },
  // 设置下拉刷新事件
  onPullDownRefresh: function() {
    this.getMyImgInfo();
    wx.stopPullDownRefresh();
  },
  onReachBottom: function() {

  },
  onShareAppMessage: function() {

  },
  onPageScroll: function() {

  },
  //item(index,pagePath,text)
  onTabItemTap:function(item) {

  }
});
  