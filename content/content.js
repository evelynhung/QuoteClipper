"use strict";

// Firefox and Chrome compatible
if (chrome) {
  var browser = chrome;
}

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.command) {
    case "getSelection":
      let selection = window.getSelection();
      sendResponse({
        url: encodeURIComponent(window.location.href),
        selection: selection.toString()
      });
      break;
  }
});
