const url = "https://hjulbent.no/rainyDays/wp-json/wc/store/products";
const addWrapper = document.querySelector(".add-wrapper");

async function getWordpressProducts() {

    try {
        const response = await fetch(url);
        const details = await response.json();
        // console.log(details);

        htmlGeneratorMen(details);
    } catch (error) {
        console.log(error);
    }
}

getWordpressProducts();

function htmlGeneratorMen(results) {
    for (let i = 0; i < results.length; i++) {
        const products = results[i];
        console.log(products);


        if (products.categories.some(object => object.name === 'Men\'s jacket')) {
            addWrapper.innerHTML +=
            `
                <div class="add-type-2">
                    <a href="details.html?id=${products.id}"><img src="${products.images[0].src}"
                        alt="Picture of the jacket ${products.name}" class="jacket-pictures">
                    <h3>${products.name}</h3>
                <p class="productShortDescription">${stripHtml(products.short_description)}</p>
                </a>
                        <p>${products.prices.regular_price}.00€</p>
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

function stripHtml(html) {
    var temporalDivElement = document.createElement("div");
    temporalDivElement.innerHTML = html;
    return temporalDivElement.textContent || temporalDivElement.innerText || "";
}

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