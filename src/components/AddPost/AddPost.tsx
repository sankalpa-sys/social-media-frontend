import {Button, Divider, Input} from "antd";
import {FileGifOutlined, FileImageOutlined, MehOutlined} from "@ant-design/icons";
import {useState} from "react";
import ImageUpload from "../ImageUpload/ImageUpload";
import {privateApi} from "../../api/api";
import {useUser} from "../../context/userContext";


function AddPost({setFeeds}:{setFeeds: any}) {
    const locationString = localStorage.getItem("location");
    const location = locationString ? JSON.parse(locationString) : { country: "", city: "" };
    const { TextArea } = Input;
    const {user} = useUser()
    const[inputValue, setInputValue] = useState<string>("")
    const [imageUrl, setImageUrl] = useState<string>("");
    const handleChange = (e: any) => {
        setInputValue(e.target.value)
    }
    const handleClick = async () => {
        try{
            const res = await privateApi({
                data: {
                    desc: inputValue,
                    img: imageUrl,
                    country: location?.country,
                    city: location?.city
                },
                method: "POST",
                url: "/post/create"
            })
            setFeeds((prevFeeds: any) => [res.data, ...prevFeeds])
            setInputValue("")
            setImageUrl("")
        }catch (e) {
            console.log(e)
        }
    }
    return (
        <div className='md:w-[50%] w-full px-5 md:px-0 md:py-10 '>
            <div className='flex space-x-3'>
                <img className='h-8 w-8 rounded-full object-cover' src={user?.profilePicture} alt=""/>
                <TextArea value={inputValue} onChange={handleChange} className='addPostArea' style={{backgroundColor:"black", color:"white", resize: 'none', border:"none", fontSize:"20px"}}  placeholder={`What's on your mind?`} rows={3} />
            </div>
            {imageUrl && <img className='h-72 w-72 object-cover rounded-md mt-4 pl-12' src={imageUrl} alt=""/>}
            <div className='md:pl-12'>
                <Divider style={{backgroundColor:"white"}}/>
            </div>
            <div className='md:pl-12 flex items-center justify-between'>
               <div className='flex items-center space-x-4'>
                   <ImageUpload onImageUpload={setImageUrl}>
                       <FileImageOutlined  style={{fontSize:"20px",  color:"green", cursor:"pointer"}} />
                   </ImageUpload>

                   <FileGifOutlined style={{fontSize:"20px", color:"red", cursor:"pointer"}} />
                   <MehOutlined style={{fontSize:"20px", color:"orange", cursor:"pointer"}} />
               </div>
                <Button onClick={handleClick} className='post-btn' disabled={inputValue.length === 0} type="primary">Post</Button>
            </div>
            <div className='md:pl-12'>
                <Divider style={{backgroundColor:"white"}}/>
            </div>
        </div>
    );
}

export default AddPost;