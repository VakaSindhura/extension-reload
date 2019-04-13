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

  chrome.tabs.query({url: "chrome://extensions/"}, function(tab) {
    chrome.tabs.reload(tab[0].id);
  }); 
});

// const socket = new WebSocket('ws://localhost:3000/');
// // Connection opened
// socket.addEventListener('open', function (event) {
//   socket.send(`Hello server I'm extension 😘`);
// });
// // on message from server
// socket.addEventListener('message', (event) => {
//   alert(event.data);
// });
