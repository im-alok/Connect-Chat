import { useForm } from 'react-hook-form';
import {useParams} from 'react-router-dom'
import { IoSend } from "react-icons/io5";
import { useState } from 'react';
import { sendMessage } from '../../../services/Operations/userOperation';
import { useDispatch, useSelector } from 'react-redux';
import { setMessageDetails } from '../../../slices/conversationSlice';

function SendMessage(){
    const {chatId,groupStatus} = useParams();
    console.log(groupStatus);
    const {
        register,
        setValue,
        getValues
    } = useForm();
    const [loading,setLoading] = useState(false);
    const{token} = useSelector((state)=>state.auth);
    const dispatch = useDispatch();
    // console.log(chatId)
    // console.log(getValues().sendMessage)

    function sendMessageHandler(){
        setLoading(true);
        if(getValues().sendMessage == ""){
            setLoading(false);
            return;
        }
            
        if(groupStatus){
            const response = sendMessage(chatId,getValues().sendMessage,token,null);
        }
        else{
            const response = sendMessage(null,getValues().sendMessage,token,chatId);
        }
        setValue('sendMessage',"");
        setLoading(false);
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
                className='form-style w-[94%]'
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