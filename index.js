var buttonElement = document.getElementById('groverButton');

buttonElement.addEventListener('click', displayName);

function displayName() {
    console.log('click');
}

chrome.tabs.query({active: true, currentWindow: true}, tabs => {
    chrome.tabs.sendMessage(tabs[0].id, { type: 'getParsedData' }, parsedData => {
        if (typeof parsedData === 'undefined') {
            // if (chrome.runtime.lastError) // We couldn't talk to the content script, probably it's not there
            console.error('Error whilst parsing the page information');
        } else {
            console.log(parsedData);
            // Prefill the form with the parsed information & have a hidden field with the url
        }
    });
});
