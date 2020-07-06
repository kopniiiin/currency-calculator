import {formatDateParameter, getRatesFromXML} from "./utils.js";

const PROXY_URL = `https://cors-anywhere.herokuapp.com`;
const SERVER_URL = `https://www.cbr.ru/scripts/XML_daily.asp`;

class API {
  getRates (date) {
    return fetch(`${PROXY_URL}/${SERVER_URL}?${formatDateParameter(date)}`)
      .then((response) => response.text())
      .then(getRatesFromXML)
  }
}

export default API;
