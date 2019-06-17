//获取小程序实例
var app = getApp();

Page({
  data: {
    //用户登录获取的code
    code: '',
    //保存用户信息
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //options(Object)
  onLoad: function () {
    // 页面加载，检查用户的登录状态
    this.checkSession();
  },
  checkSession: function () {
    wx.checkSession({
      success: (result) => {
        //用户仍在登录
        console.log('用户在登录状态但信息为空');
        // 如果检查的用户信息登录null
        if (app.globalData.userInfo == null) {
          //调用登录函数
          this.onLogin();
        } else if (app.globalData.userInfo != null) {
          this.setData({
            userInfo: app.globalData.userInfo,
            hasUserInfo: true
          })
        } else if (this.data.canIUse) {
          // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
          // 所以此处加入 callback 以防止这种情况
          app.userInfoReadyCallback = res => {
            this.setData({
              userInfo: res.userInfo,
              hasUserInfo: true
            })
          }
        } else {
          // 在没有 open-type=getUserInfo 版本的兼容处理
          wx.getUserInfo({
            success: res => {
              app.globalData.userInfo = res.userInfo
              this.setData({
                userInfo: res.userInfo,
                hasUserInfo: true
              })
            }
          })
        }
      },
      fail: () => {
        // 用户登录状态不在
        console.log('用户未在登录状态');
        this.onLogin();
      }
    });
  },
  //调用登录
  onLogin: function () {
    var that = this;
    wx.login({
      success: function (res) {
        //如果获取到code
        if (res.code) {
          //把code存储起来
          that.setData({
            code: res.code
          })
          // 测试用，获取到code之后，输出code，并获取用户信息函数
          console.log(that.data.code)
          that.getUsersInfo();
        }
      },
      fail: function (res) {
        console.log('这是登录函数的错误信息' + res)
      }
    })
  },
  //获取用户信息函数
  getUsersInfo: function () {
    var that = this;
    wx.getUserInfo({
      // withCredentials: true,
      lang: 'zh_CN',
      timeout: 10000,
      success: (result) => {
        // 把获取到的用户信息函数进行存储
        that.setData({
          userInfo: result.userInfo,
          hasUserInfo: true
        });
        console.log(that.data.userInfo)
        // 提示用户授权成功
        wx.showToast({
          title: '授权成功',
          duration: 1500,
          mask: true
        });

      },
      fail: (result) => {
        console.log('通过APP实例获取用户信息失败' + result);
      }
    }); 
  },
  //点击按钮发起请求，并进入首页
  bindViewTap: function () {
    wx.request({
      url: 'https://www.barteam.cn/ApiRoot/LoginAuthor/loginAndAuth',
      data: {
        "nickName": this.data.userInfo.nickName, 
        "gender": this.data.userInfo.gender,
        "provice": this.data.userInfo.province,
        "city": this.data.userInfo.city,
        "headImg": this.data.userInfo.avatarUrl,
        "sign": null,//暂定，可能获取不到用户的个性签名
        "weiXinCode": this.data.code
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: (result) => {
        //清除sessionId，否则res.header['Set-Cookie']会报错
        wx.removeStorageSync('sessionid');
        wx.setStorageSync("sessionid", result.header["Set-Cookie"]);
        var res = result.data;
        console.log(res)
        if (res.status == 'ok') {
          // 本地存储获取到的guid
          var guid = res.guid;
          console.log(guid);
          wx.setStorage({
            key: 'Guid',
            data: guid,
            success(res) {
              // 本地存储成功
              console.log('信息存储成功' + JSON.stringify(res));
              wx.switchTab({
                url: '../index/index'
              });
            }
          });
        } else if (res.status == 'fail') {
          //输出错误信息
          if (res.mess != null) {
            console.log(res.mess);
          } else {
            console.log('返回信息错误');
          }
        }
      },
      fail: (res) => {
        if (res.data.status == 'fail') {
          var message = res.data.mess;
          wx.showToast({
            title: message,
            duration: 1500,
            mask: true
          });
        } else {
          console.log("未知错误，请求数据失败");
        }
      }
    });
  },
  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {

  },
  onUnload: function () {

  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  },
  onPageScroll: function () {

  },
  //item(index,pagePath,text)
  onTabItemTap: function (item) {

  }
});