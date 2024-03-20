import image from '../Assets/signup.jpg'
import OTPForm from '../components/Core/Auth/OTPForm';
import { FaArrowLeftLong } from "react-icons/fa6";
import { BsArrowClockwise } from "react-icons/bs";
// import {useNavigate} from 'react-router-dom'

function OTP(){
    // const navigate = useNavigate();

    function backHandler(){
        // navigate(-1);
    }

    function resendHandler(){

    }

    return(
        <div className='relative'>
            
            {/* Background Image */}

            <div className='relative h-full'>
                <img 
                src={image}
                alt=''
                className='h-[711px] w-full object-cover opacity-100'
                />

                <div className='absolute z-[500] top-0 w-full h-[711px] bg-richblack-900 opacity-95'></div>
            </div>

            {/* Otpform */}

            <div className='w-full h-full absolute top-0 z-[1000] flex justify-center items-center text-richblack-5 flex-col'>
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