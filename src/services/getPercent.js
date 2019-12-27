export default (num, total)=>{
    num = parseFloat(num); 
    total = parseFloat(total); 
    if (isNaN(num) || isNaN(total)) { 
    return "-"; 
    } 
    return total <= 0 ? "0%" : (Math.round(num / total * 10000) / 100.00 + "%");    
}