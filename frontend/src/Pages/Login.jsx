import Template from "../components/Common/Template";
import login from '../Assets/login2.jpg'
import Navbar from "../components/Common/Navbar";


function Login(){
    return(
        <>
            <div >
                <Navbar />
            </div>

            <div className="w-full h-[calc(100vh-4.9rem)]">
                <Template 
                image={login}
                formType={'login'}
                />
            </div>
        </>
    )
}

export default Login