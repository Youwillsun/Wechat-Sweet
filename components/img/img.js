//Component Object
Component({
  properties: {
    'ImgData': {
      type: Array,
      value: '',
      observer: function (newValue) {
        // 通过map函数，把图片地址单独抽离成一个字符串数组
        var imageUrl = newValue.map(item=>{return item.imgUrl});
        this.setData({
          ImgData:newValue,
          ImgUrl:imageUrl
        });
      }
    }
  },
  data: {
    // 保存传递过来的数据
    ImgData:[],
    //把图片单独抽离出来
    ImgUrl: []
  },
  methods: {
    // 点击头像，进入我的页面
    headerEvent() {
      wx.switchTab({
        url: '../../pages/mine/mine',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    },
    // 进入评论详细页
    indexDetail() {
      // 获取当前页面的路由对象
      var pages = getCurrentPages();
      var currPage = null;
      if (pages.length) {
        // 获取当前页面的路由
        currPage = pages[pages.length - 1].route;
      }

      if (currPage == 'pages/indexComment/indexComment') {
        // 如果当前的页面就是详情页，那么在次点击就啥也不干
      } else {
        // 保留当前页面跳转到应用内某个页面
        wx.showToast({
          title: '加载中···',
          mask: false,
          success: (result) => {
            wx.navigateTo({
              url: '../../pages/indexComment/indexComment',
              success: function (res) {
                // 跳转成功，自动关闭加载
                wx.hideToast();
              },
              fail: function (res) { },
              complete: function (res) { }
            });
          },
          fail: () => { },
          complete: () => { }
        });
      }
    },
    //预览图片
    previewImg(e) {
      var that = this;
      var current = e.target.dataset.src;
      wx.previewImage({
        current: current, // 当前显示图片的http链接
        urls: that.data.ImgUrl // 需要预览的图片http链接列表
      })
    },
    // 点赞事件
    likeEvent() {
      var that = this;
      // 从本地存储中获取到guid的数据
      wx.getStorage({
        key: 'Guid',
        // 获取成功，则发送请求
        success(res) {
          wx.request({
            url: "https://www.barteam.cn/ApiRoot/FunnyImgPraised/AddFunnyImgPraised",
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
                wx.showToast({
                  title: res.mess,
                  duration: 1500,
                  success: (result) => {
                    
                  }
                });
              }
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
      })
    },
  },
  created: function () { 
  },
  attached: function () {

  },
  ready: function () {

  },
  moved: function () {

  },
  detached: function () {

  },
});