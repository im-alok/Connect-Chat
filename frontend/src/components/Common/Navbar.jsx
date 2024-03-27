import { useNavigate } from "react-router-dom";
import ButtonIcon from "./ButtonIcon";

function Navbar(){
    const navigate = useNavigate();
    return(
        <div className="flex justify-between w-screen min-h-[4.9rem] bg-orange-200 sm:px-10 px-2 border-b-2 border-richblack-900">
            <div className="flex flex-row gap-1 items-center">
                <p className="hidden sm:flex sm:text-6xl">&#169;</p>
                <div className="font-bold text-xl sm:text-3xl text-richblack-900">Connect Chat</div>
            </div>

            <div className="flex gap-2 items-center">
                <ButtonIcon 
                text={'Login'}
                onclick={()=>navigate('/login')}
                type={'button'}
                />

                <ButtonIcon 
                text={'Sign up'}
                onclick={()=>navigate('/signup')}
                type={'button'}
                />
            </div>
        </div>
    )
}

export default Navbar;