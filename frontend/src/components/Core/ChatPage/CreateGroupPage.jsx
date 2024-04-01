import { useEffect, useState } from 'react';
import {useForm} from 'react-hook-form';
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from 'react-redux';
import { setShowCreateGroupField } from '../../../slices/conversationSlice';
import { searchPeople } from '../../../services/Operations/userOperation';

function CreateGroupPage({groupData , isEdit}){
    const [loading,setLoading] = useState(false);
    const {token} = useSelector((state)=>state.auth);
    const [searchData,setSearchData] = useState([]);

    async function changeHandler(e){
        setLoading(true);
        const searchKeyword = e.target.value;
        // console.log(searchKeyword)
        if(searchKeyword === ""){
            return;
        }
        const response = await searchPeople(searchKeyword,token);
        // console.log(response);
        
        if(response)
            setSearchData(response);
        setLoading(false);
    }
    const dispatch = useDispatch();
    const {
        getValues,
        setValue,
        register,
        formState:{errors},
        handleSubmit
    } = useForm();


    return(
        <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-richblack-900 bg-opacity-50 backdrop-blur-sm">
            <div className='bg-richblack-900 min-w-[600px] min-h-[650px] rounded-md flex flex-col gap-2 p-7'>
                
                <div className='flex items-center justify-between'>
                    <h1 className=''>Create Group</h1>
                    <div className=' p-2 bg-orange-200 rounded-full font-bold cursor-pointer'
                    onClick={()=>dispatch(setShowCreateGroupField(false))}
                    >
                        <RxCross1 
                        className=''
                        />
                    </div>
                </div>

                <form
                className='flex flex-col gap-5'
                >  
                    <div className='flex flex-col gap-2'>
                        <label className="lable-style">
                            Group Name<span className="text-pink-200 text-lg">*</span>
                        </label>

                        <div className='flex flex-col gap-1'>
                            <input 
                            type='text'
                            id='groupName'
                            placeholder='enter group name'
                            {...register('groupName',{required:true})}
                            className='form-style'
                            />
                            {
                                errors.groupName && (<span className='text-yellow-50'>This field is requied</span>)
                            }
                        </div>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label className="lable-style">
                            Add people<span className="text-pink-200 text-lg">*</span>
                        </label>

                        <input
                        disabled={loading} 
                        id="searchBar"
                        name="searchBar"
                        type="text"
                        onChange={changeHandler}
                        placeholder="enter name/username/email"
                        className="form-style"
                        />
                        <div className='bg-white'>
                            {
                                loading?(<div className="flex items-center justify-center"><div className="loader"></div></div>)
                                    :(
                                        searchData.length !== 0
                                                    ?(
                                                        <div className='flex flex-col gap-2 p-3'>
                                                            {
                                                                searchData.map((user)=>(
                                                                    <div className='flex items-center gap-2'>
                                                                        <img 
                                                                        src={user.profilepic}
                                                                        className='w-[50px] h-[50px] rounded-full object-cover'
                                                                        />
                                                                        <div className='flex flex-col'>
                                                                            <p>{user.username}</p>
                                                                            <p>{user.email}</p>
                                                                        </div>
                                                                    </div>
                                                                ))
                                                            }
                                                        </div>
                                                    )
                                                    :("")
                                    )
                                
                            }
                        </div>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default CreateGroupPage;