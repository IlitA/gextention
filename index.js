var buttonElement = document.querySelector('.groverButton');
var productCategory = document.querySelector('.productCategoryInput');
var newProduct = document.querySelector('.product');

buttonElement.addEventListener('click', displayName);

function displayName() {
    console.log('click', productCategory.value);
}

chrome.tabs.query({active: true, currentWindow: true}, tabs => {
    chrome.tabs.sendMessage(tabs[0].id, { type: 'getParsedData' }, parsedData => {
        if (typeof parsedData === 'undefined') {
            console.error('Error whilst parsing the page information');
        } else {
            console.log(parsedData);

            const productName = document.createElement("h4");
            productName.classList.add('productName');
            newProduct.prepend(productName);
            productName.innerHTML = parsedData.productName;

            const img = document.createElement("img");
            img.classList.add('productImg');
            img.setAttribute("src", parsedData.imageUrl);
            newProduct.prepend(img);
        }
    });
});
