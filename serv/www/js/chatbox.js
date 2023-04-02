const form = document.getElementById('form');
const msg = document.getElementById('msg');
const submit = document.getElementById("send");
const chat = document.getElementById('chat');
const errorMsg = document.getElementById('error-msg');
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
          let obj = JSON.parse(xhr.responseText);

          console.log(obj.msg);

          if(obj.num != 0){

            msg.classList.add('error');
            errorMsg.innerHTML = obj.msg;
          }
          else{

            getMsg(false);
          }
        } else {
          // Oh no! There has been an error with the request!
        }
      }
    };
    xhr.send("msg="+encodeURIComponent(msg.value)); 
}

function createMsg(obj){

  var bloc = document.createElement("div");

  var p = document.createElement("p");
  p.innerHTML = obj.msg;

  var date = document.createElement("p");
  date.innerHTML = obj.date + " " + obj.time;

  var user = document.createElement("p");
  user.innerHTML = obj.user; 

  bloc.append(user);
  bloc.append(p);
  bloc.append(date);

  chat.append(bloc);
}

function getMsg(all){

  const xhr = new XMLHttpRequest();
  const method = "GET";
  const url = "../htbin/chatget.py";
  
  xhr.responseType = "json";
  xhr.open(method, url, true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = () => {
    // In local files, status is 0 upon success in Mozilla Firefox
    if (xhr.readyState === XMLHttpRequest.DONE) {
      const status = xhr.status;
      if (status === 0 || (status >= 200 && status < 400)) {
        // The request has been completed successfully
        let data = xhr.response;
        
        if(all){

          data.forEach(element => createMsg(element));

          //console.log(obj.msg);
          console.log("connect");
        }
        else{

          createMsg(data[data.length - 1]);
        }

      } else {
        // Oh no! There has been an error with the request!
        console.log("problem");
      }
    }
  };
  xhr.send(); 
}

//setInterval(getForm, 100);

setTimeout(getMsg(true), 0);