import { Route, Routes } from "react-router-dom"; 
import AuthPage from "./pages/Auth/AuthPage";

import HomePage from "./Pages/Landing page/HomePage";
import SignUpCard from "./components/authentications/SignUpCard"
import LoginCard from "./components/authentications/LoginCard"
import GoogleAuth from './components/authentications/GoogleAuth';
import AccountConfirmation from './components/authentications/AccountConfirmation';



function App() {

  return (
    <>
      <Routes>
        <Route path="/auth/google-verify" element={<GoogleAuth />} />
        <Route path="/confirm-email" element={<AccountConfirmation />} />
        <Route path="/auth" element={<AuthPage />} />


        <Route path="/" element={<HomePage />} />
        <Route path= "/homepage" element={<HomePage />} />
  
        <Route path= "/signup" element={<SignUpCard />} />
        <Route path= "/login" element={<LoginCard />} />
        
        
        
      </Routes>
    </>
  )
}

export default App
