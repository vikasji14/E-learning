import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { useState } from "react"
import { registerUser, loginUser } from './../redux/api/authApi';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";




export function Login() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const [loginEmail, setLoginEmail] = useState('')
    const [loginPassword, setLoginPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)


    const dispatch = useDispatch()
    const navigate = useNavigate();
    const handleSignup = async (e) => {
        // Handle login logic here
        setIsLoading(true)
        e.preventDefault()
        const user = { name, email, password }
        const data = await registerUser(user)
        if (data.success) {
            toast.success(data.message)
            setIsLoading(false)
        } else {
            toast.error(data.message)
        }
    }

    const handleLogin = async (e) => {
        // Handle login logic here
        e.preventDefault()
        setIsLoading(true)
        const userData = { email: "vikas@gmail.com", password: "vikas" }
        const data = await loginUser(userData)
        if (data.success) {
            toast.success(data.message)
            localStorage.setItem("token", data.token)           
            localStorage.setItem("name", data.user.name)
            localStorage.setItem("id", data.user._id)
            localStorage.setItem("role", data.user.role)
            localStorage.setItem("photoUrl", data.user.photoUrl)
            navigate("/");
            setIsLoading(false)
        } else {
            toast.error(data.message)
            setIsLoading(false)
        }
        setIsLoading(false)
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <Tabs defaultValue="login" className="w-[400px]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="login">Login</TabsTrigger>
                    <TabsTrigger value="signup">Signup</TabsTrigger>
                </TabsList>
                <TabsContent value="signup">
                    <Card>
                        <CardHeader>
                            <CardTitle>Create new account</CardTitle>
                            <CardDescription>
                                Create a new account to get started.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <Label htmlFor="name">Name</Label>
                                <Input value={name} onChange={(e) => setName(e.target.value)} id="name" placeholder="Enter Your Name" required='true' />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="email">Email</Label>
                                <Input value={email} onChange={(e) => setEmail(e.target.value)} id="email" placeholder="Enter Your Email" required='true' />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter Your Password" required='true' />
                            </div>
                        </CardContent>
                        <CardFooter>
                            {/* <Button onClick={handleSignup}>Submit</Button>
                             */}

                             <Button
                                disabled={isLoading}
                                onClick={handleSignup}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        wait
                                    </>
                                ) : (
                                    "Signup"
                                )}
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="login">
                    <Card>
                        <CardHeader>
                            <CardTitle>Login</CardTitle>
                            <CardDescription>
                                Login your password here. After signup, you'll be logged in.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <Label htmlFor="email">Email</Label>
                                <Input value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} id="email" type="Email" required='true' placeholder="Enter Your Email" />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="password">Password</Label>
                                <Input id="Password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} type="password" required='true' placeholder="Enter Your Password" />
                            </div>

                        </CardContent>
                        <CardFooter>
                            {/* <Button onClick={handleLogin}>Login</Button>
                             */}

                            <Button
                                disabled={isLoading}
                                onClick={handleLogin}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        wait
                                    </>
                                ) : (
                                    "Login"
                                )}
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

            </Tabs>
        </div>
    )
}
