import { useNavigate } from "react-router-dom";
import { setShowChat } from "../../../../slices/conversationSlice";
import { useDispatch } from "react-redux";


function SideBarUsers({data,active,setActive}){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    

    return (
        <div
            className={`flex gap-2 items-center cursor-pointer p-2 hover:bg-[#f29a2e] py-3 rounded-md ${active === data._id ? "shadow-[0px_0px_2px_2px] shadow-pink-800":""}`}
            onClick={()=>{
            setActive(data._id)
            navigate(`/chat/${data._id}/group/${false}/user/${data.users[0]._id}`)
            dispatch(setShowChat(false))
            }}  >
                <img 
                src={data.users[0].profilepic}
                className="w-[60px] h-[60px] object-cover rounded-full"/>

                <div className="">
                    <p className="text-lg font-semibold">{data.users[0].name}</p>
                    <p className="text-sm text-semibold text-richblack-700">{data?.latestMessage?.message ? (data?.latestMessage?.message.slice(0,20) + '...'):("Click to start the conversation")}</p>
                </div>
        </div>
    )
}

export default SideBarUsers;