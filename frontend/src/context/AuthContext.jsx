import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLogin, setIsLogin] = useState(false);
    const [userData, setUserData] = useState([])
    return (
        <AuthContext.Provider value={{ userData, setUserData, isLogin, setIsLogin }}>{children}</AuthContext.Provider>
    );
};


// const [btnLogin, setBtnLogin] = useState(false)
// btnLogin,