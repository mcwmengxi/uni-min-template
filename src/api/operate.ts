export default {
  api: function () {
    const version = wx.getAccountInfoSync().miniProgram.version
    switch (version) {
      case 'develop': //开发预览版
        return 'https://www.baidu.com/'
      case 'trial': //体验版
        return 'https://www.baidu.com/'
      case 'release': //正式版
        return 'https://www.baidu.com/'
      default:
        return 'http://www.baidu.com/'
    }
  },
}
