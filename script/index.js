import { loadFromStorage } from './functions.js';


window.onload = function () {

    // Cart functionality ---------------------------------------------------------//
    /*
    function loadFromStorage(itemName) {
        const itemString = localStorage.getItem(itemName);
        let item = JSON.parse(itemString);
        return item ?? [];
    }
    */

    function numberOfProductsChecker(array, number, object) {
        if (array.length !== number) {
            object.innerHTML = array.length;

        } else if (array.length === number) {
            object.innerHTML = number;
        }
    }
    /*
    function numberOfProductsChecker(array, number, object) {
        if (array === null) {
            object.innerHTML = number;
            myProducts;
            console.log(myProducts);
        } else if (array.length === null) {
            object.innerHTML = number;
        }
    }
*/
    const numberOfProductsInCart = document.querySelector(".numberOfProductsInCart");
    const myProducts = loadFromStorage('chosenProducts');

    numberOfProductsChecker(myProducts, 0, numberOfProductsInCart);


    // Api call and HTML generation -------------------------------------------//


    const addWrapperMen = document.querySelector(".add-wrapper-men");
    const addWrapperWomen = document.querySelector(".add-wrapper-women");

    const relatedProductsContainer = document.querySelector(".featured-products-container");
    const url = "https://hjulbent.no/rainyDays/wp-json/wc/store/products";


    async function getWordpressProducts() {

        try {
            const response = await fetch(url);
            const details = await response.json();
            console.log(details);

            htmlGenerator(details);
        } catch (error) {
            console.log(error);
        }
    }


    function htmlGenerator(data) {
        for (let i = 0; i < data.length; i++) {
            const product = data[i];
            // console.log(product.categories);

            if (product.categories.some(object => object.name === 'Men\'s jacket')) {
                /* Söker igenom arrayen product.categories och letar efter name */
                addWrapperMen.innerHTML +=
                    `
                        <div class="add-type-2">
                            <a href="details.html?id=${product.id}"><img src="${product.images[0].src}"
                                alt="Picture of the jacket ${product.name}" class="jacket-pictures">
                             <h3>${product.name}</h3>
                           <p class="productShortDescription">${stripHtml(product.short_description)}</p>
                         </a>
                                  <p>${product.prices.regular_price}.00€</p>
                                  <i class="fas fa-star"></i>
                                  <i class="fas fa-star"></i>
                                  <i class="fas fa-star"></i>
                                  <i class="fas fa-star"></i>
                                  <i class="fas fa-star"></i>
                        </div>
                `;
            } else if (product.categories.some(object => object.name === 'Women\'s jacket')) {
                addWrapperWomen.innerHTML +=
                `
                    <div class="add-type-2">
                        <a href="details.html?id=${product.id}"><img src="${product.images[0].src}"
                            alt="Picture of the jacket ${product.name}" class="jacket-pictures">
                         <h3>${product.name}</h3>
                       <p class="productShortDescription">${stripHtml(product.short_description)}</p>
                     </a>
                              <p>${product.prices.regular_price}.00€</p>
                              <i class="fas fa-star"></i>
                              <i class="fas fa-star"></i>
                              <i class="fas fa-star"></i>
                              <i class="fas fa-star"></i>
                              <i class="fas fa-star"></i>
                    </div>
            `;

            }

        }
    }

    getWordpressProducts();

    function stripHtml(html) {
        // Create a new div element
        var temporalDivElement = document.createElement("div");
        // Set the HTML content with the providen
        temporalDivElement.innerHTML = html;
        // Retrieve the text property of the element (cross-browser support)
        return temporalDivElement.textContent || temporalDivElement.innerText || "";
    }



}