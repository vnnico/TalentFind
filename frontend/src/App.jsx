import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import Talent from "./pages/Talent";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Talent></Talent>
            </Layout>
          }
        />
        {/* <Routes path="/build-cv" element={} />  
        <Routes path="/find-jobs" element={} />  
        <Routes path="/application" element={} />   */}
      </Routes>
    </Router>
  );
}

export default App;
