import * as React from "react";
import ReactDOM from "react-dom/client";
const root = ReactDOM.createRoot(
 document.getElementById('root') as HTMLElement
);

import App from "./client/App";

root.render(
 <React.StrictMode>
  <App />
 </React.StrictMode>
);
