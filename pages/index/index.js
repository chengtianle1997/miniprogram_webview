// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    // 这里修改phpStudy终端机的ip地址
    navigateUrl: 'http://192.168.0.116/'
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
    if (app.globalData.userInfo) {
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

    // 获取位置权限
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userLocation']) {
          wx.getLocation({
            type: 'gcj02',
            success: res => {
              console.log('获取位置成功111', res);
              this.setData({
                latitudes: res.latitude,
                longitudes: res.longitude
              });
              setTimeout(() => {
                this.getfances();
              }, 500);
              // setTimeout(() => {
              //   console.log('1111111')
              //   this.mctx.moveToLocation();
              // }, 3000);
            },
            fail: res => {
              console.log('获取位置失败111', res);
              this.setData({
                showmodel: true
              });
            }
          })
        } else {
          wx.authorize({
            scope: 'scope.userLocation',
            success: res => {
              console.log('3333', res);
              wx.getLocation({
                type: 'gcj02',
                success: res => {
                  console.log('获取位置成功222', res);
                  this.setData({
                    latitudes: res.latitude,
                    longitudes: res.longitude
                  });
                  setTimeout(() => {
                    this.mctx.moveToLocation();
                    this.getfances();
                  }, 500);
                },
                fail: res => {
                  console.log('获取位置失败222', res);
                  this.setData({
                    showmodel: true
                  });
                }
              })
            },
            fail: res => {
              console.log('用户拒绝同意小程序使用定位', res);
              this.setData({
                showmodel: true
              });
            }
          })
        }
      },
      fail: res => {
        wx.showToast({
          icon: 'none',
          title: '网络异常，请检查网络'
        })
      }
    })
  },
  getUserInfo(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  navigateTo(e){
    console.log("跳转到测试页面")
    wx.navigateTo({
      url: '/pages/mapnav/mapnav?mapNav=' + this.data.navigateUrl,
    })
  }

})
