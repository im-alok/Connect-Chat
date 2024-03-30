import { RxCross2 } from "react-icons/rx";
import { IoSearch } from "react-icons/io5";
import { useEffect, useState } from "react";
import { searchPeople } from "../services/Operations/userOperation";
import { useSelector } from "react-redux";
function Search({setOpenSearchMenu}){
    const [searchKeyword,setSearchKeyword] = useState();
    const {token} = useSelector((state)=>state.auth);
    const[searchData,setSearchData] = useState([]);

    useEffect(()=>{
        async function getUserData(){
            const response = await searchPeople(searchKeyword,token);
            setSearchData(response);
        }
        if(searchKeyword === ""){
            return;
        }

        setTimeout(()=>getUserData(),900);

    },[searchKeyword])

    function changeHandler(e){
        const name = e.target.value;
        setSearchKeyword(name);
    }

    return (
        <div className="w-[25%] fixed inset-0 z-[1000] !mt-0  overflow-auto bg-orange-200  backdrop-blur-sm">
            <div className="flex flex-col gap-7 p-2">
                <div className="mt-10 p-2 flex items-center justify-between text-2xl font-bold">
                    <h1 className="">Search User</h1>
                    <RxCross2 className="text-3xl font-extrabold bg-pink-700 text-richblack-5 p-2 rounded-full cursor-pointer"
                    onClick={()=>setOpenSearchMenu(false)}
                    />

                </div>
                <div className="flex items-center justify-between">
                    <input 
                    id="searchBar"
                    name="searchBar"
                    type="text"
                    onChange={changeHandler}
                    placeholder="enter name/username/email"
                    className="rounded-lg bg-richblack-25 p-3 py-2 text-[16px] leading-[24px] text-richblack-900 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-800 focus:outline-none w-[300px]"
                    />
                    
                    <div className="cursor-pointer bg-richblack-200 p-2 rounded-full">
                        <IoSearch 
                        className="text-3xl "
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Search;