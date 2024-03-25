import Login from "./Pages/Login";
import OTP from "./Pages/OTP";
import Signup from "./Pages/Signup";
import {Route,Routes} from 'react-router-dom'


function App() {
  return (
    <div className="w-screen h-screen">      
        <Routes>
          <Route path="/login" element={<Login />}/>
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify-email" element={<OTP />} />
        </Routes>
    </div>
  );
}

export default App;
