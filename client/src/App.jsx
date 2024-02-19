import { Route, Routes } from "react-router-dom"; 
import HomePage from "./Pages/Landing page/HomePage";
import SignUpCard from "./components/authentications/SignUpCard"
import LoginCard from "./components/authentications/LoginCard"


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path= "/homepage" element={<HomePage />} />
  
        <Route path= "/signup" element={<SignUpCard />} />
        <Route path= "/login" element={<LoginCard />} />
        
        
        
      </Routes>
    </>
  )
}

export default App
