import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UsersList from "./pages/UsersList";
import UserProfile from "./pages/UserProfile";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<UsersList />}
          />
          <Route
            path="/user/:id"
            element={<UserProfile />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
