import {createContext, useContext} from "react";

type IUser = {
    user: any
    setUser: (value: any) => void;
    loading: boolean;
    error: string;
}

export const UserContext = createContext<IUser | undefined>(undefined);

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};


