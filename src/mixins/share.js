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
                    path: appConfig.sharePath||'/pages/index?scene='+appConfig.opt_scene||'',
                    title:appConfig.shareTitle||'宝宝的学习能力怎么样？测一测，家长一目了然！',
                };
            }
            return obj
        }
    }
}
