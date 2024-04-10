import { useSelector } from "react-redux";
import { dateFormatter } from "../../../../Utils/dateAndTimeFormatter";

function PersonalDetails(){
    const {user} = useSelector((state)=>state.profile);
    // console.log(user)

    return(
        <div className="notebook">
            <h4>Personal Details :</h4>

            <div class="lines"></div>

            <ul class="list">
                <li><span>Email : </span><span className="lowercase">{user.email}</span></li>
                <li><span>username : </span><span className="lowercase">{user.username}</span></li>
                <li><span>Date of Birth : </span><span className="lowercase">{dateFormatter(user.additionalDetails.dob) || "dd/mm/yyyy"}</span></li>
                <li><span>Gender : </span><span className="">{user.additionalDetails.gender || "M/F"}</span></li>

                <li><span>Gender : </span><span className="">{user.additionalDetails.phoneno || "+91 XXXXXXXXXX"}</span></li>
                
            </ul>

        </div>
    )
}

export default PersonalDetails;