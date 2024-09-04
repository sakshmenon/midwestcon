document.addEventListener('DOMContentLoaded', () => {
    const sendTitleButton = document.getElementById('send-title');
    const outputDiv = document.getElementById('output');

    sendTitleButton.addEventListener('click', () => {
        // Get the active tab's title
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            let activeTab = tabs[0];
            let tabTitle = activeTab.title;

            // Create the URL with the title as a query parameter, targeting the local server
            const targetUrl = `http://127.0.0.1:5500/?text=${encodeURIComponent(tabTitle)}`;

            // Open the URL in a new tab without focusing it
            chrome.tabs.create({ url: targetUrl, active: false });
        });
    });

    // Listen for messages from the content script (index.html)
    chrome.runtime.onMessage.addListener((message) => {
        if (message.processedText) {
            outputDiv.textContent = message.processedText;
        }
    });
});
