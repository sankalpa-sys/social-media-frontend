import { useState } from "react";
import axios from "axios";
import {IRegisterFormData} from "../../types";
import {useLogin} from "../login/useLogin.ts";

export const useRegister = () => {
    const {handleLogin} = useLogin();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const handleRegister = async(formData: IRegisterFormData) => {
        try{
            setError("")
            setLoading(true);
          const res = await axios.post("http://localhost:8000/api/auth/register", {
            name: formData.name,
            email: formData.email,
            password: formData.password,
          });
            handleLogin({
                email: res?.data.email,
                password: res?.data?.password
            })
        }catch (e: any) {
            setError(e)
        }finally{
            setLoading(false);
        }
    }

    return { loading, error, handleRegister };
};