var options = {
    type: "basic",
    title: "Your page is reloaded",
    message: "Reload Successful",
    iconUrl: './images/somebullshit.png'
};

chrome.notifications.create(options, callback);

chrome.browserAction.onClicked.addListener(sendfunc);
function callback() {

    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function (tabs) {
        chrome.tabs.reload(tabs[0].id);
    });
}
