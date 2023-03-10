const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('useremail');
const userpwd = document.getElementById('userpwd');
const firstname = document.getElementById('firstname');
const lastname = document.getElementById('lastname');
const birthdate = document.getElementById('birthdate');

form.addEventListener('submit', e => {

    e.preventDefault();

    validateInputs();
});


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
};

const isValidEmail = email => {

    const re = /^(([^<>()[]\.,;:s@]+(.[^<>()[]\.,;:s@]+)*)|(.+))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

const validateInputs = () => {

    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const userpwdValue = userpwd.value.trim();
    const firstnameValue = firstname.value.trim();
    const lastnameValue = lastname.value.trim();
    const birthdateValue = birthdate.value.trim();

    if(usernameValue === ''){

        setError(username, 'Username is required');
    }
    else{

        setSuccess(username);
    }

    if(emailValue === ''){

        setError(email, 'Email is required');
    }
    else if(!isValidEmail(emailValue)){

        setError(email, 'Email is not in the good format');
    }
    else{

        setSuccess(email);
    }

    if(userpwdValue === ''){

        setError(userpwd, 'Password is required');
    }
    else if(userpwd.length < 8){

        setError(userpwd, 'Password too short');
    }
    else{

        setSuccess(userpwd);
    }

    if(firstnameValue === ''){

        setError(firstname, 'First Name is required');
    }
    else{

        setSuccess(firstname);
    }

    if(lastnameValue === ''){

        setError(lastname, 'Last Name is required');
    }
    else{

        setSuccess(lastname);
    }

    if(birthdateValue === ''){

        setError(birthdate, 'Birth Date is required');
    }
    else{

        setSuccess(birthdate);
    }
};

setInterval(validateInputs, 100);