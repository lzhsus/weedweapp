import AppConfig from "../../common/app_config";
import wepy from 'wepy'
export default async function request(url, params={}, method="POST", isShowError=true,header={},dataType='json') {
    let data={
        url: url.indexOf('http')!=-1 ? url : AppConfig.serverPath + url,
        data: params,
        method: method,
        dataType: 'json',
        header:Object.assign({
            'content-type': 'application/json' 
        },header)
    }
    let res;
    try{
        res=await wepy.request(data);
    }catch(e){
        wx.showModal({
            title: '',
            content: '网络错误，请重试！',
            showCancel:false,
        })
        wx.hideLoading()
    }
    res=res.data;
    
    // if(!res.success&&isShowError&&res.errcode!=9001){
    //     wx.showModal({
    //         title: '',
    //         content: res.msg,
    //         showCancel:false,
    //     })
    // }
    return res;
}
