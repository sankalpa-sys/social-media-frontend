import {createContext, useContext} from "react";

export const ToggleCurrentUser = createContext(undefined);

export const useToggleCurrentUser = () => {
    const context = useContext(ToggleCurrentUser);
    if (context === undefined) {
        throw new Error('useToggleCurrentUser must be used within a ToggleCurrentUser');
    }
    return context;
};


