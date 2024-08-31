import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import Talent from "./pages/Talent";
import Login from "./pages/TalentLogin";
import Auth from "./pages/Auth";
import TalentLogin from "./pages/TalentLogin";
import RecruiterLogin from "./pages/RecruiterLogin";
import Company from "./pages/Company";
import TalentRegister from "./pages/TalentRegister";
import RecruiterRegister from "./pages/RecruiterRegister";
import FindJob from "./pages/FindJob";
import Application from "./pages/Application";
import JobPost from "./pages/JobPost";

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
          path="/auth/talent-register"
          element={<TalentRegister></TalentRegister>}
        />
        <Route
          path="/auth/recruiter-login"
          element={<RecruiterLogin></RecruiterLogin>}
        />
        <Route
          path="/auth/recruiter-register"
          element={<RecruiterRegister></RecruiterRegister>}
        />
        <Route
          path="/company"
          element={
            <Layout>
              <Company></Company>
            </Layout>
          }
        />

        <Route
          path="/find-jobs"
          element={
            <Layout>
              <FindJob></FindJob>
            </Layout>
          }
        />
        <Route
          path="/applications"
          element={
            <Layout>
              <Application></Application>
            </Layout>
          }
        />
        <Route
          path="/job-posts"
          element={
            <Layout>
              <JobPost></JobPost>
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
