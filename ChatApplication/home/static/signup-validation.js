const username = document.getElementById('id_username');
const email = document.getElementById('id_email');

username.addEventListener('blur',usernameValidation);

function usernameValidation(){
    let usernameInput = username.value;
    if(usernameInput){
        fetch(`/check_username/?username=${usernameInput}`)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Network response was not ok');
            }
        })
        .then(data => {
            if (data.exists) {

                alert('username already exists');
                username.value="";


            } 
        })
    }



}

email.addEventListener('blur',emailValidation);

function emailValidation(){
    let emailInput = email.value;
    if(emailInput){
        fetch(`/check_email/?email=${emailInput}`)
        .then(response=>{
            if(response.ok){
                return response.json();
            }else{
                throw new Error('Network response was not ok');
            }
        })
        .then(data=>{
            if(data.exists){
                alert('Email already Registered')
                email.value='';
            }
        })
    }
}