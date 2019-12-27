
import Api from '../services/api/index'
import appConfig from '../common/app_config'
let objApi = {}
// 支付
objApi.requestPayment = (res)=>{
    return new Promise((resolve, reject)=> {
        console.log("requestPayment",res)        
        wx.requestPayment({
            timeStamp: String(res.payRes.timeStamp),
            nonceStr: res.payRes.nonceStr,
            package: res.payRes.package,
            signType: res.payRes.signType,
            paySign: res.payRes.paySign,
            success: ()=>{
                resolve(res)
            },
            fail: (res)=>{
                if( res.errMsg.indexOf("cancel")!=-1 ){
                    // 取消支付
                    // wx.showModal({
                    //     content: '取消支付!',
                    //     showCancel: false
                    // })
                }else{
                    // 支付失败
                    wx.showModal({
                        content: res.errMsg,
                        showCancel: false
                    })
                }
                // reject(res);
                wx.navigateTo({
                    url: 'mygroup'
                })
            }
        })
        
    })
}

// 获取支付秘钥
objApi.groupContinuepay = (item)=>{
    return new Promise((resolve, reject)=> {
        console.log("groupContinuepay",item)
        Api.groupContinuepay({
            orderCode: item.order_code
        }).then((res)=>{
            if( res.success ){
                res = res.result
                // resolve(res)
                objApi.requestPayment(res).then(resolve)
            }else{
                wx.showModal({
                    showCancel: false,
                    content: res.msg,
                    success:(res)=>{
                        wx.navigateTo({
                            url: 'mygroup'
                        })
                    }
                })
                // reject(res)
            }
        })
    })
    
}


// 加入团
objApi.groupTeamjoin = (data)=>{
    return new Promise((resolve, reject)=> {
        Api.groupTeamjoin(data).then((res)=>{
            if( res.success ){
                res = res.result
                objApi.requestPayment(res).then(resolve)
            }else{                    
              wx.showModal({
                content: res.msg,
                showCancel: false,
                success:(res)=>{
                    // wx.navigateTo({
                    //     url: 'mygroup'
                    // })
                }
              })
            }
        })
    })
}

// 创建团
objApi.groupCreateteam = (data)=>{
    return new Promise((resolve, reject)=> {
        Api.groupCreateteam(data).then((res)=>{
            if( res.success ){
                res = res.result
                objApi.requestPayment(res).then(resolve)
            }else{                    
                wx.showModal({
                    content: res.msg,
                    showCancel: false,
                    success:(res)=>{
                        // wx.navigateTo({
                        //     url: 'mygroup'
                        // })
                    }
                })
            }
        })
    })
}


export default objApi