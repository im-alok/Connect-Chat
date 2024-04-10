import { apiConnector } from "../apiConnector";
import {UpdateProfile} from "../apis";
import {toast} from 'react-hot-toast';
import { setUser } from "../../slices/profileSlice";

export async function updateProfile(token,dob,gender,contact,about,dispatch){
    try {
        const response = await apiConnector('PUT',UpdateProfile.updateDetails,
        {
            dob:dob,
            gender:gender,
            contact:contact,
            about:about
        },{
            "Authorization" : 'Bearer' + token
        })
        if(!response.data.success){
            toast.error(response.data.message)
            throw new Error(response.data.message);
        }

        dispatch(setUser(response.data.updatedUserDetails));
        localStorage.setItem('user',JSON.stringify(response.data.updatedUserDetails));
        toast.success(response.data.message);

    } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
    }

}

export async function updatePassword(token,oldPassword,newPassword){
    // console.log(oldPassword,newPassword)
    try {
        const response = await apiConnector('PUT',UpdateProfile.updatePassword,
        {
            oldPassword:oldPassword,
            newPassword:newPassword
        },
        {
            "Authorization" : 'Bearer' + token
        }
        );

        if(!response.data.success){
            toast.error(response.data.message);
            throw new Error(response.data.message);
        }
        toast.success('password updated successfully');

    } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
    }
}