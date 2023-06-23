import Login from "@/features/auth/Login";
import Signup from "@/features/auth/Signup";
import AuthLayout from "@/layouts/auth-layout";
import { RouteObject } from "react-router-dom";




export const authRouter: RouteObject[] = [
	{
		path: "/auth",
		element: <AuthLayout />,
		children: [
			{
				path: "login",
				element: <Login />
			}, {
				path: "signup",
				element: <Signup />
			}
		]
	}
]
