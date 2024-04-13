import { RxCross2 } from "react-icons/rx";
import { IoSearch } from "react-icons/io5";
import { useEffect, useState } from "react";
import { searchPeople } from "../services/Operations/userOperation";
import { useSelector } from "react-redux";
import Users from "../components/Core/Search people/Users";
import toast from "react-hot-toast";
function Search({setOpenSearchMenu,fullScreen=false}){
    const [searchKeyword,setSearchKeyword] = useState();
    const {token} = useSelector((state)=>state.auth);
    const[searchData,setSearchData] = useState([]);
    const [loading,setLoading] = useState(false);

    // useEffect(()=>{
    //     async function getUserData(){
    //         const response = await searchPeople(searchKeyword,token);
    //         console.log(response);
    //         setSearchData(response);
    //     }
    //     if(searchKeyword === ""){
    //         return;
    //     }

    //     setTimeout(()=>getUserData(),900);

    // },[searchKeyword])

    // console.log(searchKeyword)

    async function submitHandler(){
        setLoading(true);
        // console.log(searchKeyword)
        if(searchKeyword == "" || searchKeyword == undefined){
            toast.error('enter the values to search')
            setLoading(false)
            return;
        }
        const response = await searchPeople(searchKeyword,token);
        // console.log(response);
        
        if(response)
            setSearchData(response);
        setSearchKeyword(null);
        setLoading(false);
        // console.log(response)
    }

    async function keyDownHandler(e){
        if(e.key === 'Enter')
            await submitHandler();
    }

    function changeHandler(e){
        const name = e.target.value;
        setSearchKeyword(name);
        // console.log(name)
    }
    // console.log(searchData);
    return (
        <div className={`${!fullScreen ? "sm:w-[25%] fixed inset-0 z-[1000] !mt-0  overflow-auto bg-orange-200  backdrop-blur-sm" : "sm:mt-0 mt-5"}`}>
            <div className="flex flex-col gap-5 sm:gap-7 p-2">
                <div className={`${!fullScreen ? 'mt-12 sm:mt-10 ' :'mt-0'} p-2 flex items-center justify-between text-2xl font-bold`}>
                    <h2 className="text-richblack-25 font-medium">Search Users:</h2>
                    
                    {
                        !fullScreen && (
                            <RxCross2 className="text-3xl font-extrabold bg-pink-700 text-richblack-5 p-2 rounded-full cursor-pointer"
                            onClick={()=>setOpenSearchMenu(false)}
                            />
                        )
                    }

                </div>
                <div className="flex items-center justify-between gap-3 sm:gap-0">
                    <input
                    disabled={loading} 
                    id="searchBar"
                    name="searchBar"
                    type="text"
                    onKeyDown={(e)=>keyDownHandler(e)}
                    onChange={changeHandler}
                    placeholder="enter name/username/email"
                    className={`rounded-lg bg-richblack-25 p-3 py-2 text-[16px] leading-[24px] text-richblack-900 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-800 focus:outline-none ${!fullScreen ? "w-[300px]" : "w-[300px] sm:w-[90%]"}`}
                    />
                    
                    <div className={`${loading?"pointer-events-none":"cursor-pointer"} cursor-pointer bg-richblack-200 p-2 rounded-full`}
                    onClick={submitHandler}
                    >
                        <IoSearch 
                        className="text-3xl "
                        />
                    </div>
                </div>

                <div>
                    
                    {
                        loading?(<div className="flex items-center justify-center"><div className="loader"></div></div>)
                            :(
                                searchData.length !== 0
                                            ?(<Users searchData={searchData} setOpenSearchMenu={setOpenSearchMenu}/>):("")
                            )
                            
                    }
                </div>
            </div>
        </div>
    )
}

export default Search;