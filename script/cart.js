window.onload = function load(event) {

    loadProductsInToView();
}


function loadProductsInToView() {

    const table = document.getElementById("cartTable");
    table.innerHTML = ""; //ta bort alla produkter som redan ligger i carten för de kommer läsas in igen på nytt.

    const totalPriceTable = document.querySelector(".totalPriceTable");
    const freeDeliveryContainer = document.querySelector(".total-price");
    const freeDelivery = document.querySelector(".freeDelivery");

    const totalProductPrice = document.querySelector(".totalProductPrice");

    const addToCart = document.querySelector(".cta-1");


    const numberOfProductsInCart = document.querySelector(".numberOfProductsInCart");

    const myProducts = loadFromStorage('chosenProducts'); //ladda alla produkter ifrån localstorage

    //  console.log(myProducts);

   
    numberOfProductschecker(myProducts, 0, numberOfProductsInCart);
    totalPriceChecker(myProducts);

    for (let i = 0; i < myProducts.length; i++) {
        const productObject = myProducts[i];

        console.log(productObject);

        let totalProductPrice = productObject.price * productObject.quantity + ".00";


        table.innerHTML +=
            `
                        <tr>
                            <td>
                            <div class="cart-product-info">
                                <div>
                                <img src="${productObject.images.src}" class="cart-product-pictures">
                                </div>
                                <div>
                                    <h3 class="cart-product-name">${productObject.name}</h3>
                                    <p class="cart-product-price">€${productObject.price}</p>
                                    <p class="cart-product-size">${capitalize(productObject.size)}</p>    
                                    <p class="cart-product-color">${capitalize(productObject.color)}</p>
                                    <p>${productObject.category.name}</p>
                                </div>
                                <button type="submit" class="remove" data-index="${i}">Remove</button> 
                                </div>
                            </td>
                            <td><input type="number" value="${productObject.quantity}" class="cart-product-quantity"></td>
                            <td class="cartProductTablePriceData">${totalProductPrice}</td>
                        </tr>
                        `;
    }



    function totalPriceChecker(allProducts, totalPrice) {

        for (let i = 0; i < allProducts.length; i++) {
            totalPrice = allProducts[i].price;

        }
    }

    const productRemoveButton = document.getElementsByClassName("remove"); // hämta alla element med classen remove. den gör en array med element
    for (var i = 0; i < productRemoveButton.length; i++) { //loopa alla "remove"-knappar
        productRemoveButton[i].addEventListener('click', removeProduct); //lägg ett event "click" på alla knappar
        productRemoveButton[i].addEventListener('click', numberOfProductschecker(myProducts, 0, numberOfProductsInCart));

    }

    var addedPrices = [0];

    for (let i = 0; i < myProducts.length; i++) {
        // console.log(myProducts[i]);
        var totalPrices = myProducts[i].price * myProducts[i].quantity;

        if (totalPrices === 0) {
            console.log("bonk");
        }

        addedPrices.push(totalPrices);
    }

    // console.log(addedPrices);


    let deliveryCosts = {
        cost: 35.00
    }

    let addedPricesReduced = addedPrices.reduce(priceAdder);

    if(addedPricesReduced >= 180 || addedPricesReduced === 0) {
        deliveryCosts.cost = 0;
    }

    let addedPricesAndDeliveryCosts = addedPricesReduced + deliveryCosts.cost;


    freeDeliveryContainer.innerHTML = `
    <div class="freeDelivery">Free delivery when purchasing for 180.00€!</div>
    <table class="totalPriceTable">
    
    <tr>
        <td>Subtotal</td>
        <td class="totalProductPrice">${addedPricesReduced}.00€</td>
    </tr>
    <tr>
        <td>Delivery cost:</td>
        <td>${deliveryCosts.cost}.00€</td>
    </tr>
    <tr>
        <td>Total costs</td>
        <td>${addedPricesAndDeliveryCosts}.00€</td>
    </tr>
    </table>
    <a href="checkout.html" class="cta-1" id="proceed-to-checkout">Proceed to checkout</a>
    `;


    function priceAdder(total, num) {
        return total + num;
    }

}

// Functions --------------------------------------------------------- //


function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

// numberOfProductschecker(myProducts, 0, numberOfProductsInCart);
function numberOfProductschecker(array, number, object) {
    if (array.length !== number) {
        object.innerHTML = array.length;

    } else if (array.length === number) {
        object.innerHTML = number;
    }
}

//funktionen för att ta bort en produktrad
function removeProduct(e) {
    let myProducts = loadFromStorage("chosenProducts"); //ladda carten
    myProducts.splice(e.target.dataset.index, 1); //ta bort ifrån e.target.dataset.index alltså knappen vi tryckte på och 1 antalet som ska tasbort
    saveToStorage("chosenProducts", myProducts); // spara ner den nya arrayen

    loadProductsInToView(); //ladda om carten
}

//gör det enklare att spara object eller array till localstorage
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