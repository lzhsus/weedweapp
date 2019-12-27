import Api from './api/index'
let uploadFile = async (file,dir='')=> {
    return new Promise(function (resolve, reject) { 
        Api.create_folder({
            dir: dir
        }).then((res)=>{
            console.log(res)
            if( res.success ){
                let ossKey = res     
                console.log(ossKey)       
                let promiseAll = []
                file.forEach((obj,index)=>{
                    promiseAll.push(wxUploadFile(file[index], ossKey))
                })
                Promise.all(promiseAll).then((fileURL)=> {
                    resolve(fileURL)
                }).catch(error=>{
                    wx.hideLoading()
                    resolve(false)
                })
            }else{
                wx.showModal({
                    content: res.msg,
                    showCancel: false
                })
                wx.hideLoading()
                resolve(false)
            }
        })  
    })
}

let wxUploadFile = (file, ossKey)=> {
    return new Promise(function (resolve, reject) {
        wx.uploadFile({
            url: "https://1434253600.xyz/api/upload/uploadfile", 
            filePath: file,
            name: 'imgUploader',
            formData: {
                OSSAccessKeyId: ossKey.accessid,
                dir:ossKey.dir,
                callback: ossKey.callback,
                policy: ossKey.policy,
                signature: ossKey.signature,
                key: ossKey.dir+file.replace('wxfile://', '').replace('http://tmp/', ''),
                success_action_status: '200',
                secure: true
            },
            success: (res)=> {
                res=JSON.parse(res.data)
                console.log(res)
                let url = res.data[0]           
                resolve(url)
            },
            fail: (error)=> {
                reject(false)
            }
        })
    })    
}

export {
    uploadFile
}