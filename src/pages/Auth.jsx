import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../context/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
export default function Auth() {
    const [mode, setMode] = useState('signup');
    const [error, setError] = useState(null)
    const { register, handleSubmit , formState: { errors }} = useForm();
    const {signup, user,logout,login} = useContext(AuthContext);
    const navigate = useNavigate();

    // hàm khi ấn submit thì form gửi lên data gồm pass và email
    function onSubmit(data) {
        setError(null)
        let result;
        //kiểm tra mode(chế độ)
        //nếu mode === signup
        if(mode === "signup") {

            result = signup(data.email, data.password); // đăng kí
        }  else {
            result = login(data.email, data.password); // đăng nhập
        }
        // trong AuthContext các hàm sẽ trả success là true or false, và biến error chưa cảnh báo
        if(result.success) {
            navigate("/");
        } else {
            setError(result.error)
        }
        console.log(result)
    }
    return (
        <div className="page">
            <div className="container">
                
                <div className="auth-container">
                    <h1 className="page-title">{mode === 'signup' ? 'Sign Up' : 'Login'}</h1>
                    {user && <p>User login in {user.email}</p>}
                    <button onClick={() => logout()}>logout</button>
                    <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
                        {error && <div className="error-message">{error}</div>}
                        <div className="form-group">
                            <label className="form-label" htmlFor="email">Email</label>
                            <input className="form-input" type="email" id="email" {...register('email',{required: "Email is required"})} />
                            {errors.email && (
                                <span className='form-error'>{errors.email.message}</span>
                            )}
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="password">Password</label>
                            <input className="form-input" type="password" id="password" {...register('password',{
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters"
                                },
                                maxLength: {
                                    value: 20,
                                    message: "Password must be less than 20 characters"
                                }
                            })} />
                            {errors.password && (
                                <span className='form-error'>{errors.password.message}</span>
                            )}
                        </div>
                        <button className="btn btn-primary btn-large" type="submit">{mode === 'signup' ? 'Sign Up' : 'Login'}</button>
                    </form>
                    <div className="auth-switch">
                        {
                            mode === "signup" ? (
                                 <p>Already have an account?{" "}
                                    <span className="auth-link" onClick={() => setMode("login")}>Login</span>
                                </p>
                            ) : (
                                 <p>Don't have an account?{" "}
                                    <span className="auth-link" onClick={() => setMode("signup")}>Sign Up</span>
                                </p>
                            )
                        }
                       
                    </div>
                </div>
            </div>
        </div>
    )
}