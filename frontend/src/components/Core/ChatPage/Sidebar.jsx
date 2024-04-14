import { useEffect, useState } from "react";
import { menuLinks } from "../../../Utils/Data";
import Chats from "./Chats";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllChats } from "../../../services/Operations/chatOperation";
import Groups from "./Groups";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { IoIosArrowDropup } from "react-icons/io";
import { IoIosArrowDropdown } from "react-icons/io";
import { setShowChat } from "../../../slices/conversationSlice";

function Sidebar({fullScreen=false}){
    const [menu,setMenu] = useState('Chats');
    const [chatData,setChatData] = useState([]);
    const [groupData,setGroupData] = useState([]);
    const{render,token} = useSelector((state)=>state.auth);
    const {user} = useSelector((state)=>state.profile);
    const navigate = useNavigate();
    const [loading,setLoading] = useState(false);
    const location = useLocation();

    const {showChat} = useSelector((state)=>state.conversation);

    const {groupStatus} = useParams();
    const dispatch = useDispatch();
    
    useEffect(()=>{
        if(groupStatus === 'true')
            setMenu('Groups');
        else
            setMenu('Chats');
    },[location])

    useEffect(()=>{
        async function fetchChats(){
            setLoading(true);
            const response = await fetchAllChats(token);
            // console.log(response);
            if(response){
                const userChat = response.userChats.map((chat)=>(
                    {
                        ...chat,users:chat.users.filter((people)=>people._id!=user._id)
                    }
                ))
                // console.log(userChat);
                // console.log(response.userChats);
                setChatData(userChat);
                setGroupData(response.groupChats);
                setLoading(false);
            }
        }
        fetchChats();
    },[render])

    return(
        <div className="relative">
            <div className="m-1 sm:hidden w-[95%] mx-auto flex items-center justify-center bg-orange-200 min-h-[40px] rounded-full gap-2 font-semibold cursor-pointer"
            onClick={()=>dispatch(setShowChat(!showChat))}
            >
                show Chats
                {
                    showChat ?  (<IoIosArrowDropdown 
                    className="font-semibold"
                    />) : (<div className="font-bold"><IoIosArrowDropup /></div>)
                }
            </div>
            
            <div className={`min-w-[100vw] sm:min-w-[400px]   bg-orange-200 mt-1 sm:mt-4 sm:m-4 border-2 border-r-richblack-900 flex-col gap-2 mr-0 ${showChat ? "flex absolute sm:static" : "hidden sm:flex"} ${fullScreen ? "h-[calc(100vh-9.5rem)]" : 'h-[calc(100vh-7.0rem)]'}`}
            >
                <div className={`fixed min-w-[100vw] sm:min-w-[400px] flex justify-around items-center p-3 bg-richblack-800 shadow-[0px_0px_10px_5px] shadow-black ${fullScreen ? "w-[85.5%]" :""}`}>
                    {
                        menuLinks.map((link)=>(
                            <div key={link.id}
                            onClick={()=>{setMenu(link.name)
                            // navigate('/');
                            }}
                            className={`text-lg font-semibold ${menu === link.name ? " underline text-yellow-50" : "text-richblack-25"} cursor-pointer`}
                            >
                                {link.name}
                            </div>
                        ))
                    }
                </div>

                <div className={`mt-20 overflow-auto `}>
                    {
                        menu === 'Chats' ? (<Chats data={chatData} loading={loading}/>) : menu === 'Groups'?(<Groups data={groupData} loading={loading}/>):("")
                    }
                </div>
            </div>
        </div>
    )
}

export default Sidebar