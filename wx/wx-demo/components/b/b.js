// components/b/b.js
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
    cData: '',
    dData: '',
    content: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    updateC: function() {
       this.setData({
         cData: 'update by B'
       })
    },
    updateBroC: function(e) {
        this.setData({
            cData: e.detail
          })
    },
    updateD: function() {
        this.setData({
            dData: 'update by B'
        })
    },
    updateE: function() {
       const cmpE = this.selectComponent('#cmp-e');
       cmpE.setContent('update by B');
    },
    update: function(e) {
       this.setData({
           content: e.detail
       })
    }
  }
})
