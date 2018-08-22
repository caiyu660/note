// components/a/a.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
      content: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    updataA: function(e){
       this.setData({
           content: e.detail
       })
    }
  }
})
