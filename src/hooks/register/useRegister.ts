import { useState } from "react";
import {IRegisterFormData} from "../../types";
import {useLogin} from "../login/useLogin.ts";
import {publicApi} from "../../api/api";

export const useRegister = () => {
    const {handleLogin} = useLogin();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const handleRegister = async(formData: IRegisterFormData, imageUrl: string) => {
        try{
            setError("")
            setLoading(true);
            const res = await publicApi({
                data: {
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    profilePicture: imageUrl
                },
                method: "POST",
                url: "/auth/register/"
            })
            if(res.status === 201){
                handleLogin({email: formData.email, password: formData.password})
            }
        }catch (e: any) {
            setError(e)
        }finally{
            setLoading(false);
        }
    }

    return { loading, error, handleRegister };
};