import {Button, Form, FormProps, Input} from "antd";
import ImageUpload from "../ImageUpload/ImageUpload.tsx";
import {useState} from "react";
import {UploadOutlined} from "@ant-design/icons";
import {privateApi} from "../../api/api.ts";

function EditProfile({user, getUserProfile, setOpenEditProfileModal}) {
const [imageUrl, setImageUrl] = useState<string>(user?.profilePicture)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>("")
    const defaultValue: {
        name?: string,
        bio?: string,
        profilePicture?: string
    } = {
        name: user?.name,
        bio: user?.bio,
        profilePicture: user?.profilePicture
    }

    const onFinish: FormProps['onFinish'] = async (values) => {
    setLoading(true)
       try{
           const res = await privateApi({
               url: `/user/${user?._id}`,
               method: "PUT",
               data: {
                   profilePicture: imageUrl,
                   name: values.name,
                   bio: values.bio
               }
           })
           setOpenEditProfileModal(false)
           getUserProfile()
       }catch (e) {
           setError(e)
       }finally {
           setLoading(false)
       }
    };

    const onFinishFailed: FormProps['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className='text-white'>
            <h1 className='text-lg font-semibold pb-4'>Edit Profile</h1>
            <Form
                layout='vertical'
                name="basic"
                initialValues={{ name: defaultValue?.name, bio: defaultValue?.bio }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label=""
                    name="name"
                >
                    <Input placeholder='Username' />
                </Form.Item>

                <Form.Item
                    name="bio"
                >
                    <Input.TextArea rows={3} placeholder='bio' />
                </Form.Item>

                {imageUrl && (
                    <div>

                    </div>
                )}

               <div className='flex items-center space-x-5 pb-4'>
                   <ImageUpload onImageUpload={setImageUrl}>
                       <Button icon={<UploadOutlined/>}>Profile Picture</Button>
                   </ImageUpload>

                   {imageUrl && <img className='h-12 w-12 object-cover rounded-full' src={imageUrl} alt=""/>}

               </div>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default EditProfile;