"use strict";

let storageManager = null;
let viewer = null;
class View {
  constructor() {
    this.container = document.getElementById("view-container");
  }
  /*
    <div id="https%3A%2F%2example.com" class="record">
      <div class="url">http://example.com</div>
      <ul>
        <li><a href="http://example.com" target="_blank"> ...some text...</a></li>
      </ul>
    </div>
   */
  _formatRecord(url) {
    let urlContainer = document.createElement("div");
    urlContainer.id = url;
    urlContainer.classList.add("record");
    let urlDisplay = document.createElement("div");
    urlDisplay.textContent = decodeURIComponent(url);
    urlDisplay.classList.add("url");
    urlContainer.appendChild(urlDisplay);
    return urlContainer;
  }

  _formatEntry(url, data) {
    let quoteDisplay = document.createElement("li");
    let a = document.createElement("a");
    a.href = decodeURIComponent(url);
    a.target = "_blank";
    if (typeof data === "object") {
      a.textContent = this._formatText(data.selectedText);
    } else {
      a.textContent = this._formatText(data);
    }
    quoteDisplay.appendChild(a);
    return quoteDisplay;
  }

  _formatText(text) {
    return "..." + text + "...";
  }

  repaint(items) {
    let fragment = document.createDocumentFragment();
    let keys = Object.keys(items);
    keys.sort();
    for (let url of keys) {
      let urlContainer = this._formatRecord(url);
      let quotesList = document.createElement("ul");
      let quoteList = items[url];
      for (let data of quoteList) {
        quotesList.appendChild(this._formatEntry(url, data));
      }
      urlContainer.appendChild(quotesList);
      fragment.appendChild(urlContainer);
    }
    this.container.appendChild(fragment);
  }
}
window.onload = () => {
  storageManager = new StorageManager();
  viewer = new View();
  storageManager.queryAllQuotes(viewer.repaint.bind(viewer));
};