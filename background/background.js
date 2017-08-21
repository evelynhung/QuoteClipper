"use strict";

// Firefox and Chrome compatible
if (chrome) {
  var browser = chrome;
}

let storageManager = new StorageManager();

browser.contextMenus.create({
  id: "clip-and-save",
  title: "Save the selected text",
  contexts: ["selection"]
});

browser.contextMenus.onClicked.addListener((info, tab) => {
  browser.tabs.sendMessage(tab.id, { command: "getSelection" }, (response) => {
    let tabUrl = response.url;
    let selectedText = response.selection;
    storageManager.addQuote(tabUrl, { selectedText });
  });
});

// Open collection viewer
browser.browserAction.onClicked.addListener(() => {
  window.open('collection/index.html');
});
