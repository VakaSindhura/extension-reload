// chrome.contextMenus.create({
//   id: "Roload Reload",
//   title: "Reload unpacked Extension",
//   contexts: ["page"],
// });

function reloadAll() {
  //Gets all the extension list from extensions tab
  chrome.management.getAll(function reload(a) {
    var StoredExtensions = JSON.parse(localStorage.getItem('storedExtensions'));
    var ext = {};
    var isCurrentExtensionStored = false;
    for (var i = 0; i <= a.length - 1; i++) {
      ext = a[i];
      const { name, id } = ext;
      isCurrentExtensionStored = checkForExtension({ id, name }, StoredExtensions);
      if (
        isCurrentExtensionStored &&
        !(ext.description && ext.description.includes("Reloads Active")) &&
        (!ext.isApp)
      ) {
        chrome.management.setEnabled(ext.id, false);
        chrome.management.setEnabled(ext.id, true);
      }
    }
  });

  // Reloads the current tab
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, (tabs) => {
    if (tabs.length) {
      chrome.tabs.reload(tabs[0].id);
    }
  });
}

function checkForExtension(currExtensionDetails, extensions) {
  return extensions.find(e => e.id === currExtensionDetails.id);
}


//If want in right click of context menu, use contextMenus in place of browerAction
chrome.browserAction.onClicked.addListener(function sendfunc(tab) {
  reloadAll()
});

// Works with shortcut key mentioned in Manifest
chrome.commands.onCommand.addListener(function (command) {
  if (command === 'reload_extensions') {
    reloadAll();
  }
});

//on installation, options.html will be opened
chrome.runtime.onInstalled.addListener(function (details) {
  if (details.reason == "install") {
    chrome.tabs.create({ url: "options.html" });
  } 
  // else if (details.reason == "update") {
  //   console.log('updated');
  // }
});

//feedback page on uninstall
chrome.runtime.setUninstallURL('https://reload-extension-prod.herokuapp.com/');


let data = null;

function listenToBackgroundMessages() {
  chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
      if (request.type === 'save') {
        data = request.data
      } else if (request.type === 'get') {
        sendResponse(data);
      }
      return true;
    }
  );
}

listenToBackgroundMessages();
