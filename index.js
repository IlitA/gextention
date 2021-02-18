var buttonElement = document.getElementById('groverButton');

buttonElement.addEventListener('click', displayName);

function displayName() {
    console.log('click');
}

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { type: 'getParsedInfo' }, function (parsedInfo) {
        if (typeof parsedInfo === 'undefined') {
            // if(chrome.runtime.lastError) // We couldn't talk to the content script, probably it's not there
            console.error(`Page information couldn't be parsed :(`)
        } else {
            console.log(parsedInfo);
            // Prefill the form with the parsed information & have a hidden field with the url
        }
    });
});
