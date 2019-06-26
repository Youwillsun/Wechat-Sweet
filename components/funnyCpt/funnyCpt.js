//注册组件
Component({
  properties: {
    'jokeInfo': {
      type: Array,
      value: '',
      observer: function(newValue) {
        this.setData({
          jokeInfoList: newValue
        });
      }
    },
    "JokeInfoData": {
      type: Array,
      value: '',
      observer: function(newValue) {
        this.setData({
          jokeInfoList: newValue
        })
      }
    }
  },
  data: {
    // 保存传递过来的数据
    jokeInfoList: []
  },
  methods: {
    // 跳转到段子详情页
    funnyDetail(e) {
      // 获取当前页面的路由对象
      var pages = getCurrentPages();
      var currPage = null;
      if (pages.length) {
        // 获取当前页面的路由
        currPage = pages[pages.length - 1].route;
      }
      if (currPage == 'pages/funnyComment/funnyComment') {
        // 如果当前的页面就是详情页，那么在次点击就啥也不干
      } else {
        // 获取到每个段子的id
        let funnyId = e.currentTarget.dataset.id
        // 保留当前页面跳转到应用内某个页面
        wx.showToast({
          title: '加载中···',
          mask: false,
          success: (result) => {
            wx.navigateTo({
              url: '../../pages/funnyComment/funnyComment?funnyId=' + funnyId,
              success: function(res) {
                // 跳转成功，自动关闭加载
                wx.hideToast();
              },
              fail: function(res) {},
              complete: function(res) {}
            });
          },
          fail: () => {},
          complete: () => {}
        });
      }
    },
    // 点击头像，进入我的页面
    headerEvent() {
      wx.switchTab({
        url: '../../pages/mine/mine',
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    },
    // 点赞事件
    likeEvent(e) {
      var that = this;
      // 获取点击那个元素的id
      var funnyLikeId = e.currentTarget.dataset.id;;
      console.log(funnyLikeId)
      // 从本地存储中获取到guid的数据
      wx.getStorage({
        key: 'Guid',
        // 获取成功，则发送请求
        success(res) {
          wx.request({
            url: "https://www.barteam.cn/ApiRoot/JokePraised/AddJokePraised",
            data: {
              "guid": res.data,
              "jokeId": funnyLikeId
            },
            header: { 'content-type': 'application/json', 'cookie': wx.getStorageSync('sessionid') },
            method: 'POST',
            dataType: 'json',
            responseType: 'text',
            success: (result) => {
              var res = result.data;
              if (res.status == 'ok') {
                //待定，微信小程序没有双向绑定一说，需要特别实现
                that.data.jokeInfoList.forEach((item, index) => {
                  if (item.id == funnyLikeId) {
                    that.data.jokeInfoList[index].praisedNum++;
                    wx.showToast({
                      title: res.mess,
                      duration: 1000
                    });
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
                  duration: 1000
                })
              }
            }
          });
        }
      })
    }
  },

})