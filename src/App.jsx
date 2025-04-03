import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GiveawayLandingPage from "./GiveawayLandingPage";
import AdminPage from "./pages/admin";
import "./index.css";

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<GiveawayLandingPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route
            path="/thank-you"
            element={<GiveawayLandingPage initialStep={3} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
