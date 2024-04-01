import { Outlet } from "react-router-dom";
import Sidebar from "../components/Core/ChatPage/Sidebar";

function ChatPage(){
    return(
        <div className="w-full h-full flex flex-row">
            <div>
                <Sidebar />
            </div>
            <div>
                <Outlet />
            </div>
        </div>
    )
}

export default ChatPage;