import React from "react";
import PartsView from "./views/PartsView";
import PartView from "./views/PartView";
import "./fontAwesome/globalInit";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./elements/header/Header";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/parts" element={<PartsView />}></Route>
        <Route path="/parts/:id" element={<PartView />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
