// import appConfig from '../common/app_config'
// import imageScale from '../services/imageScale'
let errorNum = 0
let ctx
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

/**
 * 渲染圆形图片
 *
 * @param {Object} obj
 */
let drawImg = function (obj) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(obj.width / 2 + obj.x, obj.height / 2 + obj.y, obj.width / 2, 0, Math.PI * 2, false);
    ctx.clip();
    ctx.drawImage(obj.img, obj.x, obj.y, obj.width, obj.height); 
    ctx.restore();
}

/**
 * 渲染文字
 *
 * @param {Object} obj
 */
let drawText = function (obj) {
    ctx.save();
    ctx.setFillStyle(obj.color);
    ctx.setFontSize(obj.size);
    ctx.setTextAlign(obj.align);
    ctx.setTextBaseline(obj.baseline);
    ctx.fillText(obj.text, obj.x, obj.y);
    ctx.restore();
}

/**
 * 文本换行
 *
 * @param {Object} obj
 */
let textWrap = function (obj) {
    let tr = getTextLine(obj);
    for (let i = 0; i < tr.length; i++) {
        if (i < obj.line){
            let txt = {
                x: obj.x,
                y: obj.y + (i * obj.height),
                color: obj.color,
                size: obj.size,
                align: obj.align,
                baseline: obj.baseline,
                text: tr[i],
                bold: obj.bold
            };
            if (i == obj.line - 1) {
                txt.text = txt.text.substring(0, txt.text.length - 3) + '…';
            }
            drawText(txt);
        }
    }
}

/**
 * 获取文本折行
 * @param {Object} obj
 * @return {Array} arrTr
 */
let getTextLine = function(obj){
    ctx.setFontSize(obj.size);
    let arrText = obj.text.split('');
    let line = '';
    let arrTr = [];
    for (let i = 0; i < arrText.length; i++) {
        var testLine = line + arrText[i];
        var metrics = ctx.measureText(testLine);
        var width = metrics.width;
        if (width > obj.width && i > 0) {
            arrTr.push(line);
            line = arrText[i];
        } else {
            line = testLine;
        }
        if (i == arrText.length - 1) {
            arrTr.push(line);
        }
    }
    return arrTr;
}
// 绘制圆角矩形
let clipPhoto=function(x,y,w,h,r){
    ctx.save()
    ctx.fillStyle ='#ffffff'
    ctx.moveTo(x+r, y)
    ctx.arcTo(x+w, y,x+w,y+h,r)
    ctx.arcTo(x+w,y+h,x+w-r,y+h,r)
    ctx.arcTo(x+w-r,y+h,x,y+h,r)
    ctx.arcTo(x,y+h,x,y,r)
    ctx.arcTo(x,y,x+r,y,r)
    ctx.fill();
    ctx.clip()
}
export async function haibaoGet(data){
    errorNum = 0
    ctx = wx.createCanvasContext(data.id)
    console.log('-------',data)
    return new Promise((cbResolve, cbReject)=> {
        let imgArr = [];
        // data.headimgurl = data.headimgurl.replace('http://','https://')
        let img1 = new Promise((resolve, reject)=> {
            getImageInfo(data.imgurl, resolve, reject)
        })
        imgArr.push(img1)
        let img2 = new Promise((resolve, reject)=> {
            getImageInfo(data.headimgurl, resolve, reject)
        })
        imgArr.push(img2)
        let img3 = new Promise((resolve, reject)=> {
            getImageInfo(data.rqimg, resolve, reject)
        })
        imgArr.push(img3)
        Promise.all(imgArr).then(function (res) {
            var width = res[0].width
            var height = res[0].height
            // 背景图片
            ctx.drawImage(res[0].path, 0, 0, 653, 959)
            
            ctx.drawImage(res[2].path, 402 , 680 , 150 , 150)
            // 用户头像
            // 进行裁切

            ctx.setFillStyle("#000");
            ctx.setFontSize(26);

            ctx.fillText(data.nickname||"11111", 50, 860)
            // ctx.draw()
            var r=10,h=126,w=126,x=54,y=694;
            clipPhoto(50,690,134,134,r)
            ctx.drawImage(res[1].path, x , y , h , w)
            
            ctx.draw(false, ()=>{
                setTimeout(() => {
                    wx.canvasToTempFilePath({
                        canvasId: data.id,
                        quality: 1,
                        fileType:"png",
                        success:(res)=> {
                            cbResolve(res.tempFilePath)
                            wx.hideLoading()
                        } 
                    })
                }, 500);
            });            
        }).catch((res)=>{
            console.log('海报生成失败！',res)
            wx.showToast({
                title: '海报生成失败！',
                icon: 'none',
                duration: 2000
            })
            setTimeout(()=>{
                wx.navigateBack()
            },2000)
            cbReject(0)
        });
    });
}