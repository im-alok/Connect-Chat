import { useSelector } from "react-redux";
import { apiConnector } from "../apiConnector";
import {SearchUser} from "../apis";
import {toast} from 'react-hot-toast';


export async function searchPeople(keyword,token){
    let result=[];
    try {
        const response = await apiConnector('GET',SearchUser.searchPeople,null,{
            'Authorization' : 'Bearer' + token
        },
        null,{search:keyword});

        
        
        if(!response.data.success){
            throw new Error(response.data.message);
        }
        result = response.data.users;
        // console.log(result)
        return result;

    } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
    }
}