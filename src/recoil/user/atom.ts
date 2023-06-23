import { I_User } from "@/utils/models";
import { atom } from "recoil";



const userState = atom<I_User|null>({
				key:"userState",
				default:null
})

export default userState;
