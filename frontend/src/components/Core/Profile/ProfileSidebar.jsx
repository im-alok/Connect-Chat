import { useLocation } from "react-router-dom";
import { profileSideBarIcons } from "../../../Utils/Data";
import Icons from "./Icons";
import { useEffect, useState } from "react";

function ProfileSidebar(){

    return(
        <div className=" sm:w-[7%] bg-black-600 rounded-t-[2rem]">
            <div className="flex flex-row sm:flex-col items-center justify-between sm:h-[710px] sm:p-0 p-5 ">
                <div className="flex flex-row sm:flex-col gap-8 sm:gap-24 sm:mt-20 items-center">
                    <div className={`flex flex-row sm:flex-col gap-8 `}>
                        {
                            profileSideBarIcons.map((icon)=>(
                                icon.id <=3 && <Icons key={icon.id} iconData={icon}  />
                            ))
                        }
                    </div>

                    <div className="flex flex-row sm:flex-col gap-8 sm:mb-7 items-center">
                        {
                            profileSideBarIcons.map((icon)=>(
                                icon.id >=4 && icon.id <=5 && <Icons key={icon.id} iconData={icon}/>
                            ))
                        }
                    </div>
                </div>

                <div className="sm:mb-5">
                    {
                        profileSideBarIcons.map((icon)=>(
                            icon.id >=6 && <Icons key={icon.id} iconData={icon}  />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}


export default ProfileSidebar;