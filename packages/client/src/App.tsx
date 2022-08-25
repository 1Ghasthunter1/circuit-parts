import PartView from "./views/PartView";
import "./fontAwesome/globalInit";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import ProjectsView from "./views/ProjectsView";
import ProjectView from "./views/ProjectView";
import AssemblyView from "./views/AssemblyView";
import LoginView from "./views/LoginView";
import UnderConstruction from "./components/components/UnderConstruction";
import AppLayout from "./layouts/AppLayout";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<LoginView />}>
          <Route path="/login" element={<div>asd</div>}></Route>
        </Route>
        <Route element={<AppLayout header={<Header />} />}>
          <Route path="/dashboard" element={<UnderConstruction />}></Route>
          <Route path="/projects" element={<ProjectsView />}></Route>
          <Route path="/projects/:id" element={<ProjectView />}></Route>
          <Route path="/parts/:id" element={<PartView />}></Route>
          <Route path="/assemblies/:id" element={<AssemblyView />}></Route>
          <Route path="/orders" element={<UnderConstruction />}></Route>
          <Route path="/users" element={<UnderConstruction />}></Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
