const myForm = document.querySelector("#myForm");
const sendButton = document.querySelector("#sendButton");
const modalText = document.querySelector(".modal__message")
const modslCloseBtn = document.querySelector(".app-submit-btn")

modslCloseBtn.addEventListener("click", e => {
  e.preventDefault();
  $.fancybox.close();
  document.body.classList.remove("locked");
})

sendButton.addEventListener("click", function(event) {
  event.preventDefault();

  if (validateForm(myForm)) {
    const formData = new FormData();
    formData.append("name", myForm.elements.name.value);
    formData.append("phone", myForm.elements.phone.value);
    formData.append("street", myForm.elements.street.value);
    formData.append("home", myForm.elements.home.value);
    formData.append("frame", myForm.elements.frame.value);
    formData.append("apartment", myForm.elements.apartment.value);
    formData.append("floor", myForm.elements.floor.value);
    formData.append("comment", "текст комментария");
    formData.append("to", "example@mail.ru");

    const xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.open("POST", "https://webdev-api.loftschool.com/sendmail");
    xhr.setRequestHeader("X-Requested-Width", "XMLHttpRequest");
    xhr.send(formData)
    xhr.addEventListener("load", () => { 

        document.body.classList.add("locked");

      if (xhr.response.status) {
        modalText.innerHTML = xhr.response.message;
      }else {
        modalText.innerHTML = "Произошла ошибка";
      }
      $.fancybox.open({
        src: ".modal-form",
        type: "inline",

      });
    })
  }
});

function validateForm(form) {

  let valid = true;

  if (!validateField(form.elements.name)) {
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