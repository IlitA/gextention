const parsedInfo = {}
parsedInfo.url = window.location.href;
const {
    hostname
} = new URL(parsedInfo.url);

window.onload = () => {
    switch (hostname.split('.')[1]) {
        case 'amazon':
            parsedInfo.productName = document?.querySelector('#productTitle')?.innerText || '';
            parsedInfo.imageUrl = document?.querySelector('#imgTagWrapperId img')?.src || '';
            break;
        default:
            parsedInfo.productName = document?.head?.querySelector('title')?.innerText || '';
            parsedInfo.imageUrl = document?.head?.querySelector('meta[property="og:image"]')?.content || '';
    }
}

chrome.runtime.onMessage.addListener(
    function (message, sender, sendResponse) {
        switch (message.type) {
            case 'getParsedInfo':
                sendResponse(parsedInfo);
                break;
            default:
                console.error('Unrecognised message: ', message);
        }
    }
);
