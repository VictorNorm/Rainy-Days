const email = document.getElementById("email");
const emailError = document.querySelector(".email-error")
const form = document.querySelector(".contact-form");

const button = document.querySelector("#contact-button");

const textarea = document.getElementById("textarea");


form.onsubmit = function (event) {
    event.preventDefault();
}


function emailTester(email) {
    const regEx = /\S+@\S+\.\S+/;
    const patternMatch = regEx.test(email);
    return patternMatch;
}

button.disabled = true;

function buttonEnabler() {

    if (emailTester(email.value) === true && textarea.value.trim().length >= 14) {
        button.disabled = false;
    } else {
        button.disabled = true;
    }
}


form.addEventListener("keyup", buttonEnabler);