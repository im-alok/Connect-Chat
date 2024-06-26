import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { sendForgotPasswordToken } from "../services/Operations/authOperation";

function ForgotPassword(){
    const dispatch = useDispatch();
    const {loading} = useSelector((state)=>state.auth);
    const [emailSent,setEmailSent] = useState(false);
    const[email,setEmail] = useState('');

    function changeHandler(event){
        setEmail(event.target.value);
    }
    async function submitHandler(e){
        e.preventDefault();
        dispatch(sendForgotPasswordToken(email,setEmailSent));
    }
    return(
        <div className="p-10 sm:p-0 sm:mt-0 mx-auto w-11/12 bg-richblue-900 min-w-full min-h-[100vh]">

            <div className="sm:h-[500px] flex  justify-center items-center">
                {
                    loading?(<div className="text-richblack-25">Loading...</div>)
                    :(
                        <div className="flex flex-col gap-5  sm:w-4/12">
                            <h1 className="  font-semibold text-2xl sm:text-3xl text-richblack-5">
                                {
                                    !emailSent ? "Reset Your Password" : "Check Email"
                                }
                            </h1>
                            <div className="text-base  sm:text-lg font-medium text-richblack-100 sm:w-[90%] w-full">
                                {
                                    !emailSent?(<p>Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery</p>)
                                    :(<p>We have sent the reset email to
                                        your {email}</p>)
                                }
                            </div>

                            {
                                !emailSent 
                                ?( 
                                    <form>
                                        <label className="mt-[20px]">
                                            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
                                                Email Address<sup className="text-pink-200">*</sup>
                                            </p>

                                            <input 
                                            type="email"
                                            required
                                            value={FormData.email}
                                            onChange={changeHandler}
                                            name="email"
                                            placeholder="Enter Email id"
                                            className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-2 border-white  "
                                            />

                                        </label>    
                                    </form>
                                )
                                :("")
                            }
                                
                            <div>
                                {
                                    !emailSent
                                    ?(<button className='w-full flex justify-center items-center rounded-[8px] font-medium text-black border border-richblack-700 px-[12px] py-[8px] gap-x-2 mt-6 bg-yellow-50 active:scale-95'
                                    onClick={submitHandler}>
                                        Reset Password
                                    </button>)
                                    :(<button className='w-full flex justify-center items-center rounded-[8px] font-medium text-black border border-richblack-700 px-[12px] py-[8px] gap-x-2 mt-6 bg-yellow-50 active:scale-95'
                                    onClick={submitHandler}
                                    >
                                        Resend Email
                                    </button>)
                                }
                            </div>
                            <Link to={"/login"} 
                            className="flex gap-2 font-medium   text-base items-center text-richblack-5"
                            >
                                <FaArrowLeftLong />
                                <p>Back to login</p>
                            </Link>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default ForgotPassword;