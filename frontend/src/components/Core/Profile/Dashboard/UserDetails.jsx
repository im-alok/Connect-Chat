import { FaSearch } from "react-icons/fa";
import ImageUploader from "./ImageUploader";
import { useSelector } from "react-redux";
import PersonalDetails from "./PersonalDetails";

function UserDetails(){
    const {user} = useSelector((state => state.profile))

    return(
        <div className="sm:mt-0 h-full w-[calc(100%-7%)] pt-10 sm:p-10 flex flex-col gap-12">
            

            <div className="flex flex-col gap-10">
            {/* user profile pics */}

                <div className="flex sm:flex-row flex-col justify-between items-center">
                    <div className="flex flex-col sm:flex-row gap-10 items-center">
                        {/* userImaage */}

                            <ImageUploader />

                        {/* user name and about user */}

                        <div className="text-richblack-5 flex flex-col gap-2">
                            <p className="sm:text-3xl text-xl font-semibold text-center">{user.name} / {user.username}</p>
                            <p className="italic text-richblack-200 text-xs sm:text-sm max-w-[850px] max-h-[80px] overflow-auto text-center">{user.additionalDetails.Bio || "About you"} </p>
                        </div>
                    </div>

                    <div className="hidden sm:flex flex-row gap-2 items-center border border-richblack-50 rounded-full px-3 py-1">
                        <div className="w-[10px] h-[10px] rounded-full bg-[#0ffc03]"></div>
                        <div className="text-lg text-white font-semibold ">online</div>
                    </div>
                </div>
                    
            {/* user PersonalDetails */}

                <div className="flex flex-row sm:items-center sm:justify-between w-full ">
                    <PersonalDetails />
                    {/* <div className="loaderl"></div> */}
                </div>

            </div>

        </div>
    )
}

export default UserDetails