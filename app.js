App({
  onLaunch() {
    const storage = wx.getStorageSync('highestScore')
    if (!storage) {
      wx.setStorageSync('highestScore', 0)
    }
  },
  globalData: {
    highestScore: 0
  }
})
