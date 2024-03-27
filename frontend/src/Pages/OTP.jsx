import image from '../Assets/signup.jpg'
import OTPForm from '../components/Core/Auth/OTPForm';
import { FaArrowLeftLong } from "react-icons/fa6";
import { BsArrowClockwise } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { sendOTP } from '../services/Operations/authOperation';
// import {useNavigate} from 'react-router-dom'

function OTP(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {signUpFormData} = useSelector((state)=>state.auth);

    function backHandler(){
        navigate(-1);
    }

    function resendHandler(){
        dispatch(sendOTP(signUpFormData.email,signUpFormData.username,navigate));
    }

    return(
        <div className='relative flex items-center justify-center h-[calc(100vh-4.9rem)]'>
            
            {/* Background Image */}

            <div className='relative w-full h-full'>
                <img 
                src={image}
                alt=''
                className='h-[calc(100vh-4.9rem)] w-full object-cover opacity-100'
                />

                <div className='absolute z-[500] top-0 w-full h-full bg-richblack-900 opacity-95'></div>
            </div>

            {/* Otpform */}

            <div className='w-full h-full scale-75 absolute top-0 z-[1000] flex justify-center items-center text-richblack-5 flex-col'>
                <div className='flex flex-col gap-2'>
                    <h1 className='text-3xl font-bold'>Verify Email</h1>
                    <p className='text-base text-richblack-25'>A Verification has been sent to your email address. Enter the code below.</p>
                    <OTPForm length={4}/>

                    <div className='w-full flex justify-between'>
                        <div className='flex gap-2 items-center text-orange-200 cursor-pointer font-bold '
                        onClick={backHandler}
                        > 
                            <FaArrowLeftLong />
                            <p>Back</p>
                        </div>

                        <div className='flex gap-2 cursor-pointer items-center font-bold text-orange-200'
                        onClick={resendHandler}
                        >
                            <BsArrowClockwise />
                            resend
                        </div>
                    </div>
                </div>
                
            </div>

            
        </div>
    )
}

export default OTP;