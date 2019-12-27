import appConfig from '../common/app_config'
import imageScale from '../services/imageScale'
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
export default (erwm, uploadImg, cb)=>{
    errorNum = 0
    wx.showLoading({
        mask: true,
        title: '海报生成中…',
    }) 

    let shareImg = file_oss+'weapp/static/campaign/share/share-img.png'

    let num = parseInt(Math.random()*4)

    let img1 = new Promise((resolve, reject)=> {
        getImageInfo(uploadImg, resolve, reject)
    })
    let img2 = new Promise((resolve, reject)=> {
        getImageInfo(shareImg, resolve, reject)
    })
    let img3 = new Promise((resolve, reject)=> {
        getImageInfo(erwm, resolve, reject)
    })

    Promise.all([img1, img2, img3]).then(function (res) {
        let imageSize = imageScale(res[0].width, res[0].height, 600)
        console.log(imageSize)

        // 绘制背景图片
        ctx.drawImage(res[0].path, 0, 0, imageSize.width, imageSize.height)
        ctx.drawImage(res[1].path, 0, 0, 600, 745)

        ctx.arc(480, 590, 88, 0, 2 * Math.PI)
        ctx.setFillStyle('#fff')
        ctx.fill()

        // 绘制二维码
        ctx.save()
        ctx.beginPath()
        ctx.arc(480, 590, 88, 0, 2*Math.PI)
        ctx.clip()
        ctx.drawImage(res[2].path, 400, 510, 160, 160)    
        
        ctx.draw()

        setTimeout(()=>{
            wx.canvasToTempFilePath({
                canvasId: 'myCanvas',
                quality: 1,
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