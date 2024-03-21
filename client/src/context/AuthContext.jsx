import { createContext, useContext , useState} from "react";
import Cookies from 'js-cookie'

const AuthContext = createContext();

export const useAuthContext = () => {
    return useContext(AuthContext)
}

export const AuthContextProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(Cookies.get('token'))
    console.log(authUser)
    return (
        <AuthContext.Provider value={{authUser, setAuthUser}}>
            { children }
        </AuthContext.Provider>
    )
}