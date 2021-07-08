const $forms = document.querySelectorAll(".signup-form");
console.log($forms);

const getTemplate = () =>{
    return fetch("./template.html")
    .then((response)=> response.text());
}
const sendEmailToApi = (address, template) => {
    fetch(`https://bedu-email-sender-api.herokuapp.com/send?id`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        address: address,
        template: template,
      }),
    })
      .then((results) => {
        console.log(results.status);
        if(results.status == 200){
          alert("E-mail send!!!")
        } else {
          alert("Send failed")
        }
        document.getElementById("email").value = ""
      })
      .catch((error) => {
        console.error(error);
        document.getElementById("email").value = ""
        alert("Send failed")
      });
  };

const sendEmail = (event)=>{
    event.preventDefault();
    const email = event.target.querySelector("input").value;
    console.log(email);
    getTemplate()
        .then((template)=>{
            sendEmailToApi(email,template)
            console.log(template);
        })
        .catch((error)=>{
            console.log(error, "error al obtener template");
        })
}

for(let i = 0;i < $forms.length; i++){
    console.log($forms[i]);
    $forms[i].addEventListener("submit", sendEmail);
}
