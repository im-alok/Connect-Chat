import { useSelector } from "react-redux";
import { apiConnector } from "../apiConnector";
import {Message, SearchUser} from "../apis";
import {toast} from 'react-hot-toast';


export async function searchPeople(keyword,token){
    let result=[];
    try {
        const response = await apiConnector('GET',SearchUser.searchPeople,null,{
            'Authorization' : 'Bearer' + token
        },{search:keyword});

        
        
        if(!response.data.success){
            toast.error(response.data.message);
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

export async function sendMessage(chatId,message,token,groupId){
    let result={};
    try {
        const response = await apiConnector('POST',Message.sendMessage,
        {
            message:message,
            chatId:chatId,
            groupId:groupId
        },
        {
            "Authorization" : 'Bearer' + token
        }
        );

        if(!response.data.success)
            throw new Error(response.data.message);
        // console.log(response);
        result = response.data.deliverMessage
        return result;
    } catch (error) {
        console.log(error);
    }
}