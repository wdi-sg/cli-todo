module.exports.getDate = function(){
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth()+1;
    let year = date.getFullYear();
    let result = day+"-"+month+"-"+year;
    return result;
}
