import {convertHistoryToStorageFormat, convertHistoryFromStorageFormat} from "./utils.js";

const STORAGE_KEY = `currency-calculator-history`;

class Storage {
  constructor () {
    this._storage = window.localStorage;
  }

  saveHistory (history) {
    this._storage.setItem(STORAGE_KEY, convertHistoryToStorageFormat(history));
  }

  loadHistory () {
    try {
      return convertHistoryFromStorageFormat(this._storage.getItem(STORAGE_KEY));
    } catch (error) {
      return null;
    }
  }
}

export default Storage;
