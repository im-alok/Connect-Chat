import { MdVideoCall } from "react-icons/md";
import { IoCallSharp } from "react-icons/io5";
import SendMessage from "../components/Core/Conversation/SendMessage";
import AllMessage from "../components/Core/Conversation/AllMessage";
import { useEffect, useState } from "react";
import { socketConnection } from "../Utils/SocketConnection";
import { setNotificationDetails, setSocketConnected } from "../slices/conversationSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setRender } from "../slices/authSlice";
import { findFriendDetails, getGroupDetails } from "../services/Operations/userOperation";

var socket = socketConnection();
var selectedChatCompare;
function ConversationPage(){
    const  [conversation,setConversation] = useState([]);
    const {user} = useSelector((state)=>state.profile);
    const dispatch = useDispatch();
    const {chatId,groupStatus,userId} = useParams();
    const [isTyping,setIsTyping] = useState({});
    const {notificationDetails} = useSelector((state)=>state.conversation)
    const {token} = useSelector((state)=>state.auth);
    const navigate = useNavigate();

    selectedChatCompare= chatId;

    // console.log(userId)

    //connecting to the socket
    useEffect(()=>{
        socket.emit('setup',user);
        socket.on('connected',()=>dispatch(setSocketConnected(true)));
    },[]);

    //joining the room
    useEffect(()=>{
        socket.emit('join chat',chatId);
        
    });

    useEffect(()=>{
        socket.on("Typing",(data)=>setIsTyping(
            (p)=>({...p,show:true,chatId:chatId,user:data})
        ));
        socket.on("Stop typing",(data)=>setIsTyping(
            (p)=>({...p,show:false,chatId:chatId,user:data}
        )));
    },[])


    //receiving the message
    useEffect(()=>{
        socket.on("message received",(newMessageReceived)=>{
            if(!selectedChatCompare || selectedChatCompare !== newMessageReceived.chat._id){
                //give notification
                if(!notificationDetails.includes(newMessageReceived.deliverMessage)){
                    let notification =newMessageReceived
                    dispatch(setNotificationDetails(notification));
                    dispatch(setRender());
                    // console.log(notification);

                }
                console.log("hii");
                console.log(newMessageReceived.deliverMessage);

            }
            else{
                const message = [...conversation]
                setConversation(message);
                // console.log(message);
            }
        })
    })


    const [Data,setData] = useState({});
    useEffect(()=>{
        async function apiGroupCall(){
            const response = await getGroupDetails(token,chatId);
            if(response)
                setData(response)

        }
        async function apiCall(){
            const response = await findFriendDetails(token,userId);
            if(response)
                setData(response)

        }
        groupStatus === 'true' ? (apiGroupCall()) : (apiCall())
        // console.log(Data)
    },[chatId]);


    return(
        <div className="w-[calc(100vw-450px)] min-h-[calc(100vh-7.0rem)] bg-richblack-800 m-4 border-2 border-r-richblack-900 flex flex-col gap-2">

            <div className="flex justify-between items-center p-3 bg-richblack-800 shadow-[0px_0px_10px_5px] shadow-black">
                <div className="flex flex-1 flex-row gap-2 items-center cursor-pointer"
                onClick={()=>groupStatus === 'true' ? (navigate(`/groups/${chatId}`)) : (navigate(`/friends/${Data?.userDetails?._id}`))}
                >
                    <img 
                    src={Data.profilepic || Data?.userDetails?.profilepic}
                    className="w-[30px] h-[30px] rounded-full"
                    />
                    <p className="text-richblack-25 font-medium">{Data.groupName || Data?.userDetails?.name} </p>
                </div>
                <div className="flex gap-5  text-2xl font-bold text-richblack-25 ">
                    <div className="cursor-pointer"><IoCallSharp /></div>
                    <div className="cursor-pointer"><MdVideoCall /></div>

                </div>
            </div>
            <div className="p-5 ">
                <AllMessage conversation={conversation} setConversation={setConversation} isTyping={isTyping}/>
            </div>
            <SendMessage conversation={conversation} setConversation={setConversation} />

        </div>
    )
}

export default ConversationPage;