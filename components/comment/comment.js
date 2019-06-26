// components/comment/comment.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    "funnyComData": {
      type: Array,
      value: '',
      observer: function(newValue) {
        this.setData({
          commentList: newValue
        })
      }
    },
    "JokeComData": {
      type: Array,
      observer: function(newValue) {
        this.setData({
          commentList: newValue
        })
      }
    },
    "indexId": {
      type: String,
      observer: function(newValue) {
        this.setData({
          indexId: newValue
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    commentList: [], //评论数据列表
    comContent: '', //发送评论框内容
    indexId: '', //趣图评论的id
  },
  created() {},

  /**
   * 组件的方法列表
   */
  methods: {
    // 趣图发表评论数据双向绑定
    sendComContent(e) {
      let datatype = e.target.dataset.type
      datatype: e.detail.value
      this.setData({
        comContent: e.detail.value
      })
    },
    // 发送评论
    submitCom() {
      // 获取所有加载的页面存放的数组
      let pages = getCurrentPages();
      let currPage = null;
      if (pages.length) {
        // 获取当前页面的对象（上边所获得的数组中最后一项就是当前页面的对象）
        currPage = pages[pages.length - 1];
      }
      // 获取当前页面的路由
      let route = currPage.route

      if (route == "pages/indexComment/indexComment") {
        let comcontent = this.data.comContent; //得到评论内容传给后台
        let guId = wx.getStorageSync("Guid");
        let sessionId = wx.getStorageSync('sessionid')
        let {
          indexId
        } = this.data
        if (comcontent == "") {
          wx.showToast({
            title: '请先输入评论内容！',
          })
        } else {
         
          wx.request({
            url: 'https://www.barteam.cn/ApiRoot/PublishFunnyImgCom/PublishFunnyComment',
            method: 'post',
            data: {
              guid: guId,
              funnyImgId: indexId,
              content: comcontent
            },
            header: {
              'content-type': 'application/json',
              'cookie': sessionId
            },
            success: (res) => {
              // // 重新从后台调用一次趣图的评论数据，然后把数据重新渲染一次
              this.getIndexComData();
              this.setData({
                comContent: ''
              })
            }
          })
        }
      } else if (route == "pages/funnyComment/funnyComment") {
        let comcontent = this.data.comContent; //得到评论内容为了传给后台
        let guId = wx.getStorageSync("Guid");
        let sessionId = wx.getStorageSync('sessionid')
        let {
          indexId
        } = this.data
        if (comcontent == "") {
          wx.showToast({
            title: '请先输入评论内容！',
          })
        } else {
          wx.request({
            url: 'https://www.barteam.cn/ApiRoot/PublishJokeCom/PublishJokesCom',
            method: 'post',
            data: {
              guid: guId,
              jokeId: indexId,
              content: comcontent
            },
            header: {
              'content-type': 'application/json',
              'cookie': sessionId
            },
            success: (res) => {

              // 重新从后台调用一次段子的评论数据，然后把数据重新渲染一次
              this.getFunnyComData()
              this.setData({
                comContent: ''
              })
            }
          })
        }
      }


    },
    // 获取趣图评论列表数据
    getIndexComData() {
      let guid = wx.getStorageSync('Guid')
      let sessionid = wx.getStorageSync("sessionid")
      let {
        indexId
      } = this.data
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
            funnyComData
          } = res.data
          this.setData({
            commentList: funnyComData
          })
        }
      })
    },
    // 获取段子评论列表数据
    getFunnyComData() {
      let guid = wx.getStorageSync("Guid")
      let sessionid = wx.getStorageSync('sessionid')
      let {
        indexId
      } = this.data
      wx.request({
        url: 'https://www.barteam.cn/ApiRoot/JokeComment/GetJokeComInfo',
        method: "post",
        data: {
          guid: guid,
          jokeId: indexId
        },
        header: {
          'content-type': "application/json",
          'cookie': sessionid
        },
        success: (res) => {
          let {
            JokeComData
          } = res.data
          this.setData({
            commentList: JokeComData,
          })
        }

      })
    },

  }

})