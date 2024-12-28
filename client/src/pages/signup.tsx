import { useState } from "react"
import Nav from "../components/nav"
import { type BaseUser } from "../types"
import { signup } from "../api"
import { useDispatch } from "react-redux"
import { modifyUser } from "../store/auth-slice"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const Signup = () => {

    const navigate = useNavigate()

    const [userDetails, setUserDetails] = useState<BaseUser>({ name: "", email: "", password: "" })
    const dispatch = useDispatch()

    const modifyDetails = (name: "name" | "email" | "password", value: string) => {
        setUserDetails({
            ...userDetails,
            [name]: value
        })
    }

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        if (!userDetails.name || !userDetails.email || !userDetails.password) {
            return;
        }

        try {
            const { data } = await signup(userDetails)
            dispatch(modifyUser({ isAuth: true, user: data.user }))
            toast.success("Signup successful!")
            return navigate("/")
        } catch (error:any) {
            console.log(error);
            const MESSAGE = error.response.data.message || "Error while signing in"
            toast.error(MESSAGE)
        }
    }

    return (
        <div className="container mx-auto">
            <Nav />
            <div className="h-max bg-white flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        alt="Your Company"
                        src="/images/logo.png"
                        className="mx-auto h-10 w-auto"
                    />
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                        Sign up to create your Passkeeper Account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form action="#" method="POST" className="space-y-6">

                        <div>
                            <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">
                                Name
                            </label>
                            <div className="mt-2">
                                <input
                                    onChange={(e) => modifyDetails("name", e.target.value)}
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    autoComplete="name"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-sky-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    onChange={(e) => modifyDetails("email", e.target.value)}
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    autoComplete="email"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-sky-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                                    Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    onChange={(e) => modifyDetails("password", e.target.value)}
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    autoComplete="current-password"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-sky-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                onClick={handleSubmit}
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-sky-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
                            >
                                Sign up
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm/6 text-gray-500">
                        Already have an account?{' '}
                        <span onClick={() => navigate("/login")} className="font-semibold cursor-pointer text-sky-600 hover:text-sky-500">
                            Login
                        </span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Signup