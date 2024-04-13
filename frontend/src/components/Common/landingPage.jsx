function LandingPage(){
    return (
        <div className="w-full sm:flex sm:w-[calc(100vw-450px)] min-h-[calc(100vh-7.0rem)] bg-richblack-800 sm:m-4 border-2 border-r-richblack-900 justify-center items-center flex-col-reverse gap-7 p-5 sm:p-0">
            <p className="text-lg sm:text-xl text-pink-300  sm:flex">Single place to connect  millions ❤️</p>
            <h1 className="sm:text-5xl text-2xl  sm:flex">Welcome to Connect - Chat</h1>
            <div className="loaderl hidden sm:flex"></div>
        </div>
    )
}

export default LandingPage;