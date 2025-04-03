import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Import Tailwind CSS
import "./index.css";

// Import your custom CSS files
import "./App.css";
import "./styles/components.css";
import "./styles/giveaway.css";
import "./styles/admin.css";

import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
