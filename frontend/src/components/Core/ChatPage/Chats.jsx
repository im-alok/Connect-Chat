import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Chats({data}){
    // console.log(data);
    const [active,setActive] = useState();
    const navigate = useNavigate();
    const {chatId} = useParams();
    
    useEffect(()=>{
        setActive(chatId)
    },[chatId])
    return(
        <div className="p-2">
            <div className="flex flex-col gap-5 ">
                {
                    data.length === 0 ? (<div className="text-center font-semibold text-2xl">
                        <p>Connect with peoples</p>
                        <p className="text-richblack-700 text-sm">To find friend click on <i>search button</i> 👆</p>
                    </div>)
                    :
                    (
                        data.map((people,index)=>(
                            <div key={index}
                            className={`flex gap-2 items-center cursor-pointer p-2 hover:bg-[#f29a2e] py-3 rounded-md ${active === people._id ? "shadow-[0px_0px_2px_2px] shadow-pink-800":""}`}
                            onClick={()=>{
                                setActive(people._id)
                                navigate(`/chat/${people._id}`)
                            }}  
                            >
                                <img 
                                src={people.users[0].profilepic}
                                className="w-[60px] h-[60px] object-cover rounded-full"
                                />
                                <div className="">
                                    <p className="text-lg font-semibold">{people.users[0].name}</p>
                                    <p className="text-sm text-semibold text-richblack-700">{people?.latestMessage?.message ? (people?.latestMessage?.message):("Click to start the conversation")}</p>
                                </div>
                            </div>
                        ))
                    )
                }
            </div>
        </div>
    )
}

export default Chats;