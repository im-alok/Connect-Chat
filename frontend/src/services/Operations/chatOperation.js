import { apiConnector } from "../apiConnector";
import {Chat,GroupChat} from "../apis";
import {toast} from 'react-hot-toast';
import {setRender} from '../../slices/authSlice'

export async function createChat(friendId,token,dispatch){
    try {
        const response = await apiConnector('POST',Chat.createChat,
        {
            friendId:friendId
        },
        {
            "Authorization" : "Bearer" + token
        }
        );
        // console.log(response);

        if(!response.data.success)
            throw new Error(response.data.message);
        const result = response.data.newUserFullChat || response.data.userChat
        // console.log(result);
        dispatch(setRender());
        return result;
        
    } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
    }
}

export async function fetchAllChats(token){
    let result ={};
    try {
        const response = await apiConnector('GET',Chat.fetchChat,null,
        {
            "Authorization":"Bearer" + token
        }
            ,null);

        // console.log(response);

        if(!response.data.success)
            throw new Error(response.data.message);
        result.userChats = response.data.userChat;
        result.groupChats = response.data.groupChat;
        return result;

    } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
    }
}

export async function createGroup(token,groupName,members,dispatch){
    try {
        const response = await apiConnector('POST',GroupChat.createGroupChat,
        {
            groupName:groupName,
            users:members
        },
        {
            "Authorization" : "Bearer" + token
        }
        );

        if(!response.data.success)
            throw new Error(response.data.message);
        let result = response.data.groupChatDetails;
        dispatch(setRender());
        return result;
        
    } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
    }
}

export async function editGroup(token,groupName,members,groupId,dispatch){
    try {
        const response = await apiConnector('PUT',GroupChat.editGroupChat,
        {
            groupName:groupName,
            users:members,
            groupId:groupId
        },
        {
            "Authorization" : "Bearer" + token
        }
        );

        if(!response.data.success){
            toast.error(response.data.message);
            throw new Error(response.data.message);
        }
            
        let result = response.data.groupChatDetails;
        dispatch(setRender());
        toast.success(response.data.message);
        return result;
        
    } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
    }
}