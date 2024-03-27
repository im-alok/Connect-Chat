import Login from "./Pages/Login";
import OTP from "./Pages/OTP";
import Signup from "./Pages/Signup";
import {Route,Routes} from 'react-router-dom'
import Navbar from "./components/Common/Navbar";


function App() {
  return (
    <div className="">
      <div >
        <Navbar />
      </div>
      <div className="w-screen h-[calc(100vh-4.9rem)] bg-richblack-900">      
        <Routes>
          <Route path="/login" element={<Login />}/>
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify-email" element={<OTP />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
