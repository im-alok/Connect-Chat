import { useSelector } from "react-redux";
import ProfileUpdate from "../../components/Core/Profile/Settings/ProfileUpdate";
import PasswordChange from "../../components/Core/Profile/Settings/PasswordChange";
import DeleteAccount from "../../components/Core/Profile/Settings/DeleteAccount";

function Settings(){

    return(
        <div className="mt-10 w-full min-h-fit text-white p-3 pt-10 sm:p-10 bg-black-600 rounded-xl ">
            <div className="flex flex-col gap-7">
                <h2 className="text-3xl font-semibold">Profile Information </h2>
                <div>
                    <ProfileUpdate />
                    <PasswordChange />
                    <DeleteAccount />
                </div>
            </div>
        </div>
    )

}

export default Settings;