import "./styles/index.scss";

import React from "react";
import ReactDOM from "react-dom";

import App from "./components/app/app.jsx";

ReactDOM.render(<App/>, document.querySelector(`#root`));

window.addEventListener(`load`, () => navigator.serviceWorker.register(`/sw.js`).catch(() => {}));
