import { useAuth } from "@/hooks/auth.hook";
import { useUser } from "@/hooks/user.hook";
import { User } from "@/store/reducers/user/userSlice";
import { createContext, ReactNode } from "react"
import { ViewProps } from "react-native";


type AuthProviderProps = {
    children: ReactNode
}

type StateContextType = {
    state: "LOADING" | "SUCCESS" | "IDLE" | "ERROR" | "UNAUTORIZATION";
}

export const AuthContext = createContext<StateContextType | null>(null);
const AuthProvider : React.FC<AuthProviderProps> = ({ children }) => {
    const { } = useAuth();
    const { state } = useUser();
    return (
        <AuthContext.Provider value={{
            state,
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider