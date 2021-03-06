// pages/morepage.js

var PAGE=1;
Page({
  data: {
    mydata: [],
  },

  //立即预约
  onclick:function(res){
    var list = res.currentTarget.dataset;
    console.log(list.index);
        wx.navigateTo({
          url: '/pages/webview/webview?id=' + list.index,
        })

  },

  //查看详情
  onclickdetail:function(res){
    var lists = res.currentTarget.dataset;
    console.log(lists.name);
    wx.navigateTo({
      url: '/pages/detail/detail?name=' + lists.name,
    })
  },
 

 //初次加载页面
  onLoad:function(){
    var that = this
    wx.request({
      url: 'https://api.apiopen.top/getTangPoetry?count=20&page='+PAGE,
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res)

        that.setData({
          mydata: res.data.result
        })
      }
    })
  },


  /**
   * 下拉刷新
   */
  onPullDownRefresh: function () {
    var that = this;
    // 显示加载图标
    wx.showLoading({
      title: '玩命加载中',
    })

    // 页数+1
    PAGE = 1;
    console.log("当前页数：", PAGE)
    wx.request({
      url: 'https://api.apiopen.top/musicRankingsDetails?type=' + PAGE,
      method: "POST",
      // 请求头部
      header: {
        'content-type': 'application/text'
      },
      success: function (res) {
        console.log("返回数据：" + res)

        // 设置数据
        that.setData({
          mydata: res.data.result
        })

        // 隐藏加载框
        wx.stopPullDownRefresh()
        wx.showToast({
          title: '加载成功',
        })
      }
    })
  },

  //加载更多数据
  onReachBottom: function () {
    var that = this;
    // 显示加载图标
    wx.showLoading({
      title: '玩命加载中',
    })

    // 页数+1
    PAGE = PAGE + 1;
    console.log("当前页数：", PAGE)
    wx.request({
      url: 'https://api.apiopen.top/musicRankingsDetails?type=' + PAGE,
      method: "POST",
      // 请求头部
      header: {
        'content-type': 'application/text'
      },
      success: function (res) {
        console.log("返回数据：" + res)

        // 回调函数
        var moment_list = that.data.mydata;

        if (res.data.result != null) {
          for (var i = 0; i < res.data.result.length; i++) {
            moment_list.push(res.data.result[i]);
          }
        } else {
         
          wx.showToast({
            title: '没内容了',
          })
        }

        // 隐藏加载框
        wx.hideLoading();


        // 设置数据
        that.setData({
          mydata: moment_list
        })

      
      }
    })

  },


  
})