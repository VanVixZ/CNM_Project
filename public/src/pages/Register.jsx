import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from "styled-components";
import Logo from "../assets/logoZalo.png";
import { ToastContainer ,toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import {registerRoute} from '../untils/APIRoutes';

function Register() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        username: "",
        phone: "",
        password: "",
        confirmPassword: ""
    });
    // useEffect(() => {
    //     if (localStorage.getItem("chat-app-user")) {
    //         navigate("/");
    //     }
    // }, []);
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (handleValidate()) {
            
            const {username, phone, password} = values;
            try {
                const { data } = await axios.post(registerRoute, {
                    username,
                    phone,
                    password,
                });
                if (data.status === false) {
                    toast.error(data.msg, toastOptions);
                }
                if (data.status === true) {
                    localStorage.setItem("chat-app-user", JSON.stringify(data.user));
                    navigate("/");
                }
            } catch (error) {
                // Xử lý lỗi khi gửi yêu cầu POST
                console.error("Error:", error);
                // Hiển thị thông báo lỗi cho người dùng
                toast.error("An error occurred while processing your request.", toastOptions);
            }
            
        }
        
    };
    const toastOptions = {
        position: "top-center",
        autoClose: 4000,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
    };
    const handleValidate = () => {
        const {password, confirmPassword, username, phone} = values;
        if(password !== confirmPassword){
            toast.error("Password and Confirm Password do not match", toastOptions);
            return false;
        } else if (username.length <3 ) {
            toast.error("Username must be at least 3 characters", toastOptions);
            return false;
        } else if (phone.length < 10) {
            toast.error("Phone must be at least 10 characters", toastOptions);
            return false;
        } else if (password.length < 8) {
            toast.error("Password must be at least 8 characters", toastOptions);
            return false;
        } 
        return true;

    };
    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value})
    };

    return (
        <>
            <FormContainer>
                <form onSubmit={(event) => handleSubmit(event)}>
                    <div className='brand'>
                        <img src={Logo} alt="Logo" />
                        <h1>Register</h1>

                    </div>
                    <input type="text" placeholder='Username' name='username' onChange={(e) => handleChange(e)}/>
                    <input type="text" placeholder='Phone' name='phone' onChange={(e) => handleChange(e)}/>
                    <input type="password" placeholder='Password' name='password' onChange={(e) => handleChange(e)}/>
                    <input type="password" placeholder='Confirm Password' name='confirmPassword' onChange={(e) => handleChange(e)}/>
                    <button type='submit'>Creat User</button>
                    <span>Already have an account ? <Link to="/login">Login</Link></span>
                </form>    

            </FormContainer>
            <ToastContainer>

            </ToastContainer>
        </>
    );
}

const FormContainer = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    background-color: #AAD6FF;
    .brand{
        display: flex;
        align-items: center;
        gap: 1rem;
        justify-content: center;
        img{
            height: 60px;
            width: 100px;
            border-radius: 5%;
        }
        h1{
            color: black;
            text-transform: uppercase;
        }
    }
    form {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        background-color: #E8F3FF;
        border-radius: 2rem;
        padding: 3rem 5rem;
        input{
            padding: 1rem;
            background-color: transparent;
            border: 0.1rem solid #2f2f3e;
            border-radius: 0.5rem;
            color: black;
            width: 100%;
            font-size: 1rem;
            &:focus{
                border: 0.1rem solid #2f2f3e;
                outline: none;
            }
        }
        button {
            background-color: #80C7F9;
            color: white;
            padding: 1rem 2rem;
            bodrer: none;
            font-weight: bold;
            coursor: pointer;
            border-radius: 0.4rem;
            font-size: 1rem;
            text-transform: uppercase;
            transition: 0.5s ease-in-out;
            &:hover{
                background-color: #0068FF;
            }
        }
        span {
            color: black;
            text-transform: uppercase;
            a {
                color: #4f4f5e;
                text-transform: uppercase;
                font-weight: bold;
            }
        }
    }
`;

export default Register;