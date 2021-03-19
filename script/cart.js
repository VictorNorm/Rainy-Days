window.onload = function load(event) {
    
    loadProductsInToView();
}


function loadProductsInToView() {
    
    const table = document.getElementById("cartTable");
    table.innerHTML = ""; //ta bort alla produkter som redan ligger i carten för de kommer läsas in igen på nytt.
    
    const totalPriceTable = document.querySelector(".totalPriceTable");
    
    const myProducts = loadFromStorage('chosenProducts'); //ladda alla produkter ifrån localstorage
    
    for (let i = 0; i < myProducts.length; i++) {
        const productObject = myProducts[i];
        table.innerHTML +=
        `
        <tr>
        <td>
        <div class="cart-product-info">
        <div>
        <img src="${productObject.images[0]}" class="cart-product-pictures">
        </div>
        <div>
        <h3 class="cart-product-name">${productObject.name}</h3>
        <p class="cart-product-size">${productObject.size}</p>
        <p class="cart-product-price">${productObject.price}</p>
        <button type="submit" class="remove" data-index="${i}">Remove</button> 
        </div>
        </div>
        </td>
        <td><input type="number" value="${productObject.quantity}" class="cart-product-quantity"></td>
        <td class="cartProductTablePriceData">${productObject.price}</td>
        </tr>`;
        
        totalPriceTable.innerHTML =
        `
        <tr>
            <td>Subtotal</td>
            <td>&euro;338.00</td>
        </tr>
        <tr>
            <td>Delivery costs</td>
            <td>&euro;0.00</td>
        </tr>
        <tr>
            <td>Total costs</td>
            <td>&euro;338.00</td>
        </tr>
        `;
        console.log(myProducts);
    }

    function priceChanger (products) {

        let cartProductTablePriceData = document.querySelector(".cartProductTablePriceData");
        for (let i = 0; i < products.length; i++) {
            console.log(products[i].price)
             let totalProductPrice = products[i].price * products[i].quantity + ".00";
            cartProductTablePriceData.innerHTML = `${totalProductPrice}`;
        }
    }
    
    priceChanger(myProducts);
    
    const productRemoveButton = document.getElementsByClassName("remove"); // hämta alla element med classen remove. den gör en array med element
    for (var i = 0; i < productRemoveButton.length; i++) { //loopa alla "remove"-knappar
    productRemoveButton[i].addEventListener('click', removeProduct); //lägg ett event "click" på alla knappar
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