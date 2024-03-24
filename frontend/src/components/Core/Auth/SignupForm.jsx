import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";

function SignupForm(){
    const {
        register,
        formState:{errors},
        handleSubmit
    } = useForm();
    const [showPassword,setShowPassword] = useState(false)
    const [showConfirmPassword,setShowConfirmPassword] = useState(false)

    function submitHandler(data){
        console.log(data);
    }

    return(
        
        <form onSubmit={handleSubmit(submitHandler)}
            className="flex flex-col gap-5 "
            >   
                {/* Name */}

                <label className="flex gap-1 flex-col">
                    <div className='flex gap-1'>
                        <p className="text-richblack-5">Full Name</p>
                        <span className='text-pink-200'>*</span>
                    </div>
                    <input 
                    className="form-style w-9/12"
                    id="name"
                    type="text"
                    placeholder="enter your name"
                    {...register('name',{required:true})}
                    />
                    {
                        errors.name && (<span className="text-pink-200 text-xs">Please enter your name</span>)
                    }
                </label>

                {/* username */}

                <label className="flex flex-col gap-1">
                    <div className='flex gap-1'>
                        <p className="text-richblack-5">username</p>
                        <span className='text-pink-200'>*</span>
                    </div>
                    <input 
                        type='text'
                        id='username'
                        placeholder='enter your username'
                        {...register('username',{required:true})}
                        className='form-style w-9/12'
                        />
                        {
                            errors.username && (<span className='text-pink-200 text-xs'>username is required</span>)
                        }
                </label>

                {/* email */}

                <label className="flex flex-col gap-1">
                    <div className='flex gap-1'>
                        <p className="text-richblack-5">Email</p>
                        <span className='text-pink-200'>*</span>
                    </div>
                    <input 
                        type='email'
                        id='email'
                        placeholder='enter your email'
                        {...register('email',{required:true})}
                        className='form-style w-9/12'
                        />
                        {
                            errors.email && (<span className='text-pink-200 text-xs'>email is required</span>)
                        }
                </label>

                {/* password */}

                <div className="h-[80px] flex gap-5 mb-3">
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
                            errors.password && (<span className='text-pink-200 text-xs'>password is required</span>)
                        }
                    </label>
                    <label className='lable-style flex flex-col gap-2 relative'>
                        <div className='flex gap-1'>
                            <p>confirm password</p>
                            <span className='text-pink-200'>*</span>
                        </div>
                        <input 
                        type={showConfirmPassword ? 'text' :'password'}
                        id='password'
                        placeholder='re-enter your password'
                        {...register('confirmpassword',{required:true})}
                        className='form-style'
                        />
                        <div
                        onClick={()=>setShowConfirmPassword(prev =>!prev)}
                        className='absolute right-4 top-[52%] text-2xl cursor-pointer'
                        >
                            {
                                showConfirmPassword ? <IoEye/> :<IoEyeOff/>
                            }
                        </div>
                        {
                            errors.confirmpassword && (<span className='text-pink-200'>password is required</span>)
                        }
                    </label>
                </div>

                {/* submit button */}
                <button className='mt-5 w-fit px-32 p-2 rounded-full bg-yellow-50 font-semibold self-center
                    hover:bg-yellow-200 active:scale-95'
                    type='submit'
                    >
                        <div className='flex items-center gap-1 justify-center'>
                            Sign up
                            <FaArrowRightLong />
                        </div>
                </button>
        </form>
        
    )
}

export default SignupForm;