import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchAllChats } from "../../../services/Operations/chatOperation";
import { useNavigate } from "react-router-dom";

function DashboardGroups(){

    const [loading,setLoading] = useState(false);

    const {token} = useSelector((state)=>state.auth);
    const [Groups,setGroups] = useState([]);
    const {user} = useSelector((state)=>state.profile);
    const navigate = useNavigate();

    useEffect(()=>{
        var result;
        async function getAllData(){
            setLoading(true);
            result = await fetchAllChats(token)
            setGroups(result.groupChats)
            // console.log(result)
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
                            Groups.length === 0 ? (<div className=" text-3xl text-orange-200">You dont't have any friend , Kindly find them in search section !! </div>)
                            :(
                                <div className="flex flex-row flex-wrap gap-20 overflow-hidden">
                                    {
                                        Groups.map((group) => (
                                            <div key={group._id} 
                                            className="text-white cursor-pointer"
                                            onClick={()=>navigate(`/Groups/${group._id}`)}
                                            >
                                                <div className="flex gap-5 items-center">
                                                    <img 
                                                    src={group.profilepic}
                                                    className="w-[70px] h-[70px] rounded-full "
                                                    />
                                                    <div>
                                                        <h2>{group.groupName}</h2>
                                                        <p className="text-richblack-600"><span>members : </span><span>{group.users.length}</span></p>
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

export default DashboardGroups;