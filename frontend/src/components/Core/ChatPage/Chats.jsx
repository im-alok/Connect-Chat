import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { setConversationLoading } from "../../../slices/conversationSlice";
import { useDispatch } from "react-redux";
import SideBarUsers from "./SideBar/SideBarUsers";

function Chats({data,loading}){
    // console.log(data);
    const {chatId} = useParams();
    const [active,setActive] = useState(chatId);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // console.log(active)
    
    useEffect(()=>{
        setActive(chatId)
    },[chatId])
    return(
        <div className="p-2">
            {
                loading ? (<div className="flex justify-center items-center h-[250px]">
                    <div className="spinner "></div>
                </div>):
                (
                    <div className="flex flex-col gap-5 ">
                    {
                        data.length === 0 ? (<div className="text-center font-semibold text-2xl">
                            <p>Connect with peoples</p>
                            <p className="text-richblack-700 text-sm">To find friend click on <i>search button</i> 👆</p>
                        </div>)
                        :
                        (
                            data.map((people,index)=>(
                                <SideBarUsers data={people} active={active} setActive={setActive} key={index}/>
                            ))
                        )
                    }
                    </div>
                )
            }
        </div>
    )
}

export default Chats;