import ErrorPage from "@/componets/error-page";
import MainLayout from "@/layouts/main-layout";
import { RouteObject } from "react-router-dom";


export const mainRouter: RouteObject[] = [
	{
		path:"/",
		element:<MainLayout/>
	},
	{
		path:"/*",
		element:<ErrorPage/>
	}
] 
