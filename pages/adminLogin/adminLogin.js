// pages/adminLogin/adminLogin.js
let app = getApp();
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    ip: app.globalData.host,
    inputValue:''
  },
  /**
   * 处理登录
   */
  loginSubmit:function(e){
    let data = e.detail.value;
    let that = this;

    //简单做一下为空的判断
    if (data.username == "" || data.password == "") {
      wx.showModal({
        title: '提示',
        content: '账号或密码不可为空！',
      })
      return false;
    } else {
      wx.showLoading({
        title: '登录中..',
      })
      let header = {
        'content-type': 'application/x-www-form-urlencoded'
      }

      wx.login({
        success(res) {
          if (res.code) {
            wx.request({
              url: that.data.ip + '/jw/login',
              method: 'POST',
              header: header,
              data: {
                'userCode': data.username,
                'password': data.password,
                "js_code": res.code
              },
              success(res) {
                wx.hideLoading();
                if (res.data.status == 200) {
                  wx.setStorageSync("token", res.data.data);
                  that.redirectToNextPage(res.data.data);
                } else {
                  wx.showModal({
                    title: res.data.message,
                    showCancel: false
                  })
                }
              },
            })
          } else {
            wx.showModal({
              title: '提示',
              content: '登录错误！'
            })
          }
        }
      }) 
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let token = wx.getStorage({
      key: 'token',
      success: function (res) {
        if (res.data != []) {
          wx.redirectTo({
            url: '/pages/index/index',
          })
        } else {
          
        }
      },
    })
  },

  // 登录成功后根据用户信息去往下一个页面
  redirectToNextPage: function(token) {
    wx.reLaunch({
      url: '/pages/index/index',
    })
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