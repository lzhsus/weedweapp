export default (orderStatus, groupStatus)=>{
    let text = ''

    if( orderStatus==10 ){
        // 未支付
        return "未支付"
    }
    if( orderStatus==30 ){
        // 已发货
        return "已发货"
    }
    switch(groupStatus){
        case "50":
            text = "正在开团"
            break
        case "51":
            text = "拼团中"
            break
        case "52":
            text = "拼团完成"
            break
        case "53":
            text = "拼团完成" //拼团完成并完成退款
            break
        case "54":
            text = "未支付关闭团"
            break
        case "55":
            text = "未支付过期关闭团"
            break
        case "57":
            text = "拼团失败,正在退款"
            break
        case "58":
            text = "订单关闭,完成退款"
            break
        case "59":
            text = "拼团过期，退款完成"
            break
        case "10":
            text = "未支付"
            break
        case "11":
            text = "已支付"
            break
        case "12":
            text = "未支付过期关闭订单"
            break
        case "13":
            text = "未支付主动关订单"
            break
        case "14":
            text = "申请退款中"
            break
        case "15":
            text = "已支付管理员申请退款"
            break
        case "19":
            text = "已支付，系统进行退款"
            break
        case "20":
            text = "已支付，退款完成"
            break
        case "21":
            text = "未支付，拼团关闭"
            break
        case "22":
            text = "正在处理退款中"
            break
        case "30":
            text = "已发货"
            break
        case "80":
            text = "尚未完成退款"
            break
        case "81":
            text = "退款成功"
            break
        case "87":
            text = "退款失败"
            break
        case "88":
            text = "退款错误"
            break
        default:
            text = "订单关闭"

    }
    return text
}