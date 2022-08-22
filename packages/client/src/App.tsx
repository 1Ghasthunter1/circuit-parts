import PartView from "./views/PartView";
import "./fontAwesome/globalInit";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import DashboardView from "./views/ProjectsView";
import ProjectView from "./views/ProjectView";
import AssemblyView from "./views/AssemblyView";
import UnderConstruction from "./components/components/UnderConstruction";
const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/dashboard" element={<UnderConstruction />}></Route>
        <Route path="/projects" element={<DashboardView />}></Route>
        <Route path="/projects/:id" element={<ProjectView />}></Route>
        <Route path="/parts/:id" element={<PartView />}></Route>
        <Route path="/assemblies/:id" element={<AssemblyView />}></Route>
        <Route path="/orders" element={<UnderConstruction />}></Route>
        <Route path="/users" element={<UnderConstruction />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
