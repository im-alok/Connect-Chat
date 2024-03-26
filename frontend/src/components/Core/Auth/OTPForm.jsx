import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userRegistration } from "../../../services/Operations/authOperation";
import { useNavigate } from "react-router-dom";

function OTPForm({length = 4}){
    const[otp,setOtp] = useState(new Array(length).fill(""));
    const [showSubmitButton,setShowSubmitButton] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {signUpFormData} = useSelector((state)=>state.auth);

    const inputRefs = useRef([]);

    // console.log(inputRefs.current);

    useEffect(()=>{
        if(inputRefs.current[0]){
            inputRefs.current[0].focus();
        }
    },[])
    
    function changeHandler(e,index){
        const value = e.target.value;

        if(isNaN(value))return;

        const newOtp = [...otp];
        newOtp[index] = value.substring(value.length - 1 );
        setOtp(newOtp);
        const combinedOtp = newOtp.join("");
        
        if(combinedOtp.length === length){
            setShowSubmitButton(true);
            // console.log(combinedOtp);
        }

        //moving to the next textfield if current field is filled
        if(value && index < length - 1 && inputRefs.current[index+1]){
            inputRefs.current[index+1].focus();
        }

    }

    function keyHandler(e,index){
        //moving to the prev textfield if current field is empty
        if(e.key === 'Backspace' && index > 0 && !otp[index] && inputRefs.current[index - 1]){
            inputRefs.current[index - 1].focus();
        }

        if(e.key === 'Backspace'){
            setShowSubmitButton(false)
        }
    }

    function clickHandler(index){
        inputRefs.current[index].setSelectionRange(1,1);
    }

    function submitHandler(e){
        e.preventDefault();
        const otpValue = otp.join("");
        dispatch(userRegistration(signUpFormData,otpValue,navigate));
        // console.log(otp.join(""));
        
    }

    return(
        <div className="mx-auto self-center">
            <form className="flex gap-4 p-5 flex-col"
            onSubmit={(e)=>submitHandler(e)}
            >
                <div className="flex gap-4 p-5">
                    {
                        otp.map((value,index)=>(
                            <input
                            ref={(input)=>inputRefs.current[index] = input} 
                            key={index}
                            value={value}
                            onChange={(e)=>changeHandler(e,index)}
                            onClick={()=>clickHandler(index)}
                            onKeyDown={(e)=>keyHandler(e,index)}
                            className="w-16 h-16 m-1 text-center bg-richblack-800 border-2 border-richblack-300 outline-none text-2xl font-semibold rounded-full text-richblack-5"
                            />
                        ))
                    }
                </div>

                <button
                type="submit"
                disabled={!showSubmitButton}
                className={`${showSubmitButton?"bg-yellow-50 text-richblack-900 ":'bg-richblack-700 text-richblack-25'}  font-semibold p-2 rounded-md`}
                >
                    verify email
                </button>
            </form>
        </div>
    )
}

export default OTPForm;