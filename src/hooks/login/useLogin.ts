import { useState } from "react";
import axios from "axios";
import {ILoginFormData} from "../../types";

interface IReturnType {
    loading: boolean;
    error: string;
    handleLogin: (formData: ILoginFormData) => void;
}

export const useLogin = (): IReturnType => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const handleLogin = async(formData: ILoginFormData) => {
        try{
            setError("")
            setLoading(true);
            const res = await axios.post("http://localhost:8000/api/auth/login", {
                email: formData.email,
                password: formData.password,
            });
            localStorage.setItem("auth-token", res.data)
            window.location.reload()
        }catch (e: any) {
            setError(e?.response.data)
        }finally{
            setLoading(false);
        }
    }

    return { loading, error, handleLogin };
};