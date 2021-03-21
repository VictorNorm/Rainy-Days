window.onload = function () {


    const numberOfProductsInCart = document.querySelector(".numberOfProductsInCart");
    const myProducts = loadFromStorage('chosenProducts');

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


}