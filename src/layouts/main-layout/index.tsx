import { UserApi } from "@/api/user-api";
import MessageCard from "@/componets/message-card";
import Nav from "@/componets/navbar";
import Protected from "@/componets/protected-page";
import SimpleSidebar from "@/componets/sidebar";
import RoomChat from "@/features/room_chat";
import groupState from "@/recoil/group/atom";
import groupsState from "@/recoil/groups/atom";
import userState from "@/recoil/user/atom";
import { Box } from "@chakra-ui/react";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { Outlet, redirect, useNavigate } from "react-router-dom"
import { useRecoilState } from "recoil";




const MainLayout = () => {
	const [user, setUser] = useRecoilState(userState)
	const [group, setGroup] = useRecoilState(groupsState)
	const [cookies, setCookies, removeCookie] = useCookies()
	const navigate = useNavigate()
	useEffect(() => {
		const fetchProfile = async () => {
			try {
				const data = await UserApi.getProfile();
				if (data instanceof Error) {
				} else {
					setUser(data.data);
					setGroup(data.groups)
				}
			} catch (error) {
				// Handle any errors that occur during profile retrieval
				console.error("Failed to fetch user profile:", error);
				// Perform any necessary error handling, e.g., redirect to a login page
				await removeCookie("auth", { path: "/" })
			}
		};

		if (cookies.auth) {
			// Only fetch the user profile if the user is signed in
			fetchProfile();
		} else {
			// Perform any necessary logic when the user is not signed in, e.g., redirect to a login page
			navigate("/auth/login");
		}
	}, [cookies.auth, navigate, setUser]);
	return <>
		<Protected isSignedIn={cookies.auth}>
			<SimpleSidebar>
				<Box>
					<RoomChat></RoomChat>
				</Box>
				<Outlet></Outlet>
			</SimpleSidebar>

		</Protected>
	</>
}


export default MainLayout;
