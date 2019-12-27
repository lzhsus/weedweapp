function orderStatus(arr){
    arr.map(element => {
        if(!element.status){
            //0未付款
            element.static_type="未付款";
            return;
        } 
        if(element.status==3){
            //1已付款 
            element.static_type="已付款";
            return;
        }
        if(element.status==7){
           //2已发货 
            element.static_type="已发货";
            return;
        }
        if(element.status==4){
            //3已签收 
            element.static_type="已签收";
            return;
        }
        if(element.status==5){
            //3已签收 
            element.static_type="已完成";
            return;
        }
        if(element.status==6){
           //4申请退款中 
            element.static_type="申请退款中";
            return;
        }
        if(element.status==8){
          //5已退款
            element.static_type="已退款";
            return;
        }
        if(element.status==-1){
            //5已退款
              element.static_type="已取消";
              return;
          }
    });
    return arr
}
export {
    orderStatus
}