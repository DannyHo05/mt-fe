import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { Box, Image } from '@chakra-ui/react'
import authBg from "@/assets/images/auth-bg.jpg"
import { useEffect } from "react"
import Protected from "@/componets/protected-page"
import { useRecoilState } from "recoil"
import userState from "@/recoil/user/atom"
import { useCookies } from "react-cookie"
const AuthLayout = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const [user, setUser] = useRecoilState(userState)
	const [cookies,setCookie] = useCookies()
	useEffect(() => {
		if (location.pathname === "/auth") [
			navigate("/auth/login")
		]
		if (cookies.auth){
			navigate("/",{replace:true})
		}
	}, [location.pathname, navigate])
	return <>
		<Protected isSignedIn={!user}>
			<div className="flex items-center w-screen">
				<Box className="h-full lg:w-[60%] w-0">
					<Image src={authBg} className="h-screen w-full" alt="Background image"></Image>
				</Box>
				<Box className="lg:w-[40%] w-screen flex justify-center">
					<Outlet></Outlet>
				</Box>
			</div>
		</Protected>
	</>
}

export default AuthLayout;
