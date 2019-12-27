let objApi = {}
objApi.yuan = (price)=>{
    return (Number(price)/100).toFixed(2)
}
objApi.fen = (price)=>{
    return (Number(price)*100)
}
export default objApi