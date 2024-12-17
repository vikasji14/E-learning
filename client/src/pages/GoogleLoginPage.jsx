import React, { useState } from 'react'
import { useGoogleLogin } from "@react-oauth/google";
import Google from './../components/ui/google';
import { Button } from "./../components/ui/button"
import { Separator } from "@/components/ui/separator"
import { googleLogin } from "../redux/api/authApi";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Loader } from "../components/ui/loader";
const GoogleLogin = () => {
    
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate();

    const googleLoginHandler = useGoogleLogin({
        
        onSuccess: (response) => {
            // Send the response code to the backend to exchange for tokens
            setIsLoading(true)

            googleLogin(response)
                .then((data) => {
                    // Assuming the backend response includes user info and a token
                    toast.success(data.message)
                    localStorage.setItem("token", data.token)
                    localStorage.setItem("name", data.user.name)
                    localStorage.setItem("id", data.user._id)
                    localStorage.setItem("role", data.user.role)
                    localStorage.setItem("photoUrl", data.user.photoUrl)
                    navigate("/"); 
                })
                .catch((error) => {
                    toast.error(error.message)
                    console.error('Error during login process:', error);
                }).finally(() => setIsLoading(false));
        },
        onError: (error) => console.log('Login Failed:', error),
        flow: "auth-code",
    });

    
    return (
        <div className="flex flex-col items-center w-full">
            <div className="flex font-bold items-center justify-center pt-4 w-28  pb-4">
                <Separator className="my-4 mr-2 " />
                <span >Or</span>
                <Separator className="my-4 ml-2 " />
            </div>
            <div className="extra w-full">

                <Button onClick={googleLoginHandler} className="w-full"><Google />Continue with Google</Button>
                
            </div>

            {isLoading && (
                <Loader/>
            )}
        </div>
    )
}

export default GoogleLogin
