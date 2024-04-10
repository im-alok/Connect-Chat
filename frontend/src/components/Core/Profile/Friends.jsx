import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchAllChats } from "../../../services/Operations/chatOperation";
import { useNavigate } from "react-router-dom";

function Friends(){

    const [loading,setLoading] = useState(false);

    const {token} = useSelector((state)=>state.auth);
    const [Friends,setFriends] = useState([]);
    const {user} = useSelector((state)=>state.profile);
    const navigate = useNavigate();

    useEffect(()=>{
        var result;
        async function getAllData(){
            setLoading(true);
            result = await fetchAllChats(token)
            const userChat = result.userChats.map((chat)=>(
                {
                    ...chat,users:chat.users.filter((people)=>people._id!=user._id)
                }
            ))
            setFriends(userChat)
            // console.log(userChat)
            setLoading(false);
        }
        getAllData();
        
    },[])

    return(
        <>
            {
                loading ? (<div className="loaderl mx-auto"></div>)
                :(
                    <div className="p-10">
                        {
                            Friends.length === 0 ? (<div className=" text-3xl text-orange-200">You dont't have any friend , Kindly find them in search section !! </div>)
                            :(
                                <div className="flex flex-row flex-wrap gap-20 overflow-hidden">
                                    {
                                        Friends.map((friend) => (
                                            <div key={friend._id} 
                                            className="text-white cursor-pointer"
                                            onClick={()=>navigate(`/friends/${friend.users[0]._id}`)}
                                            >
                                                <div className="flex gap-5 items-center">
                                                    <img 
                                                    src={friend.users[0].profilepic}
                                                    className="w-[70px] h-[70px] rounded-full "
                                                    />
                                                    <div>
                                                        <h2>{friend.users[0].name}</h2>
                                                        <p className="text-richblack-600">{friend.users[0].username}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            )
                        }
                    </div>
                )
            }
        </>
    )
}

export default Friends;