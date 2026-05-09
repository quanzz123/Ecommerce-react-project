import { createContext, use, useState } from "react";


export const AuthContext = createContext();

export default function AuthProvider({children}) {
    const [user, setUser] = useState(
        localStorage.getItem("currentUserEmail") // nếu người dùng đã đăng nhập thì dùng email có trong localstorage
        ? {email: localStorage.getItem("currentUserEmail")}
        : null // ngược lại chưa có thì user = null
    );

    function signup(email, password) {
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        
        //kiểm tra email mới nhập dã tồn tại hay chưa
        if(users.find((u) => u.email === email)) {
            return {success: false, error: "Email already exits"};
        }
        

        const newUser = {email, password};
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        // lưu vào storage một email hiện tại 
        localStorage.setItem("currentUserEmail", email);
        setUser(newUser);

        // khi người dung đăng kí thì setUser là email, cập nhật state user thành một object
        setUser({email})
        return {success: true}
    }
    function login(email, password) {
        // lấy ra các user được lưu trong localstorage

        const users = JSON.parse(localStorage.getItem("users") || "[]");
        // tìm user vừa đăng nhập
        const user = users.find((u) => u.email === email && u.password === password);

        // kiểm tra không khớp thì báo lõi
        if(!user) {
            return {
                success: false,
                error: "Invalid email or password"

            }
        }
        //nếu đúng thì set trong localstorage currentUserEmail
        localStorage.setItem("currentUserEmail", email);
        setUser({email});
        return {
            success: true,
            
        }

    }
    function logout() {
        localStorage.removeItem("currentUserEmail");
        setUser(null);
    }

    return <AuthContext.Provider value={{signup, user,logout, login}}>{children}</AuthContext.Provider>
}