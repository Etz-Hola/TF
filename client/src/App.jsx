import { Route, Routes } from "react-router-dom"; 
import HomePage from "./Pages/Landing page/HomePage";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path= "/" element={<Homepage />} />
        <Route path= "/signup" element={<Signup />} />
        <Route path= "/login" element={<Login />} />
        
        
        
      </Routes>
    </>
  )
}

export default App
