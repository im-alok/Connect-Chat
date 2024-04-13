import Template from "../components/Common/Template";
import signup from '../Assets/Home5.jpg'
import Navbar from "../components/Common/Navbar";

function Signup(){
    return(
        <>
            <div >
                <Navbar />
            </div>
            <div className="w-full h-[calc(100vh-4.9rem)]">
                <Template 
                image={signup}
                customClasses={`flex-row-reverse`}
                formType={`signup`}
                />
            </div>
        </>
    )
}

export default Signup;