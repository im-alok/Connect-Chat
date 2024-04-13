import { useState } from 'react';
import {useForm} from 'react-hook-form'
import { FaArrowRightLong } from "react-icons/fa6";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { userLogin } from '../../../services/Operations/authOperation';
import {useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';



function LoginForm(){

    const [showPassword,setShowPassword] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {loading} = useSelector((state)=>state.auth);

    const{
        register,
        formState:{errors},
        handleSubmit
    } = useForm();

    function submitHandler(data){
        //api call wiil be here
        dispatch(userLogin(data,navigate));
        // console.log(data)
    }

    return(
        <>
            <div className="w-full flex items-center justify-center">

                

                <form onSubmit={handleSubmit(submitHandler)}
                className='flex flex-col gap-5'
                >
                    <label className='lable-style flex flex-col gap-2'>
                        <div className='flex gap-1'>
                            <p>username</p>
                            <span className='text-pink-200'>*</span>
                        </div>
                        <input 
                        type='text'
                        id='username'
                        placeholder='enter your username'
                        {...register('username',{required:true})}
                        className='form-style'
                        disabled={loading}
                        />
                        {
                            errors.username && (<span className='text-pink-200'>username is required</span>)
                        }
                    </label>

                    <label className='lable-style flex flex-col gap-2 relative'>
                        <div className='flex gap-1'>
                            <p>password</p>
                            <span className='text-pink-200'>*</span>
                        </div>
                        <input 
                        type={showPassword ? 'text' :'password'}
                        id='password'
                        placeholder='enter your password'
                        {...register('password',{required:true})}
                        className='form-style'
                        disabled={loading}
                        />
                        <div
                        onClick={()=>setShowPassword(prev =>!prev)}
                        className='absolute right-4 top-[40%] text-2xl cursor-pointer'
                        >
                            {
                                showPassword ? <IoEye/> :<IoEyeOff/>
                            }
                        </div>
                        {
                            errors.password && (<span className='text-pink-200'>password is required</span>)
                        }
                        <div className={`text-richblue-200 text-end text-sm cursor-pointer ${loading ? 'pointer-events-none' :'pointer-events-auto'}`}
                        onClick={()=>navigate('/send-reset-password-token')}
                        >
                            Forgot password ?
                        </div>
                    </label>

                    <button className='mt-5 sm:w-fit  sm:px-32 p-2 rounded-full bg-yellow-50 font-semibold self-center
                    hover:bg-yellow-200 active:scale-95 w-11/12'
                    type='submit'
                    disabled={loading}
                    >
                        <div className='flex items-center gap-1 justify-center'>
                            Login
                            <FaArrowRightLong />
                        </div>
                    </button>
                </form>

                

            </div>
        </>
    )
}

export default LoginForm;