/** @format */

import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Routing } from "./Routing";
import { store } from "./redux/store";
import "./App.css";

ReactDOM.render(
  <Provider store={store}>
    <Routing />
  </Provider>,
  document.getElementById("root")
);
