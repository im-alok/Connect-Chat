import { useLocation, useParams } from "react-router-dom";
import { apiConnector } from "../../../services/apiConnector";
import { Message } from "../../../services/apis";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { dateFormatter, timeFormatter } from "../../../Utils/dateAndTimeFormatter"


function AllMessage(){

    const {chatId} = useParams();
    const {token} = useSelector((state)=>state.auth);
    const  [conversation,setConversation] = useState([]);
    const location = useLocation();
    const {user} = useSelector((state)=>state.profile);

    useEffect(()=>{
        async function fetchConversation(){
            try {
                const response = await apiConnector('GET',Message.fetchAllConversation,null,
                {
                    "Authorization" : 'Bearer' + token
                },{chatId:chatId}
                );
    
                if(!response.data.success)
                    throw new Error(response.data.message);
                console.log(response.data.messageDetails);
                setConversation(response.data.messageDetails)
            } catch (error) {
                console.log(error)
            }
        }
        fetchConversation();
    },[chatId,location.pathname]);

    return(
        <div className="w-[calc(100vw-560px)] min-h-[calc(100vh-19.2rem)] max-h-[calc(100vh-19.2rem)] overflow-auto flex flex-col-reverse">
            <div className="">
                {
                    conversation.length === 0 ?(<div className="flex justify-center items-center w-full">
                        <div className="text-2xl font-medium text-richblack-200 self-center">Send Message to start the conversation</div>
                    </div>)
                    :(
                        <div
                        className="flex flex-col gap-7 "
                        >
                            {
                                conversation.map((convo,index)=>(
                                    <div key={index}
                                    className={`flex items-center gap-2 text-richblack-25 ${user._id === convo.senderId._id ? "flex-row-reverse" :""}`}
                                    >
                                        <img 
                                        src={convo.senderId.profilepic}
                                        loading="lazy"
                                        className="w-[30px] h-[30px] object-cover rounded-full"
                                        />

                                        <div className="flex flex-col ">
                                            <p className={`${user._id === convo.senderId._id ? "bg-[#02630a] text-richblack-25" :"bg-richblack-600 text-richblack-25"}   rounded-xl  py-1 px-3 font-[500] h-fit w-fit max-w-[450px] break-words`}>{convo.message}</p>
                                            <p className={`text-[8px] text-richblack-300 font-semibold self-center`}>{dateFormatter(convo.createdAt)} | {timeFormatter(convo.createdAt)}</p>
                                        </div>

                                    </div>
                                ))
                            }
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default AllMessage;