window.onload = function () {

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


    const addWrapperMen = document.querySelector(".add-wrapper-men")

    console.log(data);

    for (let i = 0; i < data.length; i++) {
        console.log(data[i])

        addWrapperMen.innerHTML +=
            `
         <div class="add-type-2">
            <a href="details.html?articleNumber=${data[i].articleNumber}"><img src="${data[i].images[0]}"
                    alt="Picture of the jacket ${data[i].name}" class="jacket-pictures">
                <h3>${data[i].name}</h3>
                <p>${data[i].shortDescription}</p>
            </a>
            <p>169.00&euro;</p>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
         </div>
         `
         if(i === 3) {
             break;
         }

    }





}