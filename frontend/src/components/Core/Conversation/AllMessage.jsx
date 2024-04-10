import { useParams } from "react-router-dom";
import { apiConnector } from "../../../services/apiConnector";
import { Message } from "../../../services/apis";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { dateFormatter, timeFormatter } from "../../../Utils/dateAndTimeFormatter"
import { setConversationLoading } from "../../../slices/conversationSlice";


function AllMessage({conversation,setConversation,isTyping}){
    // console.log(isTyping);

    const {chatId,groupStatus} = useParams();
    const {token} = useSelector((state)=>state.auth);
    const {user} = useSelector((state)=>state.profile);
    const {conversationLoading} = useSelector((state)=>state.conversation);
    const dispatch = useDispatch();
    

    // console.log(groupStatus)

    useEffect(()=>{
        async function fetchConversation(){
            dispatch(setConversationLoading(true))
            try {
                const response = await apiConnector('GET',Message.fetchAllConversation,null,
                {
                    "Authorization" : 'Bearer' + token
                },{chatId:chatId}
                );
    
                if(!response.data.success)
                    throw new Error(response.data.message);
                // console.log(response.data.messageDetails);
                setConversation(response.data.messageDetails)


            } catch (error) {
                console.log(error)
            }
            dispatch(setConversationLoading(false))
        }

        async function fetchGroupConversation(){
            dispatch(setConversationLoading(true))
            try {
                const response = await apiConnector('GET',Message.fetchGroupConversation,null,
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
            dispatch(setConversationLoading(false))
        }

        groupStatus === 'true' ? fetchGroupConversation() : fetchConversation()
        

    },[chatId]);

    return(
        <div className="w-[calc(100vw-560px)] min-h-[calc(100vh-19.2rem)] max-h-[calc(100vh-19.2rem)] overflow-auto flex flex-col-reverse cursor-pointer">
            {
                isTyping?.show ? (
                    isTyping?.chatId === chatId ? (
                        isTyping.user._id !== user._id && (<div className="text-richblack-500 text-xs italic  w-fit p-2 rounded-full">{isTyping.user.name} is typing ...</div>)
                    ) :("")
                )
                :("")
            }
            <div className="">
                {
                    conversationLoading ?(<div className="min-h-[calc(100vh-19.2rem)] flex justify-center items-center ">
                        <div className="loader"></div>
                    </div>) 
                    : 
                        (conversation.length === 0 ?(<div className="flex justify-center items-center w-full">
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
                        ))
                }
            </div>
        </div>
    )
}

export default AllMessage;