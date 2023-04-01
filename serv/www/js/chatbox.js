const form = document.getElementById('form');
const msg = document.getElementById('msg');
const submit = document.getElementById("send");
const chat = document.getElementById('chat');
// input[2].addEventListener('click', submitForm, false);

submit.addEventListener("click", sendForm, false);

function sendForm(event) {
    event.preventDefault();
    const xhr = new XMLHttpRequest();
    const method = "POST";
    const url = "../htbin/chatsend.py";
    
    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = () => {
      // In local files, status is 0 upon success in Mozilla Firefox
      if (xhr.readyState === XMLHttpRequest.DONE) {
        const status = xhr.status;
        if (status === 0 || (status >= 200 && status < 400)) {
          // The request has been completed successfully
          console.log(xhr.responseText);
          var p = document.createElement("p");
          p.innerHTML = xhr.responseText;
          chat.append(p); 
          if(xhr.responseText.indexOf("Bonjour") != -1){
            form.remove();
            //register.remove();
            //response.classList.add('success');
          }
          else{
            //response.classList.add('error');
          }
        } else {
          // Oh no! There has been an error with the request!
        }
      }
    };
    xhr.send("msg="+encodeURIComponent(msg.value)); 
}