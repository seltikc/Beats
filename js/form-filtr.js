// const name = document.querySelector("#phone");
// const home = document.querySelector("#home")

// phone.addEventListener("keydown", function(event){

//   let isDigit = false;
//   let isDash = false;
//   let isControl = false;

//   if (event.key >= 0 || event.key <= 9) {
//     isDigit = true;
//   }

//   if (event.key == "ArrowLeft" || event.key == "ArrowRight" || event.key == "Backspace") {
//     isControl = true;
//   }
    

//   if(event.key == "-" || event.key == "+" || event.key == ")" || event.key == "(") {
//     isDash = true;
//   }

//   if (isDigit == false && isDash == false && isControl == false) {
//     event.preventDefault();
//   }   
// })

// home.addEventListener("keydown", function(event) {

//   let isDigit = false;
//   let isControl = false;

//   if (event.key >= 0 || event.key <= 9) {
//     isDigit = true;
//   }

//   if (event.key == "ArrowLeft" || event.key == "ArrowRight" || event.key == "Backspace") {
//     isControl = true;
//   }

//   if (!isDigit && !isControl) {
//     event.preventDefault();
//   }
// });

