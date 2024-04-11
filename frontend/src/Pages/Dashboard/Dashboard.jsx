import ProfileSidebar from "../../components/Core/Profile/ProfileSidebar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";

function Dashboard(){
    const {user} = useSelector((state)=>state.profile)
    const location = useLocation();
    const navigate = useNavigate();

    return(
        <div className="w-full min-h-full flex flex-row ">
            <ProfileSidebar />
            
            <div className="w-[calc(100%-7%)] p-10 bg-black-900">
                <div className="text-white flex flex-row items-center justify-between">
                    <h2 className="text-4xl font-semibold items-center justify-between capitalize">{location.pathname.split('/').join(" ")}</h2>

                    <div className="flex gap-7">
                        <div className="font-semibold text-sm px-3 py-2 text-richblack-900 bg-yellow-50 rounded-lg cursor-pointer"
                        onClick={()=>navigate('/')}
                        >
                            Home
                        </div>

                        <div className="flex flex-row gap-7 items-center">

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