import { useState } from 'react';
import {useForm} from 'react-hook-form'
import { FaArrowRightLong } from "react-icons/fa6";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";



function LoginForm(){

    const [showPassword,setShowPassword] = useState(false);

    const{
        register,
        formState:{errors},
        handleSubmit
    } = useForm();

    async function submitHandler(data){
        //api call wiil be here
        console.log(data)
    }

    return(
        <>
            <div className="">

                

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
                        />
                        <div
                        onClick={()=>setShowPassword(prev =>!prev)}
                        className='absolute right-4 top-[52%] text-2xl cursor-pointer'
                        >
                            {
                                showPassword ? <IoEye/> :<IoEyeOff/>
                            }
                        </div>
                        {
                            errors.password && (<span className='text-pink-200'>password is required</span>)
                        }
                    </label>

                    <button className='p-2 rounded-md bg-yellow-50 font-semibold
                    hover:bg-yellow-200 active:scale-95'
                    type='submit'
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