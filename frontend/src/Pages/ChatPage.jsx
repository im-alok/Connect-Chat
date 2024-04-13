import { Outlet } from "react-router-dom";
import Sidebar from "../components/Core/ChatPage/Sidebar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Common/Navbar";

function ChatPage(){
    

    return(
        <>
            <div >
                <Navbar />
            </div>
            <div className="w-full h-[calc(100vh-4.9rem)] flex flex-col sm:flex-row sm:gap-0 gap-1">
                <div>
                    <Sidebar />
                </div>
                <div>
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default ChatPage;