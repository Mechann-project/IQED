import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./Style/Main.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import App from "./App.jsx";
import { store } from './Redux/Store.js'
import { Provider } from "react-redux";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react"
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
      {/* <Analytics />
      <SpeedInsights /> */}
    </Provider>
  </StrictMode>
);
