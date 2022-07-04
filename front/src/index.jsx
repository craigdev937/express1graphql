import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";

import(/* webpackChunkName: "app" */ "./app/App")
.then(({ App }) => {
    ReactDOM
    .createRoot(document.getElementById("root"))
    .render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
});


