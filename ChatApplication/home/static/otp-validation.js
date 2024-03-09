const otpElement = document.getElementById('otp');
console.log(otpElement);


otpElement.addEventListener('blur',validateOTP);

function validateOTP(){
    otpValue=otpElement.value;

    if(otpValue){
        const otp = { key : otpValue};
    fetch(`/check_otp/`,{
        method:'POST',
        headers: { 
            'X-CSRFToken': getCookie('csrftoken'),
            'Content-Type': 'application/json',  },
        body:JSON.stringify(otp)
    })
    .then(response=>{
        if(response.ok){
            return response.json();
        }
        else{
            throw new Error('Network response was not ok');
        }
    })
    .then(data=>{
        if(!data.matched){
            alert("OTP Incorrect");
            otpElement.value='';
        }
    })
    }

}
// Function for to get csrf token through cookie
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
