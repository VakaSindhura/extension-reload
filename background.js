chrome.browserAction.onClicked.addListener(sendfunc);

function sendfunc(tab) {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function (tabs) {
    console.log('id is', tabs[0].id);
    chrome.tabs.reload(tabs[0].id);
  });
}

// const socket = new WebSocket('ws://localhost:3000/');
// // Connection opened
// socket.addEventListener('open', function (event) {
//   socket.send(`Hello server I'm extension 😘`);
// });
// // on message from server
// socket.addEventListener('message', (event) => {
//   alert(event.data);
// });
