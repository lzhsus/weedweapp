import api from '../services/api/index'
import appConfig from '../common/app_config';
import moment from "moment"
export default async function(e){
    console.log('function')
    let userInfo = wx.getStorageSync(appConfig.envVersion+'user_info')
    let detail = e.detail
    let checkinfoTime = wx.getStorageSync(appConfig.envVersion+'checkinfoTime')||0
    if( moment(Date.now()).valueOf()>=checkinfoTime ){
        userInfo = null
        wx.removeStorageSync('user_info')
    };
    // 拒绝授权
    if( !detail.encryptedData ){
        wx.showModal({
            showCancel: false,
            content: '请允许获取用户信息！'
        })
        return
    };
    let res = await checkSession();
    let data = {
        encryptedData: decodeURIComponent(detail.encryptedData),
        iv: detail.iv,
        rawData: detail.rawData,
        signature: detail.signature
    };
    console.log('****',data)
    return new Promise((resolve, reject)=>{
        if( !userInfo ){
            userInfo = e.detail.userInfo;
            userInfo.headimgurl = userInfo.avatarUrl;
            
            data.session_key = wx.getStorageSync('userInfo').session_key;
            data.openid = wx.getStorageSync('userInfo').openid;
            api.userInfo(data).then((res)=>{ 
                if( res.success ){
                    userInfo.unionid=res.result.unionid
                    userInfo.headimgurl=res.result.headimgurl
                    userInfo.nickname=res.result.nickname
                    wx.setStorageSync('userInfo', userInfo)
                    wx.setStorageSync(appConfig.envVersion+'user_info', userInfo)
                    wx.setStorageSync(appConfig.envVersion+'checkinfoTime', moment(Date.now()).valueOf()+2*60*1000)
                    resolve(userInfo);
                }else if( res.msg ){
                    wx.showModal({
                        content: res.msg,
                        showCancel: false
                    });
                    reject(false);
                }
            })
        }else{
            resolve(userInfo);
        }
    })
}

function checkSession(){
    return new Promise(function(resolve, reject) {
        wx.checkSession({
            success: ()=>{
                resolve(0)    
            },
            fail: ()=>{
                api.wxlogin().then(()=>{
                    resolve(1);
                });
            }
        })
    })
}