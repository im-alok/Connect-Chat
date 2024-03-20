import {Tilt} from 'react-tilt';
import LoginForm from "../Core/Auth/LoginForm";
import SignupForm from "../Core/Auth/SignupForm";
import HighLightedText from './HighlightedText';
import { motion } from "framer-motion";
import { slideIn } from "../../Utils/motion";
import { FaGoogle } from "react-icons/fa";

function Template({image,formType,customClasses}){
    return(
        <div className={` w-full h-full flex flex-row ${customClasses}`}>
            {/* for Image */}
                <div className="w-[50%] min-h-full flex items-center justify-center bg-orange-200 " >
                    <motion.div
                    variants={slideIn("right","spring" ,0.5 * 2 , 3)}
                    >
                        <Tilt>
                            <img 
                            src={image}
                            alt='login page'
                            className='w-[450px] aspect-square object-cover rounded-md shadow-[10px_10px_25px_2px] shadow-richblack-900'
                            />
                        </Tilt>
                    </motion.div>

                </div>

            {/* for form */}
            <div className='min-w-[100%] sm:min-w-[50%] min-h-full flex flex-col gap-7 justify-center items-center bg-richblack-900'>
                {
                    formType === 'login' 
                    ?(
                        <motion.div
                        variants={slideIn("right","spring" ,0.5 * 2 , 3)}
                        >
                                <p className='text-richblack-300 text-2xl sm:text-4xl font-semibold flex gap-2'>
                                    Welcome Back to                                    <HighLightedText 
                                    text={'Connect Chat'}
                                    />
                                </p>
                                <p className='text-center text-sm sm:text-base  text-yellow-200'>One Single place to meet millions of people.</p>
                        </motion.div>
                    )
                    :(<div>
                        <motion.div
                        variants={slideIn("right","spring" ,0.5 * 2 , 3)}
                        >
                            <p className='text-richblack-300 text-2xl sm:text-4xl font-semibold flex gap-2'>
                                Hii There, Welcome to
                                <HighLightedText 
                                text={'Connect Chat'}
                                />
                            </p>
                            <p className='text-center text-sm sm:text-base  text-yellow-200'>
                                One step close toward making new friend, collegues and get connected with families.
                            </p>
                        </motion.div>
                    </div>)
                }

                <div className=''>
                    {
                        formType ==='login' ? <LoginForm /> : <SignupForm />
                    }
                </div>

                <div className='flex justify-center items-center bg-[#c21515] text-richblack-5 rounded-full p-2 sm:px-20 font-semibold cursor-pointer active:scale-95'>
                    <div
                    className='flex gap-1 items-center'
                    >
                        <FaGoogle
                        className=''
                        />
                            {
                                formType==='login' ? "Log in":"Sign up"
                            } 
                            {" "}with google
                            
                        </div>
                </div>
            </div>
            

            
        </div>
    )
}

export default Template;