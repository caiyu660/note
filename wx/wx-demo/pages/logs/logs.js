//logs.js
const util = require('../../utils/util.js')
import WxPage from '../../commons/Page'

const pageName = 'log';

class Log extends WxPage {
    static data = {
        time: '123456'
    }
    sayHello = () => {
        
    }
    onLoad(options){
        console.log(`${pageName} onLoad ----->`);
        this.setData({
            logs: (wx.getStorageSync('logs') || []).map(log => {
                return util.formatTime(new Date(log))
            })
        })
    }
    onShow() {
        console.log(`${pageName} onShow ----->`);
    }
    onReady() {
        console.log(`${pageName} onReady ----->`);
    }
    onHide() {
        console.log(`${pageName} onHide ----->`);
    }
    onUnload() {
        console.log(`${pageName} onUnload ----->`);
    }
    logData() {
        console.log('log data');
    }
    logName() {
        this.setData({
            name: 10
        })
        console.log('name');
    }
}
new Log();