import { useState } from 'react';
import * as md from 'react-icons/md'
import {useLocation, useNavigate} from 'react-router-dom'

function Icons({iconData}){
    const Icon = md[iconData.icon];
    const navigate = useNavigate();
    const [active,setActive] = useState(null);

    const location = useLocation();

    const activeIcon = location.pathname.split('/')[2];
    // console.log(activeIcon,iconData.name)


    return(
        <div
        className='relative group cursor-pointer text-white text-2xl font-semibold flex flex-col items-center'
        onClick={()=>navigate(iconData.link)}
        >
            <div className={`hover:text-orange-200 ${activeIcon === iconData.name.toLowerCase() ? "text-orange-200":""}`}
            onClick={()=>setActive(iconData.name)}
            >
                <Icon />
            </div>
            <p className='bg-gradient-to-r from-[#0052D4] via-[#65C7F7] to-[#9CECFB] text-transparent bg-clip-text text-xs sm:font-bold sm:absolute sm:top-1 sm:left-10 hidden group-hover:flex'>{iconData.name}</p>
        </div>
    )
}

export default Icons