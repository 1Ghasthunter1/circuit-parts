import PartView from "./views/PartView";
import "./fontAwesome/globalInit";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navigate } from "react-router";
import Header from "./components/header/Header";
import ProjectsView from "./views/ProjectsView";
import ProjectView from "./views/ProjectView";
import AssemblyView from "./views/AssemblyView";
import LoginView from "./views/LoginView";
import UnderConstruction from "./components/components/UnderConstruction";
import AppLayout from "./layouts/AppLayout";
import AccountView from "./views/AccountView";
import UsersView from "./views/UsersView";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashboardView from "./views/DashboardView";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="*" element={<Navigate to="/login" />} />
          <Route element={<LoginView />}>
            <Route path="/login" element={<div></div>}></Route>
          </Route>
          <Route element={<AppLayout header={<Header />} />}>
            <Route path="/dashboard" element={<DashboardView />}></Route>
            <Route path="/projects" element={<ProjectsView />}></Route>
            <Route path="/projects/:id" element={<ProjectView />}></Route>
            <Route path="/parts/:id" element={<PartView />}></Route>
            <Route path="/assemblies/:id" element={<AssemblyView />}></Route>
            <Route path="/orders" element={<UnderConstruction />}></Route>
            <Route path="/users" element={<UsersView />}></Route>
            <Route path="/users/:id" element={<AccountView />}></Route>
          </Route>
        </Routes>
      </Router>
      <ToastContainer hideProgressBar={true} pauseOnFocusLoss={false} />
    </>
  );
};

export default App;
