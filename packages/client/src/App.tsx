import PartView from "./views/PartView";
import "./fontAwesome/globalInit";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navigate } from "react-router";
import Header from "./components/header/Header";
import ProjectsView from "./views/ProjectsView";
import ProjectView from "./views/ProjectView";
import AssemblyView from "./views/AssemblyView";
import LoginView from "./views/LoginView";
import AppLayout from "./layouts/AppLayout";
import AccountView from "./views/AccountView";
import UsersView from "./views/UsersView";
import TailwindToaster from "./utils/toast/TailwindToast";
import DashboardView from "./views/DashboardView";
import Footer from "./components/footer/Footer";
import OrderView from "./views/orders/OrdersView";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="*" element={<Navigate to="/login" />} />
          <Route element={<LoginView />}>
            <Route path="/login" element={<div></div>}></Route>
          </Route>
          <Route
            element={<AppLayout header={<Header />} footer={<Footer />} />}
          >
            <Route path="/dashboard" element={<DashboardView />}></Route>
            <Route path="/projects" element={<ProjectsView />}></Route>
            <Route path="/projects/:id" element={<ProjectView />}></Route>
            <Route path="/parts/:id" element={<PartView />}></Route>
            <Route path="/assemblies/:id" element={<AssemblyView />}></Route>
            <Route path="/orders" element={<OrderView />}></Route>
            <Route path="/users" element={<UsersView />}></Route>
            <Route path="/account" element={<AccountView />}></Route>
          </Route>
        </Routes>
      </Router>
      <TailwindToaster />
    </>
  );
};

export default App;
