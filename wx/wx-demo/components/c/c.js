// components/c/c.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
     content: {
         type: String,
         value: ''
     }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    updateB: function() {
        this.triggerEvent('updateB', 'updateB by C');
    }
  }
})