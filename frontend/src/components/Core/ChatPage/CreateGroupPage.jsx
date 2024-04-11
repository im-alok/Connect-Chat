import { useEffect, useState } from 'react';
import {useForm} from 'react-hook-form';
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from 'react-redux';
import { setShowCreateGroupField } from '../../../slices/conversationSlice';
import { searchPeople } from '../../../services/Operations/userOperation';
import { MdCancel } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import ButtonIcon from '../../Common/ButtonIcon';
import { createGroup, editGroup } from '../../../services/Operations/chatOperation';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import ImageUploader from '../Profile/Dashboard/ImageUploader';

function CreateGroupPage({groupData , isEdit=false}){
    const [loading,setLoading] = useState(false);
    const {token} = useSelector((state)=>state.auth);
    const [searchData,setSearchData] = useState([]);
    const [members,setMembers] = useState([]);
    // console.log(members)
    // console.log(loading)

    const {groupId} = useParams();
    const dispatch = useDispatch();
    const {
        getValues,
        setValue,
        register,
        formState:{errors},
        handleSubmit
    } = useForm();

    useEffect(()=>{
        if(isEdit){
            setValue('groupName',groupData.groupName);
            setMembers(groupData.users);

        }
    },[])

    async function changeHandler(e){
        const searchKeyword = e.target.value;
        // console.log(searchKeyword)
        if(searchKeyword === ""){
            setSearchData([]);
            return;
        }
        const response = await searchPeople(searchKeyword,token);
        // console.log(response);
        
        if(response)
            setSearchData(response);
    }

    function clickHandler(user){
        const temp = [...members];
        temp.push(user);
        setMembers(temp);
        document.getElementById('searchBar').value = "";
        setSearchData([]);
    }

    function cancelHandler(){
        const input = document.getElementById('searchBar');
        input.value = "";
        setSearchData([]);
    }

    function removeHandler(user){
        const data = members.filter((member)=>member._id !== user._id);
        setMembers(data);
    }

    async function submitHandler(e){
        if(members.length <=1){
            toast.error('please select atleast 2 member to create group');
            return;
        }
        const values = getValues();
        
        setLoading(true);
        const groupMembers = members.map((member)=>member._id);
        // console.log(groupMembers);
        const response = await createGroup(token,values.groupName,JSON.stringify(groupMembers),dispatch);
        if(response){
            toast.success('group created');
            setValue('groupName',"");
            setMembers([]);

        }
        // console.log(JSON.stringify(groupMembers));
        setLoading(false);
        
        dispatch(setShowCreateGroupField(false));
        
    }

    async function editHandler(e){
        if(members.length <=1){
            toast.error('please select atleast 2 member to create group');
            return;
        }
        const values = getValues();
        
        setLoading(true);
        const groupMembers = members.map((member)=>member._id);
        // console.log(groupMembers);
        const response = await editGroup(token,values.groupName,JSON.stringify(groupMembers),groupId,dispatch);
        if(response){
            toast.success('group created');
            setValue('groupName',"");
            setMembers([]);

        }
        // console.log(JSON.stringify(groupMembers));
        setLoading(false);
        
        dispatch(setShowCreateGroupField(false));
        
    }

    return(
        <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-richblack-900 bg-opacity-50 backdrop-blur-sm">
            <div className='bg-richblack-900 max-w-[600px] min-w-[600px] min-h-[650px] rounded-md flex flex-col gap-2 p-7 border border-yellow-50 shadow-[0px_0px_15px_5px] shadow-richblue-100'>
                
                <div className='flex items-center justify-between'>
                    <h1 className=''>{!isEdit ? ("Create Group") : ('edit group')}</h1>
                    <div className=' p-2 bg-orange-200 rounded-full font-bold cursor-pointer'
                    onClick={()=>dispatch(setShowCreateGroupField(false))}
                    >
                        <RxCross1 
                        className=''
                        />
                    </div>
                </div>

                <div className='w-full flex justify-center'>
                    {
                        isEdit && (<ImageUploader isGroup={true}/>)
                    }
                </div>
                <form
                className='flex flex-col gap-5'
                onSubmit={!isEdit ? (handleSubmit(submitHandler)) : (handleSubmit(editHandler))}
                >  
                    {/* groupName */}

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
                    
                    {/* AddProple */}

                    <div className='flex flex-col gap-2'>
                        <label className="lable-style">
                            Add people<span className="text-pink-200 text-lg">*</span>
                        </label>

                        <div className='relative flex flex-col gap-2'>

                            {/* search bar and cancel button */}

                            <div className='flex justify-between items-center'>
                                <input
                                disabled={loading}
                                id="searchBar"
                                name="searchBar"
                                type="text"
                                onChange={changeHandler}
                                placeholder="enter name/username/email"
                                className={`form-style w-[90%]`}
                                />
                                <div
                                className='text-xl font-extrabold text-richblack-5 cursor-pointer'
                                onClick={()=>cancelHandler()}
                                >
                                    <MdCancel />
                                </div>
                            </div>
                            
                            {/* show users */}

                            <div className='top-16 absolute z-[200]  w-[90%] max-h-[250px] bg-white rounded-lg overflow-auto'>
                                {
                                    searchData.length !== 0
                                        ?(
                                            <div className='flex flex-col gap-2 p-3 '>
                                                {
                                                    searchData.map((user)=>(
                                                    <div className={`flex items-center gap-2 hover:bg-pink-100 p-1 rounded-md ${members.some((u)=>u._id === user._id)?" bg-caribbeangreen-100 pointer-events-none cursor-none":"pointer-events-auto"}`}
                                                    onClick={()=>clickHandler(user)}
                                                    >
                                                        <img 
                                                        src={user.profilepic}
                                                        className='w-[30px] h-[30px] rounded-full object-cover'
                                                        />
                                                        <div className='flex flex-col'>
                                                            <p className='text-sm font-bold'>{user.username}</p>
                                                            <p className='text-xs'>{user.email}</p>
                                                        </div>
                                                    </div>)
                                                    )
                                                }
                                            </div>
            
                                        ):("")
                                    
                                }
                            </div>
                        </div>
                    </div>

                    {/* show added people */}
                    <div className=''>
                        {
                            members.length === 0 ?("")
                                    :(
                                        <div className='flex flex-wrap gap-3 w-[95%] max-h-[200px] overflow-auto p-2'>
                                            {
                                                members.map((member,index)=>(
                                                    <div key={index}
                                                    className='relative bg-yellow-100 rounded-lg'
                                                    >
                                                
                                                        <p className='text-richblack-900 px-2 py-1 text-sm font-semibold'>{member.username}</p>

                                                        <div className='absolute text-[#b32227] -top-1 -right-2 cursor-pointer font-extrabold text-lg'
                                                        onClick={()=>removeHandler(member)}
                                                        >
                                                            <FaTrash />
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    )
                        }
                    </div>

                    {/* submit button */}
                    <div>
                        {
                            !isEdit ? (
                                <button
                                type='submit'
                                disabled={loading}
                                className='flex items-center bg-yellow-50 cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 w-full justify-center active:scale-90'
                                >
                                    create group
                                </button>
                            )
                            :(
                                <button
                                type='submit'
                                disabled={loading}
                                className='flex items-center bg-yellow-50 cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 w-full justify-center active:scale-90'
                                >
                                    {
                                        loading ? 'changing...' : "save changes"
                                    }
                                </button>
                            )
                        }
                    </div>
                </form>

            </div>
        </div>
    )
}

export default CreateGroupPage;