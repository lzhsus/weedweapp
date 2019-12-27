import api,{login} from '../services/api/index'
import * as weapp from './weapp';
export default async function(e, cb){

    api.createPoster().then((res)=>{   
        if( res.success ){
            console.log(res.result.rqcode.imgurl)
            cb(userInfo)
        }else{
            wx.showModal({
                content: res.msg,
                showCancel: false
            })
        }
    });

}