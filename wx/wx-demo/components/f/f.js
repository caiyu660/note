// components/f/f.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
     index: {
        type: Number,
        value: 0
     }
  },
  created: function(){
      this.setData({
        index: 'hello'
      })
    console.log(`${this.data.index}  is created`)      
  },
  attached: function(){
    console.log(`${this.data.index}  is attached`)      
  },
  ready	: function(){
    console.log(`${this.data.index}  is ready`)      
  },
  moved: function(){
    console.log(`${this.data.index}  is moved`)
  },
  detached: function(){
    console.log(`${this.data.index}  is detached`)
  }, 
  sayHello: function() {

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

  }
})
