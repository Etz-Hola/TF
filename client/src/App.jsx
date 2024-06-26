import { React, useState } from "react";
import { Route, Routes } from "react-router-dom";
import AuthPage from "./Pages/Auth/AuthPage";
import "./index.css";
import ForgetingPwd from "./components/authentications/ForgetingPwd";
import VerifyEmailForm from "./components/authentications/VerifyEmailForm";
import GoogleAuth from "./components/authentications/GoogleAuth";
import AccountConfirmation from "./components/authentications/AccountConfirmation";
import AccountVerifyEmailForm from "./components/authentications/AccountVerifyEmailForm";
import CompanyAccountVerifyEmailForm from "./components/authentications/CompanyAccountVerifyEmailForm";
import { ROLES } from "../config/roles_list";
import HomePage from "./Pages/Landing page/HomePage";
import ProfilePage from "./Pages/Profile/ProfilePage";
import SignUpCard from "./components/authentications/SignUpCard";
import LoginCard from "./components/authentications/LoginCard";
import RequireAuth from "./Pages/Auth/features/RequireAuth";
import userAtom from "./atoms/userAtom";
import AboutPage from "./Pages/AboutPage";
import DashboardPage from "./Pages/Dashboard/DashboardPage";
import CompanySignUp from "./components/authentications/CompanySignUp";
import CompanyLogin from "./components/authentications/CompanyLogin";
import TrainUpload from "./Pages/Train/components/TrainUpload";
import CompanyProfile from "./Pages/Train/pages/CompanyProfile";
// import SearchTrainPage from './Pages/Search train/Pages/SearchTrainPage';
import TrainSearchContainer from "./Pages/Search train/components/TrainSearchContainer ";
import TicketBooking from "./Pages/TicketManagement/TicketBooking";
import BookedTickets from "./components/TicketManagement/BookedTickets";
import TrainDetails from "./Pages/Search train/components/TrainDetails";
import TicketList from "./components/TicketManagement/TicketList";

function App() {
  // const user = userAtom
  return (
    <>
      <Routes>
        <Route path="/auth/google-verify" element={<GoogleAuth />} />
        <Route path="/confirm-email" element={<AccountConfirmation />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/activate-verify" element={<AccountVerifyEmailForm />} />
        <Route
          path="/activateCompany-verify"
          element={<CompanyAccountVerifyEmailForm />}
        />
        <Route path="/forget-password" element={<ForgetingPwd />} />
        <Route path="/activate-form" element={<VerifyEmailForm />} />
        <Route path="/dashboard" element={<DashboardPage />}>
          <Route path="profile" element={<TicketList />} />
        </Route>
      

        <Route
          element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}
        >
          <Route
            element={
              <RequireAuth
                allowedRoles={[...Object.values(ROLES.Admin, ROLES.Client)]}
              />
            }
          ></Route>
          {/* <Route path="/" element={<HomePage />} /> */}
          <Route path="/" element={<HomePage />} />
          <Route path="profile/:userId" element={<ProfilePage />} />
          <Route path="profile/:userId" element={<TrainDetails />} />

          <Route path="/about" element={<AboutPage />} />
          <Route path="/data" element={<CompanyProfile />} />
          {/* <Route path="/search/Train" element={<SearchTrainPage />} /> */}
          <Route path="/search/Train" element={<TrainSearchContainer />} />
          <Route path="/trains/:trainId/book" element={<TicketBooking />} />
          <Route path="/trains/:userId/booked" element={<BookedTickets />} />
          <Route path="company">
            <Route path="upload" element={<TrainUpload />} />
          </Route>
        </Route>
        <Route path="/signup" element={<SignUpCard />} />
        <Route path="/companysignup" element={<CompanySignUp />} />
        <Route path="/login" element={<LoginCard />} />
        <Route path="/companylogin" element={<CompanyLogin />} />
      </Routes>
    </>
  );
}

export default App;
