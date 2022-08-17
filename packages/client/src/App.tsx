import React from "react";
import PartsView from "./views/PartsView";
import PartView from "./views/PartView";
import "./fontAwesome/globalInit";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import DashboardView from "./views/DashboardView";
import ProjectView from "./views/ProjectView";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/projects" element={<DashboardView />}></Route>
        <Route path="/projects/:id" element={<ProjectView />}></Route>
        <Route path="/parts" element={<PartsView />}></Route>
        <Route path="/parts/:id" element={<PartView />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
