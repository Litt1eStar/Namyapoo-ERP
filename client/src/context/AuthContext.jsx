import { createContext, useContext , useEffect, useState} from "react";
import Cookies from 'js-cookie'
import toast from "react-hot-toast";

const AuthContext = createContext();

export const useAuthContext = () => {
    return useContext(AuthContext)
}

export const AuthContextProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(Cookies.get('token'))
    
    const getUser = async() => {
        try {
            const res = await fetch(`/api/user/getUser`);
            const data = await res.json();
            if(data.error)
                throw new Error(data.error)
            setAuthUser(data)
        } catch (error) {
            toast.error(error.message)
        }
    }
    console.log(authUser)
    useEffect(()=>{
        getUser();
    },[])
    return (
        <AuthContext.Provider value={{authUser, setAuthUser}}>
            { children }
        </AuthContext.Provider>
    )
}