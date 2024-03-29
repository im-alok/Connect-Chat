import Login from "./Pages/Login";
import OTP from "./Pages/OTP";
import Signup from "./Pages/Signup";
import {Navigate, Route,Routes} from 'react-router-dom'
import Navbar from "./components/Common/Navbar";
import OpenRoute from "./components/Common/OpenRoute";
import { useSelector } from "react-redux";
import Error from "./components/Common/Error";


function App() {
  const {signUpFormData} = useSelector((state)=>state.auth);
  return (
    <div className="">
      <div >
        <Navbar />
      </div>
      <div className="w-screen h-[calc(100vh-4.9rem)] bg-richblack-900">      
        <Routes>
          <Route path="/login" element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }/>

          <Route path="/signup" element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          } />

          <Route path="/verify-email" element={
            <OpenRoute>
              {
                signUpFormData ? (<OTP />) : (<Navigate to={'/signup'} />)
              }
            </OpenRoute>
          } />


          <Route path="*" element={<Error/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
