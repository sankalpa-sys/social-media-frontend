import {Button, Divider, Input} from "antd";
import {FileGifOutlined, FileImageOutlined, MehOutlined} from "@ant-design/icons";
import {useState} from "react";
import axios from "axios";
import ImageUpload from "../ImageUpload/ImageUpload";


function AddPost({setFeeds}:{setFeeds: any}) {
    const { TextArea } = Input;
    const[inputValue, setInputValue] = useState<string>("")
    const [imageUrl, setImageUrl] = useState(null);
    const [uploading, setUploading] = useState<boolean>(false);
    const handleChange = (e) => {
        setInputValue(e.target.value)
    }
    const handleClick = async () => {
        try{
            const res = await axios.post("http://localhost:8000/api/post/create", {desc: inputValue, img: imageUrl}, {
                headers: {
                    "auth-token": `Bearer ${localStorage.getItem("auth-token")}`
                }
            })
            setFeeds((prevFeeds) => [res.data, ...prevFeeds])
            setInputValue("")
            setImageUrl(null)
        }catch (e) {
            console.log(e)
        }
    }
    return (
        <div className='w-[50%] py-10'>
            <div className='flex space-x-3'>
                <img className='h-8 w-8 rounded-full object-cover' src="https://images.pexels.com/photos/14799459/pexels-photo-14799459.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt=""/>
                <TextArea value={inputValue} onChange={handleChange} className='addPostArea' style={{backgroundColor:"black", color:"white", resize: 'none', border:"none", fontSize:"20px"}}  placeholder={`What's on your mind?`} rows={3} />
            </div>
            {imageUrl && <img className='h-96 w-96 object-cover rounded-md mt-4' src={imageUrl} alt=""/>}
            <div className='pl-12'>
                <Divider style={{backgroundColor:"white"}}/>
            </div>
            <div className='pl-12 flex items-center justify-between'>
               <div className='flex items-center space-x-4'>
                   <ImageUpload onImageUpload={setImageUrl}>
                       <FileImageOutlined  style={{fontSize:"20px",  color:"green", cursor:"pointer"}} />
                   </ImageUpload>

                   <FileGifOutlined style={{fontSize:"20px", color:"red", cursor:"pointer"}} />
                   <MehOutlined style={{fontSize:"20px", color:"orange", cursor:"pointer"}} />
               </div>
                <Button onClick={handleClick} className='post-btn' disabled={inputValue.length === 0 || uploading} type="primary">Post</Button>
            </div>
            <div className='pl-12'>
                <Divider style={{backgroundColor:"white"}}/>
            </div>
        </div>
    );
}

export default AddPost;