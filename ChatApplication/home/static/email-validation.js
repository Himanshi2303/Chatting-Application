
// 
const emailElement = document.getElementById('email');
const resendOtpElement = document.querySelector('.resend-otp');
let check=true;

// Event Listener for Email Validation
emailElement.addEventListener('blur', emailValidation);
function emailValidation() {
    const email = emailElement.value;
    if (email && check ) {
        console.log(email);
        check=false;

        fetch(`/check_email/?email=${email}`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Network response was not ok');
                }
            })
            .then(data => {
                if (!data.exists) {

                    alert('Invalid Email');
                    check=true;


                } else {
                    resendOtpElement.classList.toggle('hidden');
                    otpGeneration(email);

                }
            })
     } 
    //  else {
    //     alert("Invalid Input");
    // }
}

// Function to Activate otp Generation
function otpGeneration(email) {
    
    let data = { key: email }
    fetch(`/generate_otp/`, {
        method: 'POST',
        headers: { 
        'X-CSRFToken': getCookie('csrftoken'),
        'Content-Type': 'application/json', 
        
        },
        body: JSON.stringify(data)
    })
        .then(otp_response => {
            if (otp_response.ok) {
                return otp_response.json();
            } else {
                throw new Error('Network response was not ok');
            }

        })
        .then(otp_data => {
            if (!otp_data.otp_generated) {
                alert("Failed! OTP generation")
            } else {
                alert("Successfully, Generated OTP")
            }
        })

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

