
import { T_Group } from "@/utils/models/group";
import { atom } from "recoil";



const groupsState = atom<T_Group[]|null>({
				key:"groupsState",
				default:null
})

export default groupsState;
