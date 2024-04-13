import ProfileSidebar from "../../components/Core/Profile/ProfileSidebar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";

function Dashboard(){
    const {user} = useSelector((state)=>state.profile)
    const location = useLocation();
    const navigate = useNavigate();

    return(
        <div className="w-full min-h-full flex flex-col sm:flex-row ">
            <ProfileSidebar />
            
            <div className="w-full sm:w-[calc(100%-7%)] p-2  sm:p-10 bg-black-900">
                <div className="sm:mt-0 mt-5 text-white flex flex-row items-center justify-between">
                    <h2 className="sm:text-4xl font-semibold items-center justify-between capitalize text-xl ">{location.pathname.split('/').join(" ")}</h2>

                    <div className="flex gap-5 sm:gap-7">
                        <div className="font-semibold text-sm sm:px-3 px-2 sm:py-2 flex justify-center items-center text-richblack-900 bg-yellow-50 rounded-lg cursor-pointer"
                        onClick={()=>navigate('/')}
                        >
                            Home
                        </div>

                        <div className="flex flex-row gap-4 sm:gap-7 items-center">

                            {/* <FaBell 
                            className="cursor-pointer"
                            /> */}
                            <FaSearch
                            className="cursor-pointer"
                            onClick={()=>navigate('/dashboard/search')}
                            />
                            <div className="cursor-pointer">
                                <img 
                                src={user.profilepic}
                                className="w-[30px] h-[30px] object-cover rounded-full cursor-pointer"
                                onClick={()=>navigate('/dashboard')}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <Outlet />
            </div>
        </div>
    )
}

export default Dashboard;