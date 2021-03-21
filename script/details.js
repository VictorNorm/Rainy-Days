const heading = document.getElementById("name");

window.onload = function load() {
    const urlParams = new URLSearchParams(window.location.search);
    const articleNr = urlParams.get('articleNumber');
    const detailsForItem = data.find(item => {
        return item.articleNumber === articleNr
    })

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


    heading.innerHTML = detailsForItem.name;
    price.innerHTML = detailsForItem.price + detailsForItem.currency;
    productPictureContainer.innerHTML = `<img src="${detailsForItem.images[0]}" class="product-jacket-picture">`
    description.innerHTML = detailsForItem.description;

    for (let i = 0; i < detailsForItem.size.length; i++) {
        sizeSelect.innerHTML += `<option value="${detailsForItem.size[i]}">${detailsForItem.size[i]}</option>`;
    }

    for (let i = 0; i < detailsForItem.images.length; i++) {
        columnPictures.innerHTML += `<img src="${detailsForItem.images[i]}" class="product-col-1-pictures">`;
    }

    for (let i = 0; i < detailsForItem.color.length; i++) {
        colorSelect.innerHTML += `<option value="${detailsForItem.color[i]}">${detailsForItem.color[i]}</option>`
    }


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
            name: detailsForItem.name,
            price: detailsForItem.price,
            size: sizeValue,
            color: colorValue,
            quantity: productQuantity,
            images: detailsForItem.images,
            currency: detailsForItem.currency,
            gender: detailsForItem.gender
        }

        myProducts.push(chosenProduct); //lägg till chosenProduct i arrayen myProducts
        let chosenProductsJSON = JSON.stringify(myProducts); // gör om myProducts till en string
        localStorage.setItem('chosenProducts', chosenProductsJSON); //spara chosenProductsJSON i localstorage under chosenProducts
    });


    addToCart.addEventListener("click", cartLoader);


    
      function cartLoader() {

        function loadFromStorage(itemName) {
            const itemString = localStorage.getItem(itemName);
            let item = JSON.parse(itemString);
            console.log(item)
            return item
        }
    
        let myProducts = loadFromStorage('chosenProducts');
        const numberOfProductsInCart = document.querySelector(".numberOfProductsInCart");
    
        function numberOfProductschecker(array, number, object) {
            if (array.length !== number) {
                object.innerHTML = array.length;
        
            } else if (array.length === number) {
                object.innerHTML = number;
            }
        }
    
        numberOfProductschecker(myProducts, 0, numberOfProductsInCart);
      }


      cartLoader();



}






