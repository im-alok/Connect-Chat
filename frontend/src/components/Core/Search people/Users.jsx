import { useDispatch, useSelector } from "react-redux";
import { createChat } from "../../../services/Operations/chatOperation";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Users({searchData,setOpenSearchMenu}){
    // console.log(searchData)
    const {token} = useSelector((state)=>state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    


    async function clickHandler(id){
        // console.log(id);
        const response = await createChat(id,token,dispatch);
        // console.log(response);
        if(response){
            setOpenSearchMenu(false);
            navigate(`/chat/${response._id}`);
        }
            
    }
    return(
        <div className="flex flex-col gap-3">
            {
                searchData?.map((user,index)=>(
                    <div key={index}
                    className=""
                    onClick={()=>clickHandler(user._id)}
                    >
                        <div className="flex gap-2 items-center bg-richblack-25 p-2 rounded-md py-3 hover:bg-yellow-100 cursor-pointer">
                            <img 
                            src={user.profilepic}
                            className="w-[50px] h-[50px] object-cover rounded-full"
                            />

                            <div className="font-medium">
                                <div className="flex gap-1">
                                    <p className="font-bold">{user.name.split(" ").slice(0,8).join(" ")}</p>
                                </div>
                                <p className="text-sm ">{user.email}</p>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Users;