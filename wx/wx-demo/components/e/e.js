// console.dir(Hello);

// components/e/e.js
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
    updateB: function() {
        this.triggerEvent('updateB', 'updateB by E');
    },
    /**
     * 事件冒泡 默认为false 当置为true 则它的外围节点可以捕获该事件(不能穿透组件)
     * 若要穿透组件则需要将bubbles和composed 都置为true
     */
    updateA: function() {
        this.triggerEvent('updataA', 'updateA by E', {
            bubbles: true,
            composed: true
        })
    },
    setContent: function(data) {
        this.setData({
            content: data
        })
    }
  }
})
