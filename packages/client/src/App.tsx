import React from "react";
import PartView from "./views/PartView";
import "./fontAwesome/globalInit";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import DashboardView from "./views/ProjectsView";
import ProjectView from "./views/ProjectView";
import AssemblyView from "./views/AssemblyView";
const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/dashboard"
          element={
            <div>
              <p>me still coding the website</p>
              <img className="max-w-screen-sm" src="https://miro.medium.com/max/3600/0*n-2bW82Z6m6U2bij.jpeg" />
              <p className="text-xl">stop looking here im still coding</p>
            </div>
          }
        ></Route>
        <Route path="/projects" element={<DashboardView />}></Route>
        <Route path="/projects/:id" element={<ProjectView />}></Route>
        <Route path="/parts/:id" element={<PartView />}></Route>
        <Route path="/assemblies/:id" element={<AssemblyView />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
