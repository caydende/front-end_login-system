//inputs
var signupName = document.querySelector('#signupName')
var signupEmail = document.querySelector('#signupEmail')
var signupPass = document.querySelector('#signupPassword')
var signinEmail = document.querySelector('#signinEmail')
var signinPass = document.querySelector('#signinPassword')







var username = localStorage.getItem('logUsername')
if (username) {
    document.querySelector('#username').innerHTML = "Welcome " + username
}

var signUpArray = []
if (localStorage.getItem('users') == null) {
    signUpArray = []
} else {
    signUpArray = JSON.parse(localStorage.getItem('users'))
}


function isEmpty() {

    if (signupName.value == "" || signupEmail.value == "" || signupPass.value == "") {
        return false
    } else {
        return true
    }
}


function isEmptyLogin() {

    if (signinEmail.value == "" || signinPass.value == "") {
        return false
    } else {
        return true
    }
}


function isEmailExist() {
    for (var i = 0; i < signUpArray.length; i++) {
        if (signUpArray[i].email.toLowerCase() == signupEmail.value.toLowerCase()) {
            return false
        }
    }
}



function signUp(){
    if(isEmpty() == false){
        document.querySelector('#succes').innerHTML = '<span class="text-danger m-2">All inputs is required</span>'
        return false 
    }

    var signUp = {
        name: signupName.value,
        email: signupEmail.value,
        password: signupPass.value,
    }

    if(signUpArray.length === 0) {
        signUpArray.push(signUp)
        localStorage.setItem('users', JSON.stringify(signUpArray))
        document.querySelector('#succes').innerHTML = '<span class="text-success m-2">success</span>'
        return true
    }

    if(isEmailExist() == false){
        document.querySelector('#succes').innerHTML = '<span class="text-danger m-2">Email already exists</span>'

    }

    else{
        signUpArray.push(signUp)
        
        localStorage.setItem('users', JSON.stringify(signUpArray))
        document.querySelector('#succes').innerHTML = '<span class="text-success m-2">success</span>'
    }

}



function login(){

    if(isEmptyLogin() == false){
        document.querySelector('#incorrect').innerHTML = '<span class="text-danger m-2">All inputs is required</span>'
        return false 
    }

    var password = signinPass.value
    var email = signinEmail.value
    
    var found = false; 

    for (var i = 0; i < signUpArray.length; i++) {
        if (signUpArray[i].email.toLowerCase() === email.toLowerCase() && 
            signUpArray[i].password.toLowerCase() === password.toLowerCase()) {
            
            localStorage.setItem('logUsername', signUpArray[i].name);
            console.log('log in successful');
            found = true; 
            window.location.href = './home.html';
            break; // Exit the loop
        }
    }
    
    //no match was found
    if (!found) {
        console.log('login unsuccessful');
        document.getElementById('incorrect').innerHTML = 
            '<span class="p-2 text-danger">Incorrect email or password</span>';
    }


}


function logout() {
    localStorage.removeItem('logUsername')

}