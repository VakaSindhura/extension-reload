chrome.contextMenus.create({
  id: "Roload Reload",
  title: "Reload Extension",
  contexts: ["page"],
});

chrome.contextMenus.onClicked.addListener(function sendfunc(tab) {

  chrome.management.getAll(function (a) {
    var ext = {};

    for (var i = 0; i <= a.length - 1; i++) {
      ext = a[i];
      if (ext.enabled && (ext.installType === "development")
        && !(ext.description && ext.description.includes("Reloads Active"))) {
        chrome.management.setEnabled(ext.id, false);
        chrome.management.setEnabled(ext.id, true);
      }
    }
  });

  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, (tabs) => {
    if (tabs.length) {
      chrome.tabs.reload(tabs[0].id);
    }
  });

});
