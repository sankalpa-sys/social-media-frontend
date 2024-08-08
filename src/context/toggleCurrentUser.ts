import {createContext, useContext} from "react";
type TToggleCurrentUser = {
    toggler:boolean;
    setToggler: (value: boolean) => void;

}

export const ToggleCurrentUser = createContext<TToggleCurrentUser|undefined>(undefined);

export const useToggleCurrentUser = () => {
    const context = useContext(ToggleCurrentUser);
    if (context === undefined) {
        throw new Error('useToggleCurrentUser must be used within a ToggleCurrentUser');
    }
    return context;
};


