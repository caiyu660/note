// 获取函数的参数名列表
const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg,
    ARGUMENT_NAMES = /([^\s,]+)/g;
const getFuncParamNames = (func) => {
    var fnStr = func.toString().replace(STRIP_COMMENTS, '');
    var result = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
    if (result === null)
        result = [];
    return result;
}
/**
 * 获取函数体
 * @param {} func 
 */
const getFuncBody = (func) => {
    const entry = func.toString();
    return entry.slice(entry.indexOf("{") + 1, entry.lastIndexOf("}"));
}
/**
 * 小程序页面基础类
 */
export default class WxPage {
    constructor() {
        // init page inner data
        const pageData = Object.create(null);
        // 实例方法
        const instance = this.__proto__;
        const instanceMethods = Object.getOwnPropertyNames(instance).filter(mth => (mth !== 'constructor'));
        // 页面基础方法
        const wxPage = this.__proto__.__proto__;
        const wxPageMethods = Object.getOwnPropertyNames(wxPage).filter(mth => (mth !== 'constructor'));
        instanceMethods.forEach(mth => {
            pageData[mth] = instance[mth];
        });
        
        wxPageMethods.forEach(mth => {
            if (!pageData[mth]) {
                pageData[mth] = wxPage[mth];
            }
        });
        // 设置page内部数据data
        if (this.__proto__.constructor.data) {
            pageData['data'] = this.__proto__.constructor.data;
        }
        let func, funcParams, funcBody;
        console.log(pageData)
        // 获取页面私有属性和成员方法
        for (let item in this) {
            console.log(111)
            funcParams = getFuncParamNames(this[item]);
            funcBody = getFuncBody(this[item]).replace(/_this/g, 'this');
            console.log('param--->', getFuncParamNames(this[item]));
            func = new Function(...funcParams, funcBody)
            console.log(typeof func);
            Object.defineProperty(func, "name", {
                value: item
            })
            pageData[item] = func;
        }
        Page(pageData);
    }
    init() {}
    onLoad(options) {
        // Do some initialize when page load.
    }
    onReady() {
        // Do something when page ready.
    }
    onShow() {
        // Do something when page show.
    }
    onHide() {
        // Do something when page hide.
    }
    onUnload() {
        // Do something when page close.
    }
    onPullDownRefresh() {
        // Do something when pull down.
    }
    onReachBottom() {
        // Do something when page reach bottom.
    }
    onShareAppMessage() {
        // return custom share data when user share.
    }
}