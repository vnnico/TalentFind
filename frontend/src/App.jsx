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
import FindTalent from "./pages/FindTalent";
import JobPostApplicant from "./pages/JobPostApplicant";
import OnlyTalent from "./pages/OnlyTalent";
import OnlyRecruiter from "./pages/OnlyRecruiter";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <OnlyTalent>
              <Layout>
                <Talent></Talent>
              </Layout>
            </OnlyTalent>
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
            <OnlyRecruiter>
              <Layout>
                <Company></Company>
              </Layout>
            </OnlyRecruiter>
          }
        />

        <Route
          path="/find-jobs"
          element={
            <OnlyTalent>
              <Layout>
                <FindJob></FindJob>
              </Layout>
            </OnlyTalent>
          }
        />
        <Route
          path="/applications"
          element={
            <OnlyTalent>
              <Layout>
                <Application></Application>
              </Layout>
            </OnlyTalent>
          }
        />
        <Route
          path="/job-posts"
          element={
            <OnlyRecruiter>
              <Layout>
                <JobPost></JobPost>
              </Layout>
            </OnlyRecruiter>
          }
        ></Route>
        <Route
          path="/job-posts/:jobPostID"
          element={
            <OnlyRecruiter>
              <Layout>
                <JobPostApplicant></JobPostApplicant>
              </Layout>
            </OnlyRecruiter>
          }
        />
        <Route
          path="/find-talent"
          element={
            <OnlyRecruiter>
              <Layout>
                <FindTalent></FindTalent>
              </Layout>
            </OnlyRecruiter>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
