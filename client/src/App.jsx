import { React, useState } from 'react'
import { Route, Routes } from "react-router-dom";
import AuthPage from "./Pages/Auth/AuthPage";
import "./index.css";
import ForgetingPwd from './components/authentications/ForgetingPwd';
import VerifyEmailForm from './components/authentications/VerifyEmailForm';
import GoogleAuth from './components/authentications/GoogleAuth';
import AccountConfirmation from './components/authentications/AccountConfirmation';
import AccountVerifyEmailForm from './components/authentications/AccountVerifyEmailForm';
import { ROLES } from '../config/roles_list';
import HomePage from "./Pages/Landing page/HomePage";
import SignUpCard from "./components/authentications/SignUpCard"
import LoginCard from "./components/authentications/LoginCard"
import RequireAuth from './Pages/Auth/features/RequireAuth';
import userAtom from './atoms/userAtom';
import AboutPage from './Pages/AboutPage';
import DashboardPage from './Pages/Dashboard/DashboardPage';
import CompanySignUp from './components/authentications/CompanySignUp';
import CompanyLogin from './components/authentications/CompanyLogin';



function App() {
  // const user = userAtom
  return (
    <>
      <Routes>
        
        <Route path="/auth/google-verify" element={<GoogleAuth />} />
        <Route path="/confirm-email" element={<AccountConfirmation />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/activate-verify" element={<AccountVerifyEmailForm />} />
        <Route path="/forget-password" element={<ForgetingPwd />} />
        <Route path="/activate-form" element={<VerifyEmailForm />} />
        <Route path="/dashboard" element={<DashboardPage />} />

        <Route
          element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}
        >
          <Route
            element={<RequireAuth allowedRoles={[...Object.values(ROLES.Admin, ROLES.Client)]} />}>
               
          </Route>
        </Route>
        {/* <Route path="/" element={<HomePage />} /> */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />

        <Route path="/signup" element={<SignUpCard />} />
        <Route path="/companysignup" element={<CompanySignUp />} />
        <Route path="/login" element={<LoginCard />} />
        <Route path="/companylogin" element={<CompanyLogin />} />
      </Routes>
    </>
  )
}

export default App
