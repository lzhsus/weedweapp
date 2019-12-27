import wepy from 'wepy'
import appConfig from '../common/app_config'
export default class globalMixinShare extends wepy.mixin {  
    methods = {    
        onShareAppMessage (res) {
            let obj = {};
            if( res.from==='button' ) {
                res.target.dataset.imageUrl = res.target.dataset.imageurl;
                obj = res.target.dataset;
                
            }else{
                obj = {
                    imageUrl: appConfig.shareImageurl||'https://qh.eintone.com/minitest/static/share.jpg',
                    path: appConfig.sharePath||'/pages/index',
                    title:appConfig.shareTitle||'加入我们',
                };
            }
            return obj
        }
    }
}
