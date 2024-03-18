import Template from "../components/Common/Template";
import login from '../Assets/login2.jpg'


function Login(){
    return(
        <div className="w-full h-full">
            <Template 
            image={login}
            formType={'login'}
            />
        </div>
    )
}

export default Login