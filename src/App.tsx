import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserTable from "./components/ui/UserTable";
import UserDetails from "./components/ui/UserDetails";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserTable />} />
        <Route path="/user/:id" element={<UserDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
