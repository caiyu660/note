Page({
  data: {
    name: "zhangsan",
    age: 10,
    list: [{ id: 1 }, { id: 2 }]
  },
  onLoad: function () {},
  onLaunch: function () {},
  onUnload: function () {},
  onShow: function () {},
  onHide: function () {},
  setName: function () {
    this.setData({
      name: 'newName'
    });
  }
});