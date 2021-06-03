
function loadFromStorage(itemName) {
    const itemString = localStorage.getItem(itemName);
    let item = JSON.parse(itemString);
    return item ?? [];
}

function numberOfProductsChecker(array, number, object) {
    if (array.length !== number) {
        object.innerHTML = array.length;

    } else if (array.length === number) {
        object.innerHTML = number;
    }
}

 
export { loadFromStorage, numberOfProductsChecker };