import { useState } from "react";
import { useSelector } from "react-redux"
import { BsFillPencilFill } from "react-icons/bs"
import { FaCloudUploadAlt } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

function ImageUploader(){
    const {user} = useSelector((state)=>state.profile);
    const [imageFile, setImageFile] = useState(null)
    const [previewSource, setPreviewSource] = useState(null);

    const [loading,setLoading] = useState(false);

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        // console.log(file)
        if (file) {
        setImageFile(file)
        previewFile(file)
        }
    }

    const previewFile = (file) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            // console.log(reader.result);
        setPreviewSource(reader.result)
        }
    }

    const handleFileUpload = (e) => {
        e.preventDefault();
        try {
        setLoading(true)
        let formData = new FormData();
        formData.append("imageFile", imageFile)

        // for(var pair of formData.entries()) {
        //     console.log(pair);

        // }
        dispatch(updateDisplayPicture(token, formData)).then(() => {
            
            setLoading(false);
        })
        } catch (error) {
            setLoading(false);
            console.log("ERROR MESSAGE - ", error.message);
        
        }
    }

    return (
        <div className="relative">
            <div className="relative">
                <img 
                src={previewSource || user.profilepic}
                className="w-[150px] h-[150px] object-cover rounded-full border border-caribbeangreen-300"
                />
                {
                    imageFile && (<div
                        className="w-[150px] h-[150px] rounded-full absolute bg-black-900 top-0 opacity-80 border border-caribbeangreen-300"
                        ></div>)
                }
            </div>

            <input
            type="file"
            name="imageUpload"
            id="imageUpload"
            onChange={handleFileChange}
            className="hidden"
            accept="image/png, image/gif, image/jpeg"
            />

            <label htmlFor="imageUpload"
            className={`text-2xl cursor-pointer rounded-md font-semibold ${loading ? "pointer-events-none" : "pointer-events-auto"}`}
            >
                <div
                className={`absolute -bottom-2 left-2 bg-black-900 w-fit p-3 rounded-full text-white border border-orange-200 ${imageFile ? "hidden" : "block"}`}
                >
                    <BsFillPencilFill />
                </div>
            </label>

            {
                imageFile && (
                    <button
                    className={`absolute p-1 px-3 rounded-xl font-semibold ${loading ? "top-[33%] left-9" : "top-[34%] left-9"} cursor-pointer`}
                    >
                        {
                            loading ? (<div className="loader"></div>) : (<div className=" text-4xl bg-[#24d42a] p-2 rounded-full cursor-pointer text-richblack-900 border border-richblack-900"><FaCloudUploadAlt /></div>)
                        }
                    </button>
                )
            }

            {
                imageFile && (
                    <div className={`absolute text-white bg-[#b50909] p-2 rounded-full w-fit text-2xl font-bold top-0 cursor-pointer
                    ${loading ? "pointer-events-none" : "pointer-events-auto"}
                    `}
                    onClick={()=>{setImageFile(null)
                        setPreviewSource(user.profilepic)}}
                    >
                        <RxCross2 />
                    </div>
                )
            }

        </div>
    )
}

export default ImageUploader