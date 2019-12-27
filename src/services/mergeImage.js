import appConfig from '../common/app_config'
let ctx = wx.createCanvasContext('myCanvas')
let errorNum = 0
let getImageInfo = (imgPath, resolve, reject)=>{
    // console.log(imgPath)
    wx.getImageInfo({
        src: imgPath,
        success: resolve,
        fail: ()=>{
            // 图片加载失败重试三次
            errorNum++
            if( errorNum>3 ) {
                reject()
                return
            }
            getImageInfo(imgPath, resolve, reject)
        }
    })
}
export default (headimgurl, cb)=>{
    errorNum = 0
    wx.showLoading({
        mask: true,
        title: '海报生成中…',
    }) 

    let imgArr = [
        file_oss+'weapp/static/generateposter/img-01.jpg',
        file_oss+'weapp/static/generateposter/img-02.jpg',
        file_oss+'weapp/static/generateposter/img-03.jpg',
        file_oss+'weapp/static/generateposter/img-04.jpg'
    ]
    let num = parseInt(Math.random()*4)

    let img1 = new Promise((resolve, reject)=> {
        getImageInfo(imgArr[num], resolve, reject)
    })

    let img2 = new Promise((resolve, reject)=> {
        getImageInfo(headimgurl, resolve, reject)
    })

    Promise.all([img1, img2]).then(function (res) {
        // 绘制背景图片
        ctx.drawImage(res[0].path, 0, 0, 600, 1067)

        ctx.arc(126, 950, 88, 0, 2 * Math.PI)
        ctx.setFillStyle('#fff')
        ctx.fill()

        // 绘制二维码
        ctx.save()
        ctx.beginPath()
        ctx.arc(126, 950, 88, 0, 2*Math.PI)
        ctx.clip()
        ctx.drawImage(res[1].path, 46, 870, 160, 160)    
        
        ctx.draw()

        setTimeout(()=>{
            wx.canvasToTempFilePath({
                canvasId: 'myCanvas',
                quality:0.9,
                fileType:"jpg",
                success: function(res) {
                    // console.log(res.tempFilePath)
                    cb(res.tempFilePath)
                    wx.hideLoading()
                } 
            })
        }, 500)
    }).catch((res)=>{
        cb(0)
    })





   
}