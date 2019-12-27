import appConfig from "../../common/app_config";
import request from "./request";
import * as weapp from '../weapp';
import apiRequest,{login} from "./apiRequest";
let globalApi={}; 
globalApi.wxlogin=function(data){
    let header = {
        'appid': appConfig.appid
    } 
    data.scene = appConfig.scene
    return request('api/post/wx/login', data, 'POST', true, header)
}

/**
 * 解密用户信息
 */
globalApi.userInfo=function(data){
    let header = {
        'appid': appConfig.appid
    }
    data.scene = appConfig.scene
    return request('api/post/wx/getUserInfo', data, 'POST', true, header)
}
// 微信登录
// globalApi.wxlogin = login

/**
 * 解密手机号码
 */
globalApi.loginPhonenumber=async function(data){
    let header = {
        'appid': appConfig.appid
    }
    data.scene = appConfig.scene;
    let res=await weapp.login();
    res=await globalApi.wxlogin(res);
    console.log(res.result.session_key)
    data.session_key= res.result.session_key;
    return request('http://127.0.0.1:3001/api/post/wx/loginPhonenumber', data, 'POST', true, header)
}
export {globalApi}