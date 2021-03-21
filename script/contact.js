window.onload = function () {

    const email = document.getElementById("email");
    const emailError = document.querySelector(".email-error")
    const form = document.querySelector(".contact-form");

    const button = document.querySelector("#contact-button");

    const textarea = document.getElementById("textarea");
    const messageSuccess = document.querySelector(".messageSuccess")



    form.onsubmit = function (event) {
        event.preventDefault();
        messageSuccess.style.display = "block";
        setTimeout(function () {
            messageSuccess.style.display = "none"
        }, 4000);
        setTimeout(function () {
            email.value = ""
        }, 4000);
        setTimeout(function () {
            textarea.value = ""
        }, 4000);
        return false;
    }


    function emailTester(email) {
        const regEx = /\S+@\S+\.\S+/;
        const patternMatch = regEx.test(email);
        return patternMatch;
    }

    button.disabled = true;

    function buttonEnabler() {

        if (emailTester(email.value) === true && textarea.value.trim().length >= 15) {
            button.disabled = false;
        } else {
            button.disabled = true;
        }
    }


    form.addEventListener("keyup", buttonEnabler);


    // Cartloading ------------------------------------------------------- //


    const numberOfProductsInCart = document.querySelector(".numberOfProductsInCart");
    const myProducts = loadFromStorage('chosenProducts');

    function loadFromStorage(itemName) {
        const itemString = localStorage.getItem(itemName);
        let item = JSON.parse(itemString);
        return item
    }

    function numberOfProductschecker(array, number, object) {
        if (array.length !== number) {
            object.innerHTML = array.length;

        } else if (array.length === number) {
            object.innerHTML = number;
        }
    }



    numberOfProductschecker(myProducts, 0, numberOfProductsInCart);

}