chrome.contextMenus.create({
  id: "Roload Reload",
  title: "Reload Extension",
  contexts: ["page"],
});

chrome.contextMenus.onClicked.addListener(function sendfunc(tab) {

  chrome.management.getAll(function(a){
    var ext ={};
    console.log('extensions are', a);

    for(var i=0;i<=a.length;i++){
      ext=a[i];
      if((ext.enabled === true) && (ext.installType === "development") 
          && (ext.name!=="Reloads current tab and extension page")) {
        console.log('If', ext.name);
        chrome.management.setEnabled(ext.id, false);
        chrome.management.setEnabled(ext.id, true);
      }
    }
  });
  
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function (tabs) {
    chrome.tabs.reload(tabs[0].id);
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
