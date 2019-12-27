import appConfig from "../../common/app_config";
import request from "./request";
import * as weapp from '../weapp';
import {globalApi} from "./global";
import * as common from '../../common/common';

var loginPromis;
export default async function apiRequest(url, params={}, method="POST", isShowLoading=true, isShowError=true){
    if(isShowLoading) {
        wx.showLoading({
            title:'加载中',
            mask:true
        });
    }
    let res;
    let userInfo=wx.getStorageSync('userInfo');
    
    if(!userInfo){
        if(!loginPromis){     
            loginPromis=login(url, params, method, isShowError);
        }
        userInfo=await loginPromis;
    }
    
    let header={
        // 'authorization':'Bearer '+userInfo.token,
        'appid':appConfig.appid
    }
    // console.log('userInfo',userInfo)
    // let urlParams = common.getParams(url)||{};
    // urlParams.token = userInfo.token;
    // urlParams.appid = appConfig.appid;
    // url = url.split("?");
    // url = url[0]+'?'+common.parseParams(urlParams);
    // console.log('url',url)
    params.token=userInfo.token||''
    params.appid=appConfig.appid
    loginPromis=null
    appConfig.appUserinfo = userInfo

    res=await request(url, params, method, isShowError,header);
    if(res.errcode==9001||res.errcode==41002||res.errcode==41001||res.errcode==41008){
        wx.removeStorageSync(appConfig.envVersion+'userInfo');
        res=await apiRequest(url, params, method, isShowLoading, isShowError);
    } 

    if( res.errcode==41009||res.errcode==41100 ){
        wx.removeStorageSync(appConfig.envVersion+'user_info');
        wx.hideLoading()
        return {}
    }

    if(isShowLoading){
        wx.hideLoading();
    }
    if( typeof res!=='object' ){
        return {
            msg: '网络错误！'
        }
    }
    return res;
}

export async function login(url, params, method, isShowError){
    let res=await weapp.login();
    appConfig.weappLogin=res
    // return;
    res=await globalApi.wxlogin(res);
    try {
        wx.setStorageSync('userInfo', res.result);
    } catch (e) {    

    }
    // res=await apiRequest(url, params, method, isShowError);
    return res.result;
}