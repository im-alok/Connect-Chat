import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Chats({data}){
    console.log(data);
    const [active,setActive] = useState();
    const navigate = useNavigate();
    return(
        <div className="p-2">
            <div className="flex flex-col gap-5 ">
                {
                    data.map((people,index)=>(
                        <div key={index}
                        className={`flex gap-2 items-center cursor-pointer p-2 hover:bg-[#f29a2e] py-3 rounded-md ${active === people._id ? "shadow-[0px_0px_2px_2px] shadow-pink-800":""}`}
                        onClick={()=>{
                            setActive(people._id)
                            navigate(`/chat/${people.friendId._id}`)
                        }}  
                        >
                            <img 
                            src={people.friendId.profilepic}
                            className="w-[60px] h-[60px] object-cover rounded-full"
                            />
                            <div className="">
                                <p className="text-lg font-semibold">{people.friendId.name}</p>
                                <p className="text-sm text-semibold text-richblack-700">{people.latestMessage ? (people.latestMessage):("Click to start the conversation")}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Chats;