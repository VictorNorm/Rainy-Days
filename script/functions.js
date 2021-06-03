
function loadFromStorage(itemName) {
    const itemString = localStorage.getItem(itemName);
    let item = JSON.parse(itemString);
    return item ?? [];
}
 
export { loadFromStorage };