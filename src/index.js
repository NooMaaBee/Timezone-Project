//Los Angeles
let losAngelesElement = document.querySelector("#los-angeles");
let losAngelesDateElement = document.querySelector(".date");
let losAngelesTimeElement = document.querySelector(".time");

losAngelesDateElement.innerHTML = moment().fomat("MMMM Do YYYY");
losAngelesTimeElement.innerHTML = "1:48:15 <small>AM<small>";
