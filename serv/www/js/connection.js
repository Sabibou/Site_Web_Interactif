const form = document.getElementById('form');
const username = document.getElementById('username');
const userpwd = document.getElementById('userpwd');
const response = document.getElementById("response");
const submit = document.getElementsByTagName("input")[2];
// input[2].addEventListener('click', submitForm, false);

submit.addEventListener("click", sendForm, false);

function sendForm(event) {
    event.preventDefault();
    const xhr = new XMLHttpRequest();
    const method = "POST";
    const url = "../htbin/login.py";
    
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