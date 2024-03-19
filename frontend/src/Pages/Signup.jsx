import Template from "../components/Common/Template";
import signup from '../Assets/Home5.jpg'

function Signup(){
    return(
        <Template 
        image={signup}
        customClasses={``}
        formType={`signup`}
        />
        
    )
}

export default Signup;