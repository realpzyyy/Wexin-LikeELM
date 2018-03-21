//index.js
//获取应用实例
const app = getApp()
// 引用百度地图微信小程序JSAPI模块 
var bmap = require('../../libs/bmap-wx.js')

Page({
  data: {
    imgUrls:[ 
      '../../images/banner/banner1.jpg',
      '../../images/banner/banner2.jpg',
      '../../images/banner/banner3.jpg',
      '../../images/banner/banner4.jpg'
    ],
    varietiesImage:[
      [
        { title: '种类一', url: '../../images/varieties/1.jpeg' },
        { title: '种类二', url: '../../images/varieties/2.jpeg' },
        { title: '种类三', url: '../../images/varieties/3.jpeg' },
        { title: '种类四', url: '../../images/varieties/4.jpeg' },
        { title: '种类五', url: '../../images/varieties/5.jpeg' },
        { title: '种类六', url: '../../images/varieties/6.jpeg' },
        { title: '种类七', url: '../../images/varieties/7.jpeg' },
        { title: '种类八', url: '../../images/varieties/8.jpeg' },
        { title: '种类九', url: '../../images/varieties/9.jpeg' },
        { title: '种类十', url: '../../images/varieties/10.jpeg' }
      ],
      [
        { title: '种类十一', url: '../../images/varieties/1.jpeg' },
        { title: '种类十二', url: '../../images/varieties/2.jpeg' },
        { title: '种类十三', url: '../../images/varieties/8.jpeg' },
        { title: '种类十四', url: '../../images/varieties/9.jpeg' },
        { title: '种类十五', url: '../../images/varieties/10.jpeg' }
      ]
    ],
    userInfo       : {},
    hasUserInfo    : false,
    canIUse        : wx.canIUse('button.open-type.getUserInfo'),
    latitude       :0,
    longitude      :0,
    loactionString :''
  },
  //事件处理函数
  bindViewTap: function(event) {
    wx.navigateTo({
      url: event.target.dataset.url
    })
  },
  
  onLoad: function () {

    var that = this;
    var BMap = new bmap.BMapWX({
      ak: 'TtDsogG1RRzboHL02oEdU33Xd8iXlLkB'
    });
    
    //请求百度地图api并返回模糊位置
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        that.setData({
           latitude : res.latitude  ,//经度
           longitude : res.longitude//纬度
        })
        BMap.regeocoding({
          location: that.data.latitude + ',' + that.data.longitude,
          success: function (res) { 
            that.setData({
              loactionString: res.originalData.result.formatted_address
            })
          },
          fail: function () {
            wx.showToast({
              title: '请检查位置服务是否开启',
            })
           },
        });
      },
      fail:function(){
        console.log('小程序得到坐标失败')
      }
    })

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
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
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
