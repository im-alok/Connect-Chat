import { useNavigate } from "react-router-dom";
import ButtonIcon from "./ButtonIcon";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { setToken } from "../../slices/authSlice";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import Search from "../../Pages/Search";

function Navbar(){
    const navigate = useNavigate();
    const {token} = useSelector((state)=>state.auth)
    const dispatch = useDispatch();
    const [openSearchMenu,setOpenSearchMenu] = useState(false);

    function LogOutHandler(){
        dispatch(setToken(null));
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        toast.success('logout Successfully');
        navigate('/login');
    }

    return(
        <div className="flex justify-between w-screen min-h-[4.9rem] bg-orange-200 sm:px-10 px-2 border-b-2 border-richblack-900 items-center">

            {/* <div>
                {
                    token && (
                        <div className="flex gap-2 items-center font-extrabold cursor-pointer bg-richblack-25 p-2 rounded-full px-5 hover:bg-richblack-500"
                        onClick={()=>setOpenSearchMenu(true)}
                        >
                            <p>Find Friends</p>
                            <FaSearch />
                        </div>
                    )
                }
            </div> */}


            <div className="flex flex-row gap-1 items-center">
                <p className="hidden sm:flex sm:text-6xl">&#169;</p>
                <div className="font-bold text-xl sm:text-3xl text-richblack-900">Connect Chat</div>
            </div>

            <div className="flex gap-2 items-center">
                {
                    !token && (<ButtonIcon 
                    text={'Login'}
                    onclick={()=>navigate('/login')}
                    type={'button'}
                    />)
                }

                {
                    !token && (<ButtonIcon 
                    text={'Sign up'}
                    onclick={()=>navigate('/signup')}
                    type={'button'}
                    />)
                }
                {
                    token && (<ButtonIcon 
                    text={'Dashboard'}
                    onclick={()=>navigate('/dashboard')}
                    type={'button'}
                    />)
                }
                {
                    token && (<ButtonIcon 
                    text={'Logout'}
                    onclick={()=>LogOutHandler()}
                    type={'button'}
                    />)
                }
            </div>

            {
                openSearchMenu && (<Search setOpenSearchMenu={setOpenSearchMenu}/>)
            }
        </div>
    )
}

export default Navbar;