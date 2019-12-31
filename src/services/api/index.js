import appConfig from '../../common/app_config'
import apiRequest from "./apiRequest";
import { globalApi } from "./global";
// import app from 'wepy/app'; 

let api=globalApi;
 
api.allkind = function(data, isShowLoading=true){
    return apiRequest('api/allkind',data,"GET",isShowLoading);
}
// 更多的列表 
api.moreRight = function(data, isShowLoading=true){
    return apiRequest('api/more',data,"GET",isShowLoading);
} 

api.banner = function(data, isShowLoading=true){
    return apiRequest('api/banner',data,"GET",isShowLoading);
}
api.index = function(data, isShowLoading=true){
    return apiRequest('api/index',data,"GET",isShowLoading);
}
api.login= function(data, isShowLoading=true){
    return apiRequest("api/login",data,"GET",isShowLoading);
}
api.register= function(data, isShowLoading=true){
    return apiRequest("api/register",data,"POST",isShowLoading);
}
api.postJsonRegister= function(data, isShowLoading=true){
    return apiRequest("api/post-json/register",data,"POST",isShowLoading);
}
api.postRegister= function(data, isShowLoading=true){
    return apiRequest("api/post/register",data,"POST",isShowLoading);
}
api.getRegister= function(data, isShowLoading=true){
    return apiRequest("api/get/register",data,"POST",isShowLoading);
}
// 搜索数据
api.search=function(data, isShowLoading=true){
    return apiRequest("api/get/search",data,"GET",isShowLoading);
}
// 热销
api.hot=function(data, isShowLoading=false){
    return apiRequest("api/get/hot",data,"GET",isShowLoading);
}
// 地址库
/**
 * param(token)  通过token 添加地址
 * param(id)    通过id 删除
 */
api.addressList=function(data, isShowLoading=false){
    return apiRequest("api/address_list",data,"GET",isShowLoading);
}
/**
 * 修改用户信息
 */
api.changeUserinfo=function(data, isShowLoading=false){
    return apiRequest("api/change_userinfo",data,"GET",isShowLoading);
}
/**
 * 获取用户信息
 */
api.getCompleteUserinfo=function(data, isShowLoading=true){
    return apiRequest("api/get/complete/userinfo",data,"GET",isShowLoading);
}
/**
 * 获取商品列表
 */
api.getCompleteGoodsList=function(data, isShowLoading=true){
    return apiRequest("api/get/complete/goods_list",data,"GET",isShowLoading);
}
/**
 * 获取商品详情
 */
api.getCompleteGoodDetail=function(data, isShowLoading=true){
    return apiRequest("api/get/complete/good_detail",data,"GET",isShowLoading);
}
/**
 * 获取订单信息
 */
api.getCompleteOrder=function(data, isShowLoading=true){
    return apiRequest("api/get/complete/order",data,"GET",isShowLoading);
}
/***
 * 登录
 */
api.usreLogin=function(data, isShowLoading=true){
    return apiRequest("api/get/user/login",data,"GET",isShowLoading);
}

/**
 * 修改默认地址
 */
api.checked=function(data, isShowLoading=false){
    return apiRequest("api/checked",data,"GET",isShowLoading);
}
/**
 * 获取商品的信息信息
 * @param {*} data 
 * @param {*} isShowLoading 
 */
api.goodsDetailInfo=function(data, isShowLoading=false){
    return apiRequest("api/get/goods_detil_info",data,"GET",isShowLoading);
}
/**
 * 修改头像
 */
api.upLoadUploadhead=function(data, isShowLoading=false){
    return apiRequest("api/upLoadUploadhead",data,"GET",isShowLoading);
}
/**
 * 记录图片
 */
api.splendid=function(data, isShowLoading=false){
    return apiRequest("api/get/splendid",data,"GET",isShowLoading);
}

/**
 * 通过对应的商品id 录入商品详情
 */
api.good_id=function(data, isShowLoading=false){
    return apiRequest("api/get/good_id",data,"GET",isShowLoading);
}
/***
 * 检查并且创建文件夹
 */
api.create_folder=function(data, isShowLoading=false){
    return apiRequest("api/fs/create_folder",data,"GET",isShowLoading);
}
/**
 * 查询详细信息
 */
api.detail=function(data, isShowLoading=false){
    return apiRequest("api/get/detail",data,"GET",isShowLoading);
}

/**
 * 创建订单
 */
 api.create_order=function(data, isShowLoading=false){
    return apiRequest("api/get/create_order",data,"POST",isShowLoading);
}


/**
 * 获取订单列表
 */
api.order_list=function(data, isShowLoading=true){
    return apiRequest("api/get/order_list",data,"GET",isShowLoading);
}
/**
 * 获取未付款订单数量
 */
api.order_list_num=function(data, isShowLoading=false){
    return apiRequest("api/get/order_list_num",data,"GET",isShowLoading);
}
/**
 * 支付 取消 完成（评价） 申请退款
 */
api.order_list_status=function(data, isShowLoading=true){
    return apiRequest("api/get/order_list_status",data,"GET",isShowLoading);
}
/**
 * 测试
 */
api.all=function(data, isShowLoading=true){
    return apiRequest("api/get/all",data,"GET",isShowLoading);
}
/**
 * recordUnionid
 */
api.recordUnionid=function(data, isShowLoading=true){
    return apiRequest("api/get/recordUnionid",data,"GET",isShowLoading);
}
/**
 * 活动入口
 */
api.event=function(data, isShowLoading=true){
    return apiRequest("api/get/complete/events",data,"GET",isShowLoading);
}
/**
 * 获取支付签名
 */
api.orderPay=function(data, isShowLoading=true){
    return apiRequest("api/get/pay/orderPay",data,"GET",isShowLoading);
}
api.pay=function(data, isShowLoading=true){
    return apiRequest("api/get/pay/pay",data,"GET",isShowLoading);
}
/**
 * 2019-12-30
 */
api.text = function (data, isShowLoading=true){
    return apiRequest("api/text",data,"GET",isShowLoading);
}

export default api;


