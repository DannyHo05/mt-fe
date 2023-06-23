import { T_Group } from "./group";



export interface I_User {
	first_name:string,
	last_name:string,
	dateOfBirth?: Date,
	username:string,
	groups:T_Group[]
	createAt?:Date
	id:string
}
