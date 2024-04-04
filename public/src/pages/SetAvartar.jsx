
import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import axios from "axios";
import loader from "../assets/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';
import { registerRoute } from '../untils/APIRoutes';
import { setAvartar } from '../untils/APIRoutes';

export default function SetAvartar() {
    const api = 'https://api.multiavatar.com/45678945';
    const navigate = useNavigate();
    const [avartars, setAvartars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedAvartar, setSelectedAvartar] = useState(undefined);

    const toastOptions = {
        position: "top-center",
        autoClose: 4000,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
    };
    // useEffect(() => {
    //     const checkLocalStorage = async () => {
    //         if (!localStorage.getItem("chat-app-user")) {
    //             navigate("/login");
    //         }
    //     };
    
    //     checkLocalStorage();
    // }, []);
    
    // const setProfilePicture = async () => {
    //     // Your logic for setting profile picture
    // };
    
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const data = [];
    //             for (let i = 0; i < 4; i++) {
    //                 const image = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`);
    //                 const buffer = Buffer.from(image.data);
    //                 data.push(buffer.toString("base64"));
    //             }
    //             setAvartars(data);
    //             setIsLoading(false);
    //         } catch (error) {
    //             console.error("Error fetching data:", error);
    //             // Handle error (e.g., show error message)
    //         }
    //     };
    
    //     fetchData();
    // }, []);
    
    useEffect(() => {
        const checkUser = async () => {
            if (!localStorage.getItem("chat-app-user")) {
                navigate("/login");
            }
        };
    
        checkUser();
    }, []);
    
    const setProfilePicture = async () => {
        if (selectedAvartar === undefined) {
            toast.error("Please select an avatar", toastOptions);
        } else {
            try {
                const userDataString = localStorage.getItem("chat-app-user");
                if (!userDataString) {
                    throw new Error("User data not found in localStorage");
                }
    
                const user = JSON.parse(userDataString);
                const { data } = await axios.post(`${setAvartar}/${user._id}`, {
                    image: avartars[selectedAvartar], 
                });
                console.log(data);
    
                if (data.isSet) {
                    user.isAvatarImageSet = true;
                    user.avatarImage = data.image;
                    localStorage.setItem("chat-app-user", JSON.stringify(user));
                    navigate("/");
                } else {
                    toast.error("Failed to set profile picture");
                }
            } catch (error) {
                // Handle error
                console.error("Error setting profile picture:", error);
                toast.error("Failed to set profile picture");
            }
        }
    };
    
    useEffect(() => {
        const fetchData = async () => {
            const data = [];
            for (let i = 0; i < 5; i++) {
                try {
                    const response = await axios.get(`${api}/${Math.floor(Math.random() * 1000)}`, { responseType: 'arraybuffer' });
                    const buffer = new Blob([response.data], { type: 'image/svg+xml' });
                    const reader = new FileReader();
                    reader.readAsDataURL(buffer);
                    reader.onloadend = () => {
                        data.push(reader.result);
                        if (data.length === 5) {
                            setAvartars(data);
                            setIsLoading(false);
                        }
                    };
                } catch (error) {
                    // Handle error
                    console.error("Error fetching avatar:", error);
                }
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <Container>
                <div className="title-container">
                    <h1>Set Your Avatar</h1>
                    <div className='avartars'>
                        {avartars.map((avartar, index) => (
                            <div
                                key={index}
                                className={`avatar ${selectedAvartar === index ? "selected" : ""}`}
                                onClick={() => setSelectedAvartar(index)}
                            >
                                <img src={avartar} alt="avatar" />
                            </div>
                        ))}
                    </div>
                </div>
                <button className='submit-btn' onClick={setProfilePicture}>Set Profile Picture</button>
            </Container>
            <ToastContainer />
        </>
    )
}

const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
gap: 3rem;
background-color: #AAD6FF;
height: 100vh;
width: 100vw;
.loader{
    max-inline-size: 100%;
}
.title-container {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    align-items: center;
    h1 {
        font-size: 2rem;
        font-weight: 700;
        color: #333;
    }
    .avartars {
        display: flex;
        gap: 1rem;
        .avatar {
            cursor: pointer;
            border-radius: 50%;
            overflow: hidden;
            img {
                width: 100px;
                height: 100px;
                object-fit: cover;
            }
            &.selected {
                border: 0.4rem solid #4e0eff;
            }
        }
    }
}

.submit-btn {
    padding: 1rem 2rem;
    background-color: #4e0eff;
    color: white;
    font-size: 1.5rem;
    font-weight: bold;
    border: none;
    border-radius: 0.4rem;
    cursor: pointer;
}
`;
