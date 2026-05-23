import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Codebases from "./pages/Codebases";
import Threats from "./pages/Threats";


function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/codebases" element={<Codebases />} />
          <Route path="/threats" element={<Threats />} />
          {/* Route settings to dashboard temporarily */}
          <Route
            path="/settings"
            element={<Navigate to="/dashboard" replace />}
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
