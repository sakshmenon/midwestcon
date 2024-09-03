document.addEventListener('DOMContentLoaded', () => {
    const sendTitleButton = document.getElementById('send-title');
    const outputDiv = document.getElementById('output');

    sendTitleButton.addEventListener('click', () => {
        // Get the active tab's title
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            let activeTab = tabs[0];
            let tabTitle = activeTab.title;

            // Create the URL with the title as a query parameter
            const targetUrl = `https://sakshmenon.github.io/extension-main/?text=${encodeURIComponent(tabTitle)}`;

            // Open the URL in a new tab without focusing it
            chrome.tabs.create({ url: targetUrl, active: false }, (tab) => {
                // Wait for the tab to fully load, then extract the processed title
                chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    function: () => document.getElementById('output').textContent
                }, (results) => {
                    if (results && results[0]) {
                        outputDiv.textContent = results[0].result;
                    } else {
                        outputDiv.textContent = 'Failed to retrieve processed title';
                    }
                });
            });
        });
    });
});
