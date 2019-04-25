chrome.contextMenus.create({
  id: "Roload Reload",
  title: "Reload Extension",
  contexts: ["page"],
});

chrome.contextMenus.onClicked.addListener(function sendfunc(tab) {

  chrome.management.getAll(function(a){
    var ext ={};
    console.log('extensions are', a);

    for(var i=1;i<=a.length;i++){
      ext=a[i];
      if(ext.enabled && (ext.installType === "development") 
          && (ext.name!=="Reloads current tab and custom extensions")) {
        console.log('If', ext.name);
        chrome.management.setEnabled(ext.id, false);
        chrome.management.setEnabled(ext.id, true);
      }
    }
  });

  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, (tabs) => {
    if(tabs.length) {
      chrome.tabs.reload(tabs[0].id);
    }
  });

});

