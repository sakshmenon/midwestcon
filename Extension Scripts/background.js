chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url) {
        const isGoogleSearch = tab.url.startsWith('https://www.google.com/search');

        if (isGoogleSearch) {
            // Get the tab's title
            chrome.scripting.executeScript({
                target: { tabId: tabId },
                function: () => document.title
            }, (results) => {
                if (results && results[0]) {
                    let tabTitle = results[0].result;

                    // Create the URL with the title as a query parameter, targeting the local server
                    const targetUrl = `http://127.0.0.1:5500/?text=${encodeURIComponent(tabTitle)}`;

                    // Open the URL in a new tab without focusing it
                    // chrome.tabs.create({ url: targetUrl, active: false }, (newTab) => {
                        // Process the output (if needed) or store it for later use
                    chrome.scripting.executeScript({
                        target: { tabId: newTab.id },
                        function: () => document.getElementById('output').textContent
                    }, (newResults) => {
                        if (newResults && newResults[0]) {
                            // Send the processed title back to the popup
                            chrome.runtime.sendMessage({ processedTitle: newResults[0].result });
                            }
                        });
                    // });
                }
            });
        }
    }
});
