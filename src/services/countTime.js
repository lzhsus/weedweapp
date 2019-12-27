import appConfig from '../common/app_config'
let countTimeNum = (leftTime, type)=>{
    let d = Math.floor(leftTime/1000/60/60/24);  
    let h = Math.floor(leftTime/1000/60/60%24);  
    let m = Math.floor(leftTime/1000/60%60);  
    let s = Math.floor(leftTime/1000%60);
    let ds = (d*24)+h
    if( (d+h+m+s)<=0 ) return 0
    if( type ){
        return (d<=0?'':d+'天')+(d+h<=0?'':h+':')+(d+h+m<=0?'':m+':')+(d+h+m+s<=0?'':s)
        //   return (d<=0?'':d+'天')+(d+h<=0?'':h+'小时')+(d+h+m<=0?'':m+'分')+(d+h+m+s<=0?'':s+'秒')
    }else{
        return (ds<=9?"0"+ds:ds)+':'+(m<=9?"0"+m:m)+':'+(s<=9?"0"+s:s)
    }
}

let countTime = (leftTime, type, cb)=>{     
    let t = leftTime
    let times = setInterval(()=>{
        if( !appConfig.count ) clearInterval(times)
        t = t-1000
        let lastNum = countTimeNum(t, type)
        if( lastNum<=0 ){
            clearInterval(times)            
            cb(0)
        }
        cb(lastNum)
    }, 1000)
}

export {
    countTimeNum,
    countTime
}