

import { T_Group } from "@/utils/models/group";
import { atom } from "recoil";



const groupState = atom<T_Group|null>({
				key:"groupState",
				default:null
})

export default groupState;
