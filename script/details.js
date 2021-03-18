const heading = document.getElementById("name");

window.onload = function load() {
    const urlParams = new URLSearchParams(window.location.search);
    const articleNr = urlParams.get('articleNumber');
    const detailsForItem = data.find(item => {
        return item.articleNumber === articleNr
    })

     console.log(detailsForItem);

    const columnPictures = document.querySelector(".product-col-1");
    const productPictureContainer = document.querySelector(".product-container-box-1");
    const heading = document.getElementById("name");
    const price = document.getElementById("price");
    const sizeSelect = document.getElementById("size");
    const colorSelect = document.getElementById("color");
    const description = document.getElementById("description");
    const addToCart = document.getElementById("cta-1");
    const quantity = document.getElementById("quantity");

    let productQuantity = quantity.value;
    console.log(productQuantity)
  
    console.log(detailsForItem);

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


    let cartArray = [];
     addToCart.addEventListener('click', e => {

        //Läs!!! JSON för javascript
        // Localsorage och loacalstoragesession

         e.preventDefault();

         let colorValue = color.value;
         let sizeValue = size.value;
         

        let chosenProduct = {
            name: detailsForItem.name,
            price: detailsForItem.price,
            size: sizeValue,
            color: colorValue,
            quantity: productQuantity,
            images: detailsForItem.images,
            currency: detailsForItem.currency
        }

         let chosenProductJSON = JSON.stringify(chosenProduct);
         cartArray.push(chosenProductJSON)
         console.log(cartArray)
         console.log(chosenProductJSON)
         

        // let cartArray = JSON.parse(window.sessionStorage.cart);
        // cartArray.push(detailsForItem);
        // window.sessionStorage.cart = JSON.stringify(cartArray);
      
     });

     

};

// Få det att funka med en for loop.








//  var detailsForItem;
//  for (var i = 0; i < data.length; i++) {
//      if (data[i].articleNumber == articleNr) {
//          detailsForItem = data[i];
//         break;
//     }
//  }