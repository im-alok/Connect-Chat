import { useForm } from 'react-hook-form';
import {useParams} from 'react-router-dom'
import { IoSend } from "react-icons/io5";
import { useState } from 'react';
import { sendMessage } from '../../../services/Operations/userOperation';
import {  useDispatch, useSelector } from 'react-redux';
import { socketConnection } from '../../../Utils/SocketConnection';

var socket = socketConnection();
function SendMessage({conversation,setConversation}){
    const {chatId,groupStatus} = useParams();
    const{user} = useSelector((state)=>state.profile);
    // console.log(groupStatus);
    const {
        register,
        setValue,
        getValues
    } = useForm();
    const [loading,setLoading] = useState(false);
    const{token} = useSelector((state)=>state.auth);
    const {socketConnected} = useSelector((state)=>state.conversation);
    const [typing,setTyping] = useState(false);
    const dispatch = useDispatch();
    // console.log(chatId)
    // console.log(getValues().sendMessage)

    // async function sendMessageHandler(){
    //     setLoading(true);
    //     socket.emit('stop typing',chatId);
    //     setTyping(false);
    //     if(getValues().sendMessage === ""){
    //         setLoading(false);
    //         return;
    //     }
            
    //     if(groupStatus === 'false'){
    //         const response = await sendMessage(chatId,getValues().sendMessage,token,null);
            
            
    //         const message = [...conversation]
    //         setConversation(message);
    //         socket.emit('new Message',response);
    //         // console.log(message);
    //     }
    //     else{
    //         const response = await sendMessage(null,getValues().sendMessage,token,chatId);
    //         const message = [...conversation]
    //         setConversation(message);
    //         socket.emit('new Message',response);
    //     }
    //     setValue('sendMessage',"");
    //     setLoading(false);
    // }

    async function sendMessageHandler() {
        setLoading(true);
        socket.emit('stop typing', chatId);
        setTyping(false);
        if (getValues().sendMessage === "") {
            setLoading(false);
            return;
        }
    
        let response;
        if (groupStatus === 'false') {
            response = await sendMessage(chatId, getValues().sendMessage, token, null);
        } else {
            response = await sendMessage(null, getValues().sendMessage, token, chatId);
        }
    
        const message = [...conversation];
        setConversation(message);
        socket.emit('new Message', response);
    
        setValue('sendMessage', "");
        setLoading(false);
    }
    

    async function keyDownHandler(e){
        // console.log(e.key)
        if(e.key === 'Enter'){
            setLoading(true);
            socket.emit('stop typing',chatId);
            setTyping(false);
            if(getValues().sendMessage === ""){
                setLoading(false);
                return;
            }
                
            if(groupStatus === 'false'){
                const response = await sendMessage(chatId,getValues().sendMessage,token,null);
                
                
                const message = [...conversation]
                setConversation(message);
                socket.emit('new Message',response);
                // console.log(message);
            }
            else{
                const response = await sendMessage(null,getValues().sendMessage,token,chatId);
                const message = [...conversation]
                setConversation(message);
                socket.emit('new Message',response);
            }
            setValue('sendMessage',"");
            setLoading(false);
        }
            
    }

    var data = {
        chatId:chatId,
        user:user
    }

    function typingHandler(e) {
        if (!socketConnected) return;
        
        var ty=false;

        if (!typing) {
            ty=true;
            setTyping(true);
            socket.emit("typing", data); // Emit typing event when user starts typing
        }
    

        var lastTypingTimeRef = new Date().getTime(); // Set initial typing time
    
        const TimerLength = 10000;
    
        setTimeout(() => {
            const timeNow = new Date().getTime();
            if (timeNow - lastTypingTimeRef >= TimerLength && ty) {
                socket.emit("stop typing", data); // Emit stop typing event after TimerLength
                setTyping(false);
            }
        }, TimerLength);
    
    }
    

    return(
        <div className='p-5'>
            {/* input field for sending message */}
            <div className='flex justify-between items-center'>
                <input 
                id='sendMessage'
                name='sendMessage'
                type='text'
                placeholder='send message'
                {...register('sendMessage')}
                className='form-style w-[80%] sm:w-[94%]'
                onKeyDown={(e)=>keyDownHandler(e)}
                onChange={(e)=>typingHandler(e)}
                />
                <div>
                    {
                        loading 
                        ? (
                            <div class="loaders"></div>
                        )
                        :(<div className='text-2xl font-bold bg-[#02d127] p-3 rounded-full text-richblack-25 cursor-pointer'
                        onClick={sendMessageHandler}
                        >
                            <IoSend />
                        </div>)
                    }
                </div>
            </div>
        </div>
    )
}

export default SendMessage;