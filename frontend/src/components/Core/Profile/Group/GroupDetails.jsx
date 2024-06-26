import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getGroupDetails } from "../../../../services/Operations/userOperation";
import { useEffect, useState } from "react";
import ProfileSidebar from "../ProfileSidebar";
import { FaSearch } from "react-icons/fa";
import { dateFormatter } from "../../../../Utils/dateAndTimeFormatter";
import { BiSolidMessageAdd } from "react-icons/bi";
import { createChat } from "../../../../services/Operations/chatOperation";
import {  BsThreeDotsVertical } from "react-icons/bs";
import CreateGroupPage from "../../ChatPage/CreateGroupPage";
import { setShowCreateGroupField } from "../../../../slices/conversationSlice";

function GroupDetails(){
    const [loading,setLoading] = useState(false);
    
    const {showCreateGroupField} = useSelector((state)=>state.conversation);

    const {groupId} = useParams();
    const {token} = useSelector((state)=>state.auth);
    const [groupDetails,setGroupDetails] = useState({});
    const dispatch = useDispatch();

    const {user} = useSelector((state)=>state.profile);
    const userDetails = user;
    const navigate = useNavigate();
    useEffect(()=>{
        async function GroupDetail(){
            setLoading(true);
            const response = await getGroupDetails(token,groupId);
            if(response)
                setGroupDetails(response)
            
            setLoading(false);
        }
        GroupDetail();
    },[])

    async function messageHandler(id){
        const response = await createChat(id,token,dispatch);
        if(response){
            navigate(`/chat/${response._id}/group/false/user/${null}`);
        }
    }

    return(
        <div className="flex flex-col sm:flex-row gap-2 ">
            <ProfileSidebar />
            {
                loading ? (<div className="w-full h-full">
                    <div className="loaderl flex justify-center items-center"></div>
                </div>)
                :(
                    <div className="p-3 sm:p-10 w-full flex flex-col gap-10">
                        <div className="text-white flex flex-row items-center justify-between">
                            <h2 className="sm:text-4xl text-2xl font-semibold items-center justify-between capitalize">Group Details</h2>

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

                        <div className="flex sm:flex-row flex-col justify-between items-cente sm:gap-0 gap-10">
                            <div className="sm:mt-7 flex flex-col sm:flex-row gap-5 items-center">
                                <img
                                src={groupDetails?.profilepic}
                                className="w-[150px] h-[150px] rounded-full"
                                />

                                <div className="flex flex-col gap-2 text-white">
                                    <p className="text-2xl font-semibold sm:text-start text-center">{groupDetails?.groupName}</p>
                                    <p className="text-sm text-richblack-300 sm:text-start text-center">Created by : {groupDetails?.groupAdmin?.name} on {dateFormatter(groupDetails.createdAt)}</p>
                                    
                                    <div className="sm:self-start self-center text-sm font-semibold cursor-pointer bg-yellow-50 rounded-full hover:bg-pink-300 w-fit px-3 py-2"
                                    onClick={()=>{navigate(`/chat/${groupDetails._id}/group/true/user/null`)}}>
                                        <div className="flex gap-2 items-center text-richblack-900">
                                            <BiSolidMessageAdd />
                                            <p>Message</p> 
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="text-sm font-semibold text-richblack-25 cursor-pointer w-fit sm:self-start self-center"
                            onClick={()=>dispatch(setShowCreateGroupField(true))}
                            >
                                <div className="px-3 py-2 bg-yellow-50 text-richblack-900 rounded-md">
                                    edit details
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-5">
                            <p className="text-2xl text-white">group Admin</p>
                            <div className="flex flex-row items-center gap-4 cursor-pointer w-fit"
                            onClick={()=>{navigate(`/friends/${groupDetails.groupAdmin._id}`)}}
                            >
                                <img 
                                src={groupDetails?.groupAdmin?.profilepic}
                                className="w-[50px] h-[50px] rounded-full object-cover"
                                />
                                <p className="text-lg font-semibold text-white">{groupDetails?.groupAdmin?.name} / {groupDetails?.groupAdmin?.username}</p>
                            </div>
                        </div>

                        {/* members */}

                        <div className="flex flex-col gap-4 text-white">
                            <h2 className="text-richblack-400 text-xl">{groupDetails?.users?.length} members</h2>
                            {
                                groupDetails?.users?.map((user)=>(
                                    <div className="bg-orange-200 p-5 rounded-xl flex justify-between items-center hover:bg-yellow-25 cursor-pointer sm:flex-row flex-col sm:gap-0 gap-2"
                                    onClick={()=>navigate(`/friends/${user._id}`)}
                                    >
                                        <div className="flex flex-row gap-3 items-center">
                                            <img 
                                            src={user?.profilepic}
                                            className="w-[70px] h-[70px] rounded-full "
                                            />
                                            <div className="font-bold">
                                                <p className={`text-black-900`}>
                                                    {
                                                        user._id === userDetails._id ?
                                                        (<div>You / {user?.username}</div>)
                                                        :(<div>{user?.name} / {user?.username}</div>)
                                                    }
                                                </p>
                                                <p className="text-black-900">{user.email.length > 21 ? (user.email.slice(0,21) + '...') : (user.email)}</p>
                                            </div>
                                        </div>
                                        {
                                            user._id !=userDetails._id && (
                                                <div className="text-2xl font-semibold cursor-pointer bg-yellow-50 p-2 sm:p-5 rounded-full hover:bg-pink-300 self-end"
                                                onClick={()=>{messageHandler(user?._id)}}>
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


            {
                showCreateGroupField && (<CreateGroupPage groupData={groupDetails} isEdit={true}/>)
            }
        </div>
    )
}

export default GroupDetails;