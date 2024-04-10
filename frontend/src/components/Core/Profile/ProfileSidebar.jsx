import { useLocation } from "react-router-dom";
import { profileSideBarIcons } from "../../../Utils/Data";
import Icons from "./Icons";
import { useEffect, useState } from "react";

function ProfileSidebar(){

    return(
        <div className=" w-[7%] bg-black-600 rounded-t-[2rem]">
            <div className="flex flex-col items-center justify-between h-[720px] ">
                <div className="flex flex-col gap-24 mt-20">
                    <div className={`flex flex-col gap-8 `}>
                        {
                            profileSideBarIcons.map((icon)=>(
                                icon.id <=3 && <Icons key={icon.id} iconData={icon}  />
                            ))
                        }
                    </div>

                    <div className="flex flex-col gap-8 mb-7">
                        {
                            profileSideBarIcons.map((icon)=>(
                                icon.id >=4 && icon.id <=5 && <Icons key={icon.id} iconData={icon}/>
                            ))
                        }
                    </div>
                </div>

                <div className="mb-5">
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