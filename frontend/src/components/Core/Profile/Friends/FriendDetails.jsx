import { useLocation, useNavigate, useParams } from "react-router-dom";
import ProfileSidebar from "../ProfileSidebar";
import { useEffect, useState } from "react";
import { findFriendDetails } from "../../../../services/Operations/userOperation";
import { useDispatch, useSelector } from "react-redux";
import { FaBell } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { MdOutlinePerson } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiSolidMessageAdd } from "react-icons/bi";
import { createChat } from "../../../../services/Operations/chatOperation";
import { dateFormatter } from "../../../../Utils/dateAndTimeFormatter";

function FriendDetails(){

    const [details,setDetails] = useState({});
    const [chats,setChats] = useState([]);
    const {friendId} = useParams();
    const {token } = useSelector((state)=>state.auth);
    const {user} = useSelector((state)=>state.profile);
    // console.log(friendId);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading,setLoading] = useState(false);

    useEffect(()=>{

        async function getFriendsDetails(){
            setLoading(true);
            const response = await findFriendDetails(token,friendId);
            if(response){
                setDetails(response.userDetails);
                const userChats = response.userChat.map((chat)=>(
                    {
                        ...chat,users:chat.users.filter((people)=>people._id!=friendId)
                    }
                ))
                // console.log(response)
                setChats(userChats);
            }
            // console.log(details,chats)
            setLoading(false);
        }

        getFriendsDetails();
    },[])

    async function messageHandler(id){
        const response = await createChat(id,token,dispatch);
        if(response){
            navigate(`/chat/${response._id}/group/false/user/${id}`);
        }
    }

    return (
        <div className="flex flex-col sm:flex-row gap-2 ">
            <ProfileSidebar />
            <div className="p-2 sm:p-10 w-full flex flex-col gap-5">
                <div className="text-white flex flex-row items-center justify-between">
                    <h2 className="sm:text-4xl text-2xl font-semibold items-center justify-between capitalize">Friend Details</h2>

                    <div className="flex gap-5 sm:gap-7">
                        <div className="font-semibold text-sm sm:px-3 px-2 sm:py-2 flex justify-center items-center text-richblack-900 bg-yellow-50 rounded-lg cursor-pointer"
                        onClick={()=>navigate('/')}
                        >
                            Home
                        </div>

                        <div className="flex flex-row gap-4 sm:gap-7 items-center">

                            {/* <FaBell 
                            className="cursor-pointer"
                            /> */}
                            <FaSearch
                            className="cursor-pointer"
                            onClick={()=>navigate('/dashboard/search')}
                            />
                            <div className="cursor-pointer">
                                <img 
                                src={user.profilepic}
                                className="w-[30px] h-[30px] object-cover rounded-full cursor-pointer"
                                onClick={()=>navigate('/dashboard')}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {
                    loading ? (<div className="loaderl mx-auto"></div>)
                    :(
                        <div className="sm:mt-0 mt-5 sm:p-10 flex flex-col gap-10 sm:w-full items-center sm:items-start">
                        {/* images and name */}
                            <div className="flex flex-col sm:flex-row gap-10 items-center">
                                <img 
                                src={details.profilepic}
                                className="w-[200px] h-[200px] object-cover rounded-2xl"
                                />

                                <div className="text-white flex flex-col gap-4">
                                    <p className="text-2xl text-center sm:text-3xl font-semibold">{details.name} <span>/ {details.username}</span></p>
                                    <p className="text-lg sm:text-xl text-richblack-500 text-center">{details.email}</p>
                                    <div className="flex items-center gap-2 bg-yellow-50 w-fit px-3 py-2 rounded-md text-richblack-900 cursor-pointer sm:self-start self-center"
                                    onClick={()=>{messageHandler(details._id)}}
                                    >
                                        Message
                                        <BiSolidMessageAdd />
                                    </div>
                                </div>
                            </div>
                        {/* additional details */}
                            <div className="w-full sm:h-[50px] h-fit bg-black-600 flex items-center justify-between p-5 flex-col sm:flex-row gap-5 sm:gap-0">
                                <div className="flex gap-2 text-white items-center">
                                    <MdDateRange />
                                    <p>{dateFormatter(details?.additionalDetails?.dob )|| "N/A"} </p>
                                </div>

                                <div className="flex gap-2 text-white items-center">
                                    <div className={`w-[10px] h-[10px] rounded-full ${details.status ? "bg-[#0ffc03]" :"bg-[#cc0a24]"}`}>{details?.status}</div>
                                    <p>{details?.status?'online':'offline' || "N/A"} </p>
                                </div>

                                <div className="flex gap-2 text-white items-center">
                                    <FaPhoneAlt />
                                    <p>{details?.additionalDetails?.phoneno || "N/A"} </p>
                                </div>

                                <div className="flex gap-2 text-white items-center">
                                    <MdOutlinePerson />
                                    <p>{details?.additionalDetails?.gender || "N/A"} </p>
                                </div>
                            </div>

                        {/* Friends */}

                        <div className="sm:mt-7 flex flex-col sm:gap-10 gap-5 w-full">
                            <h2 className="text-3xl text-white">Conversations</h2>
                            {
                                chats.map((chat)=>(
                                    <div className="bg-orange-200 sm:p-5 py-2 rounded-xl flex-col flex sm:flex-row justify-between items-center w-full">
                                        <div className="flex flex-row gap-3 items-center">
                                            <img 
                                            src={chat.users[0].profilepic}
                                            className="w-[70px] h-[70px] rounded-full "
                                            />
                                            <div className="sm:font-bold font-semibold">
                                                <p className="sm:text-base text-sm text-black-900">
                                                    {
                                                        user._id === chat.users[0]._id ? ('You'):(<div>
                                                            {chat.users[0].name} <span className="hidden sm:inline-block">/ {chat.users[0].username}</span>
                                                        </div>)
                                                    }
                                                </p>
                                                <p className="text-black-900">{chat.users[0].email.length > 21 ? (chat.users[0].email.slice(0,21) + '...') : (chat.users[0].email)}</p>
                                            </div>
                                        </div>
                                        {
                                            user._id != chat.users[0]._id
                                            && (
                                                <div className="text-2xl font-semibold cursor-pointer bg-yellow-50 p-2 sm:p-5 rounded-full hover:bg-pink-300 self-end"
                                                onClick={()=>{messageHandler(chat.users[0]._id)}}
                                                >
                                                    <BiSolidMessageAdd />
                                                </div>
                                            )
                                        }
                                    </div>
                                ))
                            }
                        </div>

                        </div>
                    )
                }
            </div>
        </div>
    )
    
}

export default FriendDetails;