"use strict";

// Firefox and Chrome compatible
if (chrome) {
  var browser = chrome;
}

class StorageManager {
  get myStorage() {
      return browser.storage.local;
  }

  addQuote(tabUrl, data) {
    this.myStorage.get(tabUrl, (items) => {
      let quoteList = [];
      // We might have saved something from this page before.
      if (Object.keys(items).length > 0) {
        quoteList = items[tabUrl];
      }
      quoteList.push(data);
      let obj = {};
      obj[tabUrl] = quoteList;
      this.myStorage.set(obj);
    });
  }

  queryAllQuotes(callback) {
    this.myStorage.get(callback);
  }
}

// DEBUG
browser.storage.onChanged.addListener((changes, area) => {
  // TODO refresh UI.
  console.log("Change in storage area: " + area);

  var changedItems = Object.keys(changes);

  for (var item of changedItems) {
    console.log(item + " has changed:");
    console.log("Old value: ");
    console.log(changes[item].oldValue);
    console.log("New value: ");
    console.log(changes[item].newValue);
  }
});