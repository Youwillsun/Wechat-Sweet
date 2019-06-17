//Component Object
Component({
  properties: {
    // URL: {
    //   type: String,
    //   value: 1,
    //   observer: function (newValue) { 
    //     console.log(newValue)
    //   }
    // },

  },
  data: {
    // 保存请求过来的数据
    ImgData:[]
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
    previewImg() {
      var that = this;
      wx.previewImage({
        current: 'http://img4.imgtn.bdimg.com/it/u=1964236026,3056259896&fm=26&gp=0.jpg', // 当前显示图片的http链接
        urls: that.data.imgArr // 需要预览的图片http链接列表
      })
    },
    // 点赞事件
    likeEvent() {
      wx.showToast({
        title: '这是点赞的事件函数',
        duration: 1500
      })
    },
    //页面加载时获取传过来的接口数据并渲染
    getData(options){
      var that = this;
      // 从本地存储中获取到guid的数据
      wx.getStorage({
        key:'Guid',
        // 获取成功，则发送请求
        success(res){
          console.log(res)
          wx.request({
            url: 'https://www.barteam.cn/ApiRoot/FunnyImg/GetFunnyImgInfo',
            data: {
              "guid":res.data
            },
            header: {'content-type':'application/json','cookie':wx.getStorageSync('sessionid')},
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
            success: (result) => {
              var res = result.data;
              if(res.status == 'ok'){
                that.setData({
                  ImgData:res.Data
                });
                console.log(res.Data)
              }
            },
            // 请求失败，展示失败信息
            fail: (result) => {
              var res = result.data;
              if(res.status == 'fail'){
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
  created: function () {
    //调用获取数据的函数
    this.getData();
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