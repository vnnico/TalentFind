import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import Talent from "./pages/Talent";
import Login from "./pages/TalentLogin";
import Auth from "./pages/Auth";
import TalentLogin from "./pages/TalentLogin";
import RecruiterLogin from "./pages/RecruiterLogin";

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
        <Route path="/auth" element={<Auth></Auth>} />
        <Route
          path="/auth/talent-login"
          element={<TalentLogin></TalentLogin>}
        />
        <Route
          path="/auth/recruiter-login"
          element={<RecruiterLogin></RecruiterLogin>}
        />
        {/* <Routes path="/build-cv" element={} />  
        <Routes path="/find-jobs" element={} />  
        <Routes path="/application" element={} />   */}
      </Routes>
    </Router>
  );
}

export default App;
