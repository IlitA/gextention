const parsedData = {}
parsedData.url = window.location.href;
const {
    hostname
} = new URL(parsedData.url);
parsedData.hostname = hostname;

window.onload = () => {
    // Try getting image from og:image meta tags
    parsedData.imageUrl = document?.head?.querySelector('meta[property="og:image"]')?.content || '';
    if (!parsedData.imageUrl) parsedData.imageUrl = document?.head?.querySelector('meta[name="og:image"]')?.content || ''; // Case: Gravis

    // Special cases
    switch (hostname.split('.')[1]) {
        case 'amazon':
            parsedData.productName = document?.querySelector('#productTitle')?.innerText || '';
            parsedData.imageUrl = document?.querySelector('#imgTagWrapperId img')?.src || '';
            break;
        case 'conrad':
            parsedData.imageUrl = document?.querySelector('#productMainImage')?.src || '';
            break;
        case 'idealo':
            parsedData.imageUrl = document?.querySelector('img.productReviews-image')?.src || '';
            break;
    }

    // If no special case, or product name results in '', get title from document head
    if (!parsedData.productName) parsedData.productName = document?.head?.querySelector('title')?.innerText || '';
}

chrome.runtime.onMessage.addListener(
    (message, sender, sendResponse) => {
        switch (message.type) {
            case 'getParsedData':
                sendResponse(parsedData);
                break;
            default:
                console.error('Unrecognised message: ', message);
        }
    }
);
