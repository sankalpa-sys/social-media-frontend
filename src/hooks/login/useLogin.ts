import { useState } from "react";
import {ILoginFormData} from "../../types";
import {publicApi} from "../../api/api";

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
            const res = await publicApi({
                data: {
                    email: formData.email,
                    password: formData.password,
                },
                method: "POST",
                url: "/auth/login"
            })
           try{
               localStorage.setItem("auth-token", res?.data)
           }catch (e) {
               console.log("cannot update local storage")
           }
            window.location.reload()
        }catch (e: any) {
            setError(e?.response.data)
        }finally{
            setLoading(false);
        }
    }

    return { loading, error, handleLogin };
};