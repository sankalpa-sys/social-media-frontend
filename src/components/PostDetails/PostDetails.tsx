import {Button, Divider, Input, Modal} from "antd";
import {
    CheckCircleFilled,
    CommentOutlined,
    EllipsisOutlined, FireOutlined,
    HeartOutlined,
    SendOutlined
} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import {getUserName} from "../../utils.ts";
import {useEffect, useState} from "react";
import {privateApi} from "../../api/api.ts";
import CommentCard from "../CommentCard/CommentCard.tsx";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner.tsx";

function PostDetails({openModal, closeModal, post}:{openModal: boolean, closeModal: ()=>void, post: any}) {
    const navigator = useNavigate()
    const [comments, setComments] = useState<any>([])
    const [gettingComments, setGettingComments] = useState<boolean>(false)
    const [error, setError] = useState<string>("")
    const [inputValue, setInputValue] = useState<string>("")
    const [addingComment, setAddingComment] = useState<boolean>(false)

    const handleChange = (e:any) => {
        setInputValue(e.target.value)
    }

    const handleAddComment = async() => {
        setAddingComment(true)
        try{
            const res = await privateApi({
                url: `/comment/${post?._id}`,
                method: "POST",
                data: {
                    comment: inputValue
                }
            })
            // @ts-ignore
            setComments((prevState)=> {
                return [...prevState, res.data]
            })
            console.log(res.data)
        }catch (e) {
            console.log(e)
        }finally {
            setAddingComment(false)
        }
    }
    useEffect(()=> {
        const getComments = async () => {
            setGettingComments(true)
         try{
             const res = await privateApi({
                 url: `/comment/${post._id}`,
                 method: "GET"
             })
             setComments(res?.data)
         }catch (e:any) {
             setError(e.message)
         }finally {
             setGettingComments(false)
         }
        }
        getComments()
    },[])
    if(error){
        return (
            <div>
                error
            </div>
        )
    }
    return (
        <div>
                <Modal style={{left: "100px"}} className='post_details' width='1200px' footer={null} onCancel={closeModal} open={openModal} centered>
                  <section className='grid grid-cols-10  h-[90vh]'>
                      <div className='col-span-5 h-[90vh] bg-gray-800'>
                          <img className='h-full w-full object-cover' src={post?.img} alt=""/>
                      </div>
                  {/*    right section*/}

                      <div className='col-span-5 p-5 relative'>
                          <div className='header px-5 md:px-0 flex justify-between items-start'>
                              <div className='flex items-center space-x-2'>
                                  <img onClick={()=>navigator(`/profile/123`)} className='h-8 w-8 rounded-full object-cover cursor-pointer' src={post?.user?.profilePicture} alt=""/>
                                      <div className='flex space-x-2 items-center'>
                                          <p onClick={()=>navigator(`/profile/123`)} className='cursor-pointer hover:underline font-semibold'>{getUserName(post?.user?.name)}</p>
                                          <CheckCircleFilled className='text-blue-600' style={{fontSize: "10px"}} />
                                          <p>.</p>
                                          <p className='text-blue-600 hover:opacity-95 cursor-pointer font-semibold'>Follow</p>
                                      </div>
                              </div>
                                  <EllipsisOutlined
                                      style={{ fontSize: "20px" }}
                                  />
                          </div>
                          <Divider style={{backgroundColor: "gray"}}/>

                          <div className='space-y-5 overflow-y-scroll h-[60%] scrollbar-hide'>
                              {gettingComments ? (
                                  <LoadingSpinner title='Please wait'/>
                              ): <div className='space-y-4'>
                                  {comments.map((comment: any)=> (
                                      <CommentCard key={comment._id} comment={comment}/>
                                  ))}
                              </div> }
                          </div>
                          <div className='fixed bottom-20 w-[30vw]'>
                              <div className='flex items-center justify-between'>
                                  <div className='flex items-center space-x-4'>
                                          <HeartOutlined style={{ fontSize: '24px', cursor: 'pointer' }} />

                                      <CommentOutlined style={{fontSize: "24px", cursor:"pointer"}} />
                                      <SendOutlined style={{fontSize: "24px" , cursor:"pointer"}} />
                                  </div>
                                  <FireOutlined style={{fontSize: "24px", cursor:"pointer"}} />
                              </div>
                              <p className='font-bold pt-4'>455,677 likes</p>
                              <p className='pb-4 text-gray-400 text-xs'>12 hours ago</p>
                              <Divider style={{backgroundColor: "gray"}}/>
                             <div className='flex space-x-2'>
                                 <Input disabled={addingComment} onChange={handleChange} style={{backgroundColor: "#fff"}} placeholder='Add comment'/>
                                 <Button disabled={addingComment} type='primary' loading={addingComment} onClick={handleAddComment}>Post</Button>
                             </div>
                          </div>
                      </div>
                  </section>
                </Modal>
        </div>
    );
}

export default PostDetails;