import * as React from "react";
import ReactDOM from "react-dom/client";
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import App from "./pages/App.jsx";
import Init from "./pages/Init.jsx"


const root = ReactDOM.createRoot(
    document.getElementById("root")
);

root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Init />} />
            <Route path="/wallet" element={<App />} />
        </Routes>
    </BrowserRouter >
);