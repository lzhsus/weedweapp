import wepy from 'wepy'
import appConfig from '../common/app_config'
import Api from '../services/api/index'
import * as common from '../common/common'

export default class globalMixin extends wepy.mixin {  
    onLoad(options) {
        console.log('globalMixin_options',options)
        appConfig.scene = options['scene']? decodeURIComponent(options.scene):'';
        if( appConfig.scene ) Api.scan({scene:appConfig.scene});
        wx.getClipboardData({
            success: (res)=>{
                if( res.data=="开启调试" ){
                    wx.setEnableDebug({
                        enableDebug: true
                    })
                    wx.setClipboardData({
                        data: 'data',
                    })
                }
                if( res.data=="清空缓存" ){
                    wx.clearStorageSync();
                    wx.setClipboardData({
                        data: 'data',
                    })
                    wx.showToast({
                        title: '清除成功',
                        icon: 'none',
                    })
                }                
            }
        })
    }
}
