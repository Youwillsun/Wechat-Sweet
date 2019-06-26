// pages/indexComment/indexComment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    URL: "https://www.barteam.cn/ApiRoot/FunnyComment/GetFunnyComInfo",
    funnyComData: [], //趣图评论列表数据,
    funnyInfoData: [], //趣图被评论的内容数据,
    indexId: '', //通过路由传参得到每个趣图的id
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    // 调用获取 我的页面中趣图评论的数据方法（目前不做这个）
    // this.getMineComData()

    let indexId = options.indexId
    this.setData({
      indexId: indexId
    })
    // 调用获取趣图评论页面的数据方法
    this.getIndexComData()
  },
  // 获取趣图评论列表的数据数据
  getIndexComData() {
    let pages = getCurrentPages();
    let currPage = null;
    if (pages.length) {
      // 获取当前页面的前一页面对象
      currPage = pages[pages.length - 2];
    }
    // 获取当前页面的前一页的路由
    let route = currPage.route
    // 通过路由参数，获取每个趣图的id
    let indexId = this.data.indexId
    // 判断一次，如果当前页面的前一页路由是趣图路由，则执行对趣图评论的数据请求
    if (route == "pages/index/index") {
      let guid = wx.getStorageSync('Guid')
      let sessionid = wx.getStorageSync("sessionid")
      wx.request({
        url: 'https://www.barteam.cn/ApiRoot/FunnyComment/GetFunnyComInfo',
        header: {
          "content-type": "application/json",
          "cookie": sessionid
        },
        method: "post",
        data: {
          guid: guid,
          funnyImgId: indexId
        },
        success: (res) => {
          let {
            funnyComData,
            funnyInfoData
          } = res.data
          this.setData({
            funnyComData: funnyComData,
            funnyInfoData: funnyInfoData
          })
        }
      })
    }
  },

  // 在详情页里，要展示详细的数据，所以更换describe对图片描述的样式，让其完全展示
  completeDescribe() {
    Component({
      queryMultipleNodes() {
        const query = wx.createSelectorQuery().in(this);
        query.select('#the-id').boundingClientRect(function(res) {
          res.top // 这个组件内 #the-id 节点的上边界坐标 
        }).exec()
      }
    });
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
    this.getIndexComData();
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