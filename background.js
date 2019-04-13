chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
  chrome.declarativeContent.onPageChanged.addRules([{
    conditions: [new chrome.declarativeContent.PageStateMatcher({
      pageUrl: {hostEquals: 'http://111.93.27.187:8889'},
    })
    ],
        actions: [new chrome.declarativeContent.ShowPageAction()]
  }]);
});

chrome.contextMenus.create({
  id: "Roload Reload",
  title: "Reload Extension",
  contexts: ["page"],
});

chrome.contextMenus.onClicked.addListener(function sendfunc(tab) {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function (tabs) {
    chrome.tabs.reload(tabs[0].id);
  });
});
