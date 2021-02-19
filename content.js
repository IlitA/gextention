const parsedData = {}
parsedData.externalLink = window.location.href;
const {
    hostname
} = new URL(parsedData.externalLink);
parsedData.externalLinkTrimmed = hostname;

window.onload = () => {
    // Try getting image from og:image meta tags
    parsedData.externalImage = document?.head?.querySelector('meta[property="og:image"]')?.content || '';
    if (!parsedData.externalImage) parsedData.externalImage = document?.head?.querySelector('meta[name="og:image"]')?.content || ''; // Case: Gravis

    // Special cases
    switch (hostname.split('.')[1]) {
        case 'amazon':
            parsedData.name = document?.querySelector('#productTitle')?.innerText || '';
            parsedData.externalImage = document?.querySelector('#imgTagWrapperId img')?.src || '';
            break;
        case 'conrad':
            parsedData.externalImage = document?.querySelector('#productMainImage')?.src || '';
            break;
        case 'idealo':
            parsedData.externalImage = document?.querySelector('img.productReviews-image')?.src || '';
            break;
    }

    // If no special case, or product name results in '', get title from document head
    if (!parsedData.name) parsedData.name = document?.head?.querySelector('title')?.innerText || '';
}

// Message receiver: this is how parsed data is sent to the popup
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
