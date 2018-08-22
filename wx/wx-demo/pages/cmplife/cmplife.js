//index.js
//获取应用实例
const app = getApp()
Page({
    data: {
        list: [{id: 0}, {id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}, {id: 6}]
    },
    reverse: function() {
        this.setData({
            list: [{id: 10}, {id: 9}].concat(this.data.list.reverse())
        })
    }
})

