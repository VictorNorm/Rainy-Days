const heading = document.getElementById("name");

window.onload = function load() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    
    console.log(id)

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
    const currentPage = document.querySelector(".current-page")

    const url = "https://hjulbent.no/cms-ca/wp-json/wc/store/products/" + id;


    async function getWordpressProduct() {
        try {
            const response = await fetch(url);
            const details = await response.json();
            console.log(details);

            heading.innerHTML = details.name;
            price.innerHTML = details.prices.price + ".00€"
        }
        catch(error){
            console.log(error);
        }
    }

    getWordpressProduct();


  
}