const productCategory = document.querySelector('.productCategoryInput');
let userId = '';

const postData = () => {
    console.log('click', productCategory.value);
}

const redirectToGrover = () => {
    chrome.tabs.create({ url: 'https://frontstaging-2.getgrover.com/de-en' });
}

// Initial onClick event => redirect user to Grover
document.querySelector('.groverButton').addEventListener('click', redirectToGrover);

// Get userId from grover cookies
chrome.cookies.get({ url: 'https://frontstaging-2.getgrover.com/de-en/for-you', name: 'user_id' }, cookie => {
    userId = cookie?.value;
    if (userId) {
        document.querySelector('.groverButton').innerHTML = 'Suggest product'
        document.querySelector('.content').classList.remove('unknownUser');
        document.querySelector('.groverButton').removeEventListener('click', redirectToGrover);
        document.querySelector('.groverButton').addEventListener('click', postData);
    }
});

// Send message to content.js requesting the parsed data from the current page
chrome.tabs.query({active: true, currentWindow: true}, tabs => {
    chrome.tabs.sendMessage(tabs[0].id, { type: 'getParsedData' }, parsedData => {
        if (typeof parsedData === 'undefined') {
            // We couldn't talk to the content script, probably it's not there
            if (chrome.runtime.lastError) {
                console.error('Could not establish connection to content.js.')
            } else {
                console.error('Error whilst parsing the page information. parsedData is undefined.');
            }
        } else {
            if (parsedData.imageUrl) document.querySelector('img.productImg').src = parsedData.imageUrl;
            document.querySelector('h4.productName').innerHTML = parsedData.productName;
        }
    });
});
