import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./layouts/Layout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout></Layout>} />
        {/* <Routes path="/build-cv" element={} />  
        <Routes path="/find-jobs" element={} />  
        <Routes path="/application" element={} />   */}
      </Routes>
    </Router>
  );
}

export default App;
