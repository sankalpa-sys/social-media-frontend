import {Button} from "antd";
import {ChangeEvent, FormEvent, useState} from "react";
import {IRegisterFormData} from "../../types";
import {useRegister} from "../../hooks/register/useRegister";
import {useNavigate} from "react-router-dom";

function Register() {
     const navigator = useNavigate()
    const { loading, error, handleRegister } = useRegister();
    const [formData, setFormData] = useState<IRegisterFormData>({
        name: '',
        email: '',
        password: '',
        repeat_password: ''
    })
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        handleRegister(formData);
    }
    return (
       <div className='bg-black'>
           <div className='flex items-center justify-center h-screen w-full'>
               <form onSubmit={handleSubmit} className="max-w-md mx-auto w-full">
                   <h1 className="text-2xl font-semibold text-white max  py-10">Create a new Account</h1>
                   <div className="relative z-0 w-full mb-5 group">
                       <input onChange={handleChange} type="text" name="name" id="name"
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder=" " required/>
                       <label htmlFor="name"
                              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Full name</label>
                   </div>
                   <div className="relative z-0 w-full mb-5 group">
                       <input onChange={handleChange} type="email" name="email" id="email"
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder=" " required/>
                       <label htmlFor="email"
                              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email
                           address</label>
                   </div>
                   <div className="relative z-0 w-full mb-5 group">
                       <input onChange={handleChange} type="password" name="password" id="password"
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder=" " required/>
                       <label htmlFor="password"
                              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                   </div>
                   <div className="relative z-0 w-full mb-5 group">
                       <input onChange={handleChange} type="password" name="repeat_password" id="repeat_password"
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder=" " required/>
                       <label htmlFor="repeat_password"
                              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm
                           password</label>
                   </div>
                   <p className='text-red-600 text-xs py-2'>{error ? error: ""}</p>
                   <Button loading={loading} htmlType='submit' type='primary'>Submit</Button>
                   <p className='text-white text-xs py-6'>Already have an account?  <span onClick={()=>navigator("/login")} className='text-blue-600 underline pl-1 cursor-pointer hover:scale-105'>Login</span></p>
               </form>

           </div>
       </div>
    );
}

export default Register;