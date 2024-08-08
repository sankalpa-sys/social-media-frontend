import {Button} from "antd";
import {useLogin} from "../../hooks/login/useLogin.ts";
import {ChangeEvent, FormEvent, useState} from "react";
import {ILoginFormData} from "../../types";
import {useNavigate} from "react-router-dom";
function Login() {
     const navigator = useNavigate()
    const { loading, error, handleLogin } = useLogin();
    const [formData, setFormData] = useState<ILoginFormData>({
        email: '',
        password: '',
    })
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        handleLogin(formData)
    }
    return (
        <div className='bg-black'>
            <div className='flex items-center justify-center h-screen w-full'>
                <form onSubmit={handleSubmit} className="max-w-md mx-auto w-full">
                    <h1 className="text-2xl font-semibold text-white max  py-10">Login to an existing account</h1>
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

                    <div className='py-3'>
                        <p className='text-red-600 text-xs py-2'>{error ? error: ""}</p>
                        <Button loading={loading} htmlType='submit' type='primary'>Submit</Button>
                    </div>
                    <p className='text-white text-xs py-6'>Don't have an account?  <span onClick={()=>navigator("/register")} className='text-blue-600 underline pl-1 cursor-pointer hover:scale-105'>Register now</span></p>
                </form>

            </div>
        </div>
    );
}

export default Login;