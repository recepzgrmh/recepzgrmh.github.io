function writeDate(){
    let date = new Date();

    

    let hour = date.getHours(); 
    let minutes = date.getMinutes(); 
    let seconds = date.getSeconds(); 

    hour = hour < 10 ? hour = '0' + hour : hour;
    minutes = minutes < 10 ? minutes = '0' + minutes : minutes;
    seconds = seconds < 10 ? seconds = '0' + seconds : seconds;

    document.querySelector(".clock").textContent = hour + ':' + minutes + ':' + seconds;
}



setInterval(writeDate);