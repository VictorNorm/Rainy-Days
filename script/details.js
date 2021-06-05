import { loadFromStorage, numberOfProductsChecker } from './functions.js';


const heading = document.getElementById("name");

window.onload = function load() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    
    // console.log(id)

    //   console.log(detailsForItem);

    const columnPictures = document.querySelector(".product-col-1");
    const productPictureContainer = document.querySelector(".product-container-box-1");
    const heading = document.getElementById("name");
    const price = document.getElementById("price");
    const sizeSelect = document.getElementById("size");
    const colorSelect = document.getElementById("color");
    const description = document.getElementById("description");
    const addToCart = document.getElementById("cta-1");
    const quantity = document.getElementById("quantity");
    const currentPage = document.querySelector(".current-page");
    const title = document.querySelector("title");

    const url = "https://hjulbent.no/rainyDays/wp-json/wc/store/products/" + id + "?=_embed";


    async function getWordpressProduct() {
        try {
            const response = await fetch(url);
            const details = await response.json();
            console.log(details);

            for (let i = 0; i < details.images.length; i++) {
                
                productPictureContainer.innerHTML = `<img src="${details.images[0].src}" class="product-jacket-picture">`;
                
                 if(i < 1) {
                    columnPictures.innerHTML += `<img src="${details.images[i].src}" class="product-col-1-pictures productColActive"</img>`;
                   
                 } else {
                    columnPictures.innerHTML += `<img src="${details.images[i].src}" class="product-col-1-pictures"</img>`;
                 }
            }

            var images = document.querySelectorAll(".product-col-1-pictures");
            images.forEach(function(image){
                image.onclick = function(event) {
                    document.querySelector(".productColActive").classList.remove("productColActive");
                    event.target.classList.add("productColActive");
                    productPictureContainer.innerHTML = `<img src="${event.target.src}" class="product-jacket-picture"></img>`
                }
            })

            if (details.categories.some(object => object.name === 'Men\'s jacket')) {
                currentPage.innerHTML = `Men\s jackets > ${details.name}`;
            }
            
            title.innerHTML = `Rainy Days: ${details.name}`;
            heading.innerHTML = details.name;
            price.innerHTML = details.prices.regular_price + ".00€"
            description.innerHTML = stripHtml(details.description);
            
            

            addToCart.addEventListener('click', e => {

                e.preventDefault();
        
                //Load Cart if exists
                let myProducts = [];
                if (localStorage.getItem("chosenProducts") !== null) { //kolla om chosenProducts finns i localstorage
                    const myProductsString = localStorage.getItem("chosenProducts"); //hämta chosenProducts stringen ifrån localstorage
                    myProducts = JSON.parse(myProductsString); // gör om stringen chosenProducts till en array
                }
        
        
                let colorValue = color.value;
                let sizeValue = size.value;
                let productQuantity = quantity.value;
        
        
                let chosenProduct = {
                    name: details.name,
                    price: details.prices.regular_price,
                    size: sizeValue,
                    color: colorValue,
                    quantity: productQuantity,
                    images: details.images[0],
                    category: details.categories[0]
                }
        
                myProducts.push(chosenProduct); //lägg till chosenProduct i arrayen myProducts
                let chosenProductsJSON = JSON.stringify(myProducts); // gör om myProducts till en string
                localStorage.setItem('chosenProducts', chosenProductsJSON); //spara chosenProductsJSON i localstorage under chosenProducts
            });


            addToCart.addEventListener("click", cartLoader);

            function cartLoader() {
        
                let myProducts = loadFromStorage('chosenProducts')
                const numberOfProductsInCart = document.querySelector(".numberOfProductsInCart");
        
                numberOfProductsChecker(myProducts, 0, numberOfProductsInCart);
            }
        
            cartLoader();

        }
        catch(error){
            console.log(error);
        }
    }

    getWordpressProduct();
  

    function stripHtml(html) {
        var temporalDivElement = document.createElement("div");
        temporalDivElement.innerHTML = html;
        return temporalDivElement.textContent || temporalDivElement.innerText || "";
    }

    

}


