const myForm = document.querySelector("#myForm");
const sendButton = document.querySelector("#sendButton");

sendButton.addEventListener("click", function(event) {
  event.preventDefault();

  if (validateForm(myForm)) {
    const data = {
      names: myForm.elements.names.value,
      phone: myForm.elements.phone.value,
      street: myForm.elements.street.value,
      home: myForm.elements.home.value,
      frame: myForm.elements.frame.value,
      apartment: myForm.elements.apartment.value,
      floor: myForm.elements.floor.value,
    };
    
    const xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.open("POST", "https://webdev-api.loftschool.com/sendmail");
    xhr.send(JSON.stringify(data));
    xhr.addEventListener("load", () => { //Я  так понимаю от сюда можно вызвать мод. окно. Как мне это сделать если есть уже файл на Jqwery
      if (xhr.response.status) {
        console.log("Все ок");
      }
    })
  }
});

function validateForm(form) {

  let valid = true;

  if (!validateField(form.elements.names)) {
    valid = false;
  }

  if (!validateField(form.elements.phone)) {
    valid = false;
  }

  if (!validateField(form.elements.street)) {
    valid = false;
  }

  if (!validateField(form.elements.home)) {
    valid = false;
  }

  if (!validateField(form.elements.frame)) {
    valid = false;
  }

  if (!validateField(form.elements.apartment)) {
    valid = false;
  }

  if (!validateField(form.elements.floor)) {
    valid = false;
  }

  return valid;
}

function validateField(field) {

  if (!field.checkValidity()) {
    field.nextElementSibling.textContent = field.validationMessage;

    return false;

  }else {
    field.nextElementSibling.textContent = "";
    return true;
  }
};

const name = document.querySelector("#phone");
const home = document.querySelector("#home")

phone.addEventListener("keydown", function(event){

  let isDigit = false;
  let isDash = false;
  let isControl = false;

  if (event.key >= 0 || event.key <= 9) {
    isDigit = true;
  }

  if (event.key == "ArrowLeft" || event.key == "ArrowRight" || event.key == "Backspace") {
    isControl = true;
  }
    

  if(event.key == "-" || event.key == "+" || event.key == ")" || event.key == "(") {
    isDash = true;
  }

  if (isDigit == false && isDash == false && isControl == false) {
    event.preventDefault();
  }   
})

home.addEventListener("keydown", function(event) {

  let isDigit = false;
  let isControl = false;

  if (event.key >= 0 || event.key <= 9) {
    isDigit = true;
  }

  if (event.key == "ArrowLeft" || event.key == "ArrowRight" || event.key == "Backspace") {
    isControl = true;
  }

  if (!isDigit && !isControl) {
    event.preventDefault();
  }
});