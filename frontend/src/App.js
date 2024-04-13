import Login from "./Pages/Login";
import OTP from "./Pages/OTP";
import Signup from "./Pages/Signup";
import {Navigate, Route,Routes} from 'react-router-dom'
import Navbar from "./components/Common/Navbar";
import OpenRoute from "./components/Common/OpenRoute";
import { useSelector } from "react-redux";
import Error from "./components/Common/Error";
import PrivateRoute from "./components/Common/PrivateRoute";
import Search from "./Pages/Search";
import ThankYouPage from "./components/Common/ThankYouPage";
import ChatPage from "./Pages/ChatPage";
import ConversationPage from "./Pages/CoversationPage";
import LandingPage from "./components/Common/landingPage";
import Dashboard from "./Pages/Dashboard/Dashboard";
import UserDetails from "./components/Core/Profile/Dashboard/UserDetails";
import Settings from "./Pages/Dashboard/Settings";
import Sidebar from "./components/Core/ChatPage/Sidebar";
import Groups from "./components/Core/ChatPage/Groups";
import Friends from "./components/Core/Profile/Friends";
import DashboardGroups from "./components/Core/Profile/Groups";
import FriendDetails from "./components/Core/Profile/Friends/FriendDetails";
import GroupDetails from "./components/Core/Profile/Group/GroupDetails";
import ForgotPassword from "./Pages/ForgetPassword";
import ResetPasswordPage from "./Pages/ResetPasswordPage";



function App() {
  const {signUpFormData} = useSelector((state)=>state.auth);

  return (
    <>
      <div className="">
        {/* <div >
          <Navbar />
        </div> */}
        <div className="w-screen min-h-screen bg-black-900 overflow-auto">      
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

            <Route path="/" element={<PrivateRoute><ChatPage /></PrivateRoute>}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/chat/:chatId/group/:groupStatus/user/:userId" element={<ConversationPage />}/>
            </Route>


            <Route path="/dashboard" element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }>
              <Route index element={<UserDetails />} />
              <Route path="/dashboard/settings" element={<Settings />} />
              <Route path="/dashboard/search" element={<Search fullScreen={true}/>} />
              <Route path="/dashboard/messages" element={<Sidebar fullScreen={true}/>} />

              <Route path="/dashboard/friends" element={<Friends />} />
              <Route path="/dashboard/groups" element={<DashboardGroups />} />
            </Route>

            <Route path="/friends/:friendId" element={<FriendDetails />} />
            <Route path="/groups/:groupId" element={<GroupDetails />} />
            <Route path="/send-reset-password-token" element={<ForgotPassword />} />
            <Route path="/reset-your-password/:token" element={<ResetPasswordPage />} />

            <Route path="/thankyou" element={<ThankYouPage />} />
            <Route path="*" element={<Error />} />
            
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
