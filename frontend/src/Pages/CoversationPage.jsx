import { MdVideoCall } from "react-icons/md";
import { IoCallSharp } from "react-icons/io5";

function ConversationPage(){
    return(
        <div className="w-[calc(100vw-450px)] min-h-[calc(100vh-7.0rem)] bg-richblack-800 m-4 border-2 border-r-richblack-900 flex flex-col gap-2">

            <div className="flex justify-between items-center p-3 bg-richblack-800 shadow-[0px_0px_10px_5px] shadow-black">
                <div className="flex gap-5 self-end text-2xl font-bold text-richblack-25 ">
                    <div className="cursor-pointer"><IoCallSharp /></div>
                    <div className="cursor-pointer"><MdVideoCall /></div>

                </div>
            </div>

            {/* <SendMessage /> */}

        </div>
    )
}

export default ConversationPage;