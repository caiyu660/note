import axios from 'axios';
import qs from 'qs';
import md5 from 'md5';
import cookie from 'cookie';

const APP_ID = 'v_aid';
const Cookie = cookie.parse(document.cookie);

const BASE_PARAMS = {
    '_aid': Cookie[APP_ID] || 501,
    '_vc': 400300,
    '_sm': 'md5' 
};

/**
 * 加密函数
 * @param params
 * @param userLogin
 */
export function encrypt(params, userLogin = true) {
    let mergedParams = Object.assign({}, BASE_PARAMS, params),
      paramStringList = [],
      keys = [];
    Object
      .keys(mergedParams)
      .forEach(key => {
        keys.push(key);
      });
    keys.sort();
    keys.forEach(key => {
      if (typeof mergedParams[key] !== 'undefined') {
        paramStringList.push('' + key + '=' + mergedParams[key]);
      }
    });
  
    if (userLogin) {
      let cookieResult = cookie.parse(document.cookie);
      if (cookieResult["_wtk"]) {
        //cookie中存在wtk值
        paramStringList.push(cookieResult["_wtk"]);
    //   } else if (LocalStorageService.containKey(STORAGE_WTK)) {
    //     //local storage中存在wtk值
    //     paramStringList.push(LocalStorageService.get(STORAGE_WTK));
    //   } else {
    //     console.error('缺失wtk,需重新登陆!');
    //     //没有WTK的情况是需要跳出登录的
    //     appLogin();
      }
    } else {
      paramStringList.push('jk.pingan.com');
    }
    mergedParams['_sig'] = md5(paramStringList.join(''));
    return mergedParams;
  }

  /**
 * Api网关请求接口
 * @param params
 * @param userLogin
 * @param options
 * @constructor
 */
export default function ApiService(params, userLogin = true, options = {}, externConfig = {}) {
    if (!params || typeof params !== 'object') {
      throw new Error('params is not an object.');
    }
    if (!params.hasOwnProperty('_mt') || !params['_mt']) {
      throw new Error('Miss "_mt"');
    }
    let encryptedParams = encrypt(params, userLogin);
    
    let config = Object.assign({}, {
      url: "//api.test.pajkdc.com/m.api",//Settings.API,
      method: 'get',
      withCredentials: true
    }, options);
    // if (externConfig.withLoading){
    //    IMEventBus.trigger('toast',{
    //       option: 'toastLoading'
    //    })
    // }
   //post情况下, 以form data模式传递数据
    if (config.method.toLowerCase() === 'post') {
      config.headers = Object.assign({}, (config.headers || {}), { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' });
      config.params = Object.assign({}, (config.params || {}), { _mt: encryptedParams._mt });
      delete encryptedParams._mt;
      config.data = qs.stringify(encryptedParams, { arrayFormat: 'brackets' })
    } else {
      config.params = encryptedParams;
    }
   
    return axios(config).then(res => {
    //   if (externConfig.withLoading){
    //     //关闭loading
    //     IMEventBus.trigger('toast',{
    //         option: 'hideToast'
    //     })
    //   }
      return res.data.content && res.data.content[0] ? res.data.content[0] : res.data
    });
  }