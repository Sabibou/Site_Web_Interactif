const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('useremail');
const userpwd = document.getElementById('userpwd');
const firstname = document.getElementById('firstname');
const lastname = document.getElementById('lastname');
const birthdate = document.getElementById('birthdate');
const submit = document.getElementById('go');



form.addEventListener('submit', e => {


    if(!validateInputs()){

        e.preventDefault();
    }
    else{
        e.preventDefault();
        const xhr = new XMLHttpRequest();
        const method = "POST";
        const url = "../htbin/register.py";
        
        xhr.open(method, url, true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = () => {
        // In local files, status is 0 upon success in Mozilla Firefox
        if (xhr.readyState === XMLHttpRequest.DONE) {
            const status = xhr.status;
            if (status === 0 || (status >= 200 && status < 400)) {
            // The request has been completed successfully
            console.log(xhr.responseText);
            response.innerHTML = "Vous êtes maintenant inscrit " + username.value;
            form.remove();
            } else {
            // Oh no! There has been an error with the request!
            }
        }
        };
        xhr.send("username="+encodeURIComponent(username.value) + "&useremail="+encodeURIComponent(email.value) + "&userpwd="+encodeURIComponent(userpwd.value) + "&firstname="+encodeURIComponent(firstname.value) + "&lastname="+encodeURIComponent(lastname.value) + "&birthdate="+encodeURIComponent(birthdate.value)); 
    }
});


function sendForm(event) {
    event.preventDefault();
    if(validateInputs){
        const xhr = new XMLHttpRequest();
        const method = "POST";
        const url = "../htbin/register.py";
        
        xhr.open(method, url, true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = () => {
        // In local files, status is 0 upon success in Mozilla Firefox
        if (xhr.readyState === XMLHttpRequest.DONE) {
            const status = xhr.status;
            if (status === 0 || (status >= 200 && status < 400)) {
            // The request has been completed successfully
            console.log(xhr.responseText);
            response.innerHTML = xhr.responseText;
            if(xhr.responseText.indexOf("Bonjour") != -1){
                form.remove();
                response.classList.add('success');
            }
            else{
                response.classList.add('error');
            }
            } else {
            // Oh no! There has been an error with the request!
            }
        }
        };
        xhr.send("username="+encodeURIComponent(username.value)+ "&userpwd=" + encodeURIComponent(userpwd.value)); 
    }
}


const setError = (element, message) => {

    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');

};

const setSuccess = element => {

    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');

    return false;
};

const isValidEmail = email => {

    const re = /^(([^<>()[]\.,;:s@]+(.[^<>()[]\.,;:s@]+)*)|(.+))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

const isValidPwd = pwd => {

    const re = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;
    return re.test(String(pwd));
}

const isValidDate = date => {

    const dateParts = date.split('/');
    const day = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]);
    const year = parseInt(dateParts[2]);

    var newDate = new Date(year, month-1, day);

    return (newDate.getFullYear() == year && newDate.getMonth() === month-1 && newDate.getDate() === day);
}

const validateInputs = () => {

    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const userpwdValue = userpwd.value.trim();
    const firstnameValue = firstname.value.trim();
    const lastnameValue = lastname.value.trim();
    const birthdateValue = birthdate.value.trim();

    let valid = true;

    if(usernameValue === ''){

        valid = setError(username, 'Username is required');
    }
    else if(usernameValue.length < 6){

        valid = setError(username, 'Username must be 6 characters long')
    }
    else{

        setSuccess(username);
    }

    if(emailValue === ''){

        valid = setError(email, 'Email is required');
    }
    else if(!isValidEmail(emailValue)){

        valid = setError(email, 'Email is not in the good format');
    }
    else{

        setSuccess(email);
    }

    if(userpwdValue === ''){

        valid = setError(userpwd, 'Password is required');
    }
    else if(!isValidPwd(userpwdValue)){

        valid = setError(userpwd, 'Password needs a capital letter, a number, a lowercase letter and to be 8 characters long');
    }
    else{

        setSuccess(userpwd);
    }

    if(firstnameValue === ''){

        valid = setError(firstname, 'First Name is required');
    }
    else{

        setSuccess(firstname);
    }

    if(lastnameValue === ''){

        valid = setError(lastname, 'Last Name is required');
    }
    else{

        setSuccess(lastname);
    }

    if(birthdateValue == '' ){

        setSuccess(birthdate);
    }
    else if(isValidDate(birthdateValue)){

        setSuccess(birthdate);
    }
    else{

        valid = setError(birthdate, 'Birth Date is required');
    }

    return valid;
};

setInterval(validateInputs, 100);