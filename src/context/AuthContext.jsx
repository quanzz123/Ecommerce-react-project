import { createContext, useState } from "react";


export const AuthContext = createContext();

export default function AuthProvider({children}) {
    const [user, setUser] = useState(null);

    function signup(email, password) {
        const users = JSON.parse(localStorage.getItem("users") || "[]");

        const newUser = {email, password};
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        setUser(newUser);
    }

    return <AuthContext.Provider value={{signup}}>{children}</AuthContext.Provider>
}