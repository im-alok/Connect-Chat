import Template from "../components/Common/Template";
import signup from '../Assets/Home5.jpg'

function Signup(){
    return(
        <Template 
        image={signup}
        customClasses={`flex-row-reverse`}
        formType={`signup`}
        />
        
    )
}

export default Signup;