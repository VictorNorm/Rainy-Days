window.onload = function () {


    const myProducts = loadFromStorage('chosenProducts');
    const yourProductsContainer = document.querySelector(".checkout-container-box-3-table")
    const checkoutTotalPriceContainer = document.getElementById("checkoutH3")

    function saveToStorage(itemName, item) {
        let itemString = JSON.stringify(item);
        localStorage.setItem(itemName, itemString);
    }

    //gör det enklare att ladda variablar ifrån localstorage
    function loadFromStorage(itemName) {
        const itemString = localStorage.getItem(itemName);
        let item = JSON.parse(itemString);
        return item
    }

    loadFromStorage(myProducts);

    for (let i = 0; i < myProducts.length; i++) {
        // console.log(myProducts[i]);
        yourProductsContainer.innerHTML +=
                                            `
                                                <tr>
                                                    <div class="cart-product-info">
                                                        <img src="${myProducts[i].images[0]}" class="cart-product-pictures">
                                                        <div>
                                                            <h3>${myProducts[i].name}</h3>
                                                            <p>Quantity: ${myProducts[i].quantity}</p>
                                                            <p>Size: ${myProducts[i].size}</p>
                                                            <p class="productPrices">${myProducts[i].price}€</p>
                                                            <p>${myProducts[i].gender}</p>
                                                        </div>
                                                    </div>
                                                </tr>
                                            `
    }

    var addedPrices = [0];

    for (let i = 0; i < myProducts.length; i++) {
        // console.log(myProducts[i]);
        var totalPrices = myProducts[i].price * myProducts[i].quantity;
        addedPrices.push(totalPrices);
    }

    let addedPricesReduced = addedPrices.reduce(priceAdder);
    console.log(addedPricesReduced);
    let deliveryCost = 0;
    if (addedPricesReduced > 0 && addedPricesReduced < 180) {
        deliveryCost = 35;
    }

    let addedPricesReducedAndDeliveryCost = addedPricesReduced + deliveryCost;

    checkoutTotalPriceContainer.innerHTML = `Total price:<p id="checkoutH3P">${addedPricesReducedAndDeliveryCost}.00€</p>`;

    function priceAdder(total, num) {
        return total + num;
    }

    const numberOfProductsInCart = document.querySelector(".numberOfProductsInCart");

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

    const fullNameError = document.querySelector(".fullNameError");
    const emailError = document.querySelector(".emailError");
    const adressError = document.querySelector(".adressError");
    const cityError = document.querySelector(".cityError");
    const postalCodeError = document.querySelector(".postalCodeError");

    const fullNameInput = document.querySelector(".fullNameInput");
    const emailInput = document.querySelector(".emailInput");
    const adressInput = document.querySelector(".adressInput");
    const cityInput = document.querySelector(".cityInput");
    const postalCodeInput = document.querySelector(".postalCodeInput");

    const cardNameInput = document.querySelector(".cardNameInput");
    const cardNumberInput = document.querySelector(".cardNumberInput");
    const expirationDateInput = document.querySelector(".expirationDateInput");
    const cvvInput = document.querySelector(".cvvInput");

    const cardNameError = document.querySelector(".cardNameError");
    const cardNumberError = document.querySelector(".cardNumberError");
    const expirationDateError = document.querySelector(".expirationDateError");
    const cvvError = document.querySelector(".cvvError");

    const purchaseSuccessful = document.querySelector(".purchaseSuccessful")

    const checkoutConfirmButton = document.querySelector("#checkoutConfirmButton");

    function formValidation() {
        event.preventDefault();

        if (lengthChecker(fullNameInput.value, 5) === true) {
            fullNameError.style.display = "none";
        } else {
            fullNameError.style.display = "block";
        };

        if (emailTester(emailInput.value) === true) {
            emailError.style.display = "none";
        } else {
            emailError.style.display = "block";
        }

        if (lengthChecker(adressInput.value, 6) === true) {
            adressError.style.display = "none";
        } else {
            adressError.style.display = "block";
        }

        if (lengthChecker(cityInput.value, 2) === true) {
            cityError.style.display = "none";
        } else {
            cityError.style.display = "block";
        }

        if (lengthChecker(postalCodeInput.value, 4) === true) {
            postalCodeError.style.display = "none";
        } else {
            postalCodeError.style.display = "block";
        }

        if (lengthChecker(cardNameInput.value, 5) === true) {
            cardNameError.style.display = "none";
        } else {
            cardNameError.style.display = "block";
        }

        if (cardNumberInput.value.length === 16) {
            cardNumberError.style.display = "none";
        } else {
            cardNumberError.style.display = "block";
        }

        if (lengthChecker(expirationDateInput.value, 5) === true) {
            expirationDateError.style.display = "none";
        } else {
            expirationDateError.style.display = "block";
        }

        if (cvvInput.value.length === 3) {
            cvvError.style.display = "none";
        } else {
            cvvError.style.display = "block";
        }

        if (lengthChecker(fullNameInput.value, 5) === true &&
            emailTester(emailInput.value) === true &&
            lengthChecker(adressInput.value, 6) === true &&
            lengthChecker(cityInput.value, 2) === true &&
            lengthChecker(postalCodeInput.value, 4) === true &&
            lengthChecker(cardNameInput.value, 5) === true &&
            (cardNumberInput.value.length === 16) &&
            lengthChecker(expirationDateInput.value, 5) === true &&
            cvvInput.value.length === 3) {
            purchaseSuccessful.style.display = "block";
            localStorage.setItem('chosenProducts', "[]");

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

            const numberOfProductsInCart = document.querySelector(".numberOfProductsInCart");
            const myProducts = loadFromStorage('chosenProducts');

            numberOfProductschecker(myProducts, 0, numberOfProductsInCart);
            checkoutHTMLRefresher();

        } else {
            purchaseSuccessful.style.display = "none";
        }

    }

    function lengthChecker(text, len) {
        if (text.trim().length >= len) {
            return true;
        } else {
            return false;
        }
    }

    function emailTester(email) {
        const regEx = /\S+@\S+\.\S+/;
        const patternMatch = regEx.test(email);
        return patternMatch;
    }

    checkoutConfirmButton.addEventListener("click", formValidation);

    function checkoutHTMLRefresher() {
        yourProductsContainer.innerHTML = "";
        checkoutTotalPriceContainer.innerHTML = "";
    }

};