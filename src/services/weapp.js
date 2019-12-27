function getUserInfo(){
    return new Promise(function(resolve, reject) {
        wx.login({
            success: function (data) {
                console.log(data)
                // wx.getUserInfo({
                //     success: function (res) {
                //         res['code']=data['code'];
                //         resolve(res);
                //     },
                //     fail:function(res){
                //         reject();
                //     },
                //     complete:function(res) {
                //         // console.log(res)
                //     }
                // });
            }
        });
    });
}
function openSetting(param) {
    return new Promise(function(resolve, reject) {
        wx.openSetting({
            success: (res) => {
                if(!res.authSetting[param]){
                    reject();
                }else{
                    resolve(res);
                }
                
            },
            fail:()=>{
                reject();
            }
        })
    });
}
function login(){
     return new Promise(function(resolve, reject) {
        wx.login({
            success: function (data) {
                let res={
                    code:data['code']
                };
                resolve(res);
            }
        });
    })
}

export {
    login
}