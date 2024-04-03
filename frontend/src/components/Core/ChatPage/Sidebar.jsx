import { useEffect, useState } from "react";
import { menuLinks } from "../../../Utils/Data";
import Chats from "./Chats";
import { useSelector } from "react-redux";
import { fetchAllChats } from "../../../services/Operations/chatOperation";
import Groups from "./Groups";
import { useParams } from "react-router-dom";

function Sidebar(){
    const [menu,setMenu] = useState('Chats');
    const [chatData,setChatData] = useState([]);
    const [groupData,setGroupData] = useState([]);
    const{render,token} = useSelector((state)=>state.auth);
    const {user} = useSelector((state)=>state.profile);
    useEffect(()=>{
        async function fetchChats(){
            const response = await fetchAllChats(token);
            // console.log(response);
            if(response){
                const userChat = response.userChats.map((chat)=>(
                    {
                        ...chat,users:chat.users.filter((people)=>people._id!=user._id)
                    }
                ))
                console.log(userChat);
                // console.log(response.userChats);
                setChatData(userChat);
                setGroupData(response.groupChats);
            }
        }
        fetchChats();
    },[render])

    return(
        <div className="min-w-[400px] min-h-[calc(100vh-7.0rem)] bg-orange-200 m-4 border-2 border-r-richblack-900 flex flex-col gap-2 mr-0"
        >
            <div className="flex justify-around items-center p-3 bg-richblack-800 shadow-[0px_0px_10px_5px] shadow-black">
                {
                    menuLinks.map((link)=>(
                        <div key={link.id}
                        onClick={()=>setMenu(link.name)}
                        className={`text-lg font-semibold ${menu === link.name ? " underline text-yellow-50" : "text-richblack-25"} cursor-pointer`}
                        >
                            {link.name}
                        </div>
                    ))
                }
            </div>

            {
                menu === 'Chats' ? (<Chats data={chatData}/>) : menu === 'Groups'?(<Groups data={groupData}/>):("")
            }
        </div>
    )
}

export default Sidebar