import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CreateGroupPage from "./CreateGroupPage";
import { useDispatch, useSelector } from "react-redux";
import { setConversationLoading, setShowChat, setShowCreateGroupField } from "../../../slices/conversationSlice";
import { getGroupDetails } from "../../../services/Operations/userOperation";

function Groups({data,loading}){
    // console.log(data);
    const {chatId} = useParams();
    const [active,setActive] = useState(chatId);
    const navigate = useNavigate();
    const {showCreateGroupField} = useSelector((state)=>state.conversation);
    const dispatch = useDispatch();
   

    return(
        <div className="p-2 flex flex-col gap-7">
            {/* createGroup */}

            <div className="flex items-center justify-center w-full bg-caribbeangreen-900 py-3 rounded-md text-semibold text-lg hover:bg-caribbeangreen-700 active:scale-95 text-richblack-5 font-semibold"
            onClick={()=>dispatch(setShowCreateGroupField(true))}
            >
                <button>
                    Create Group
                </button>
            </div>

            {/* All groups */}
            {
                loading ? (
                    <div className="flex justify-center items-center h-[250px]">
                        <div className="spinner "></div>
                    </div>
                )
                :(
                    data.length === 0 ? (<div className="text-xl text-richblack-900 font-semibold">No groups found, Create by clicking on 👆 button</div>)
                    :(
                        <div className="flex flex-col gap-5 ">
                            {
                                data.map((group,index)=>(
                                    <div key={index}
                                    className={`flex gap-2 items-center cursor-pointer p-2 hover:bg-[#f29a2e] py-3 rounded-md ${active === group._id ? "shadow-[0px_0px_2px_2px] shadow-pink-800":""}`}
                                    onClick={()=>{
                                        setActive(group._id)
                                        navigate(`/chat/${group._id}/group/${true}/user/${null}`)
                                        dispatch(setShowChat(false))
                                    }}  
                                    >
                                        <img 
                                        src={group?.profilepic}
                                        className="w-[60px] h-[60px] object-cover rounded-full"
                                        />
                                        <div className="">
                                            <p className="text-lg font-semibold">{group.groupName}</p>
                                            <p className="text-sm text-semibold text-richblack-700">{group?.latestMessage?.message ? (group?.latestMessage?.message.slice(0,20) + '...'):("Click to start the conversation")}</p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    )
                )
            }

            {
                showCreateGroupField && (<CreateGroupPage isEdit={false}/>)
            }
        </div>
    )
}

export default Groups;