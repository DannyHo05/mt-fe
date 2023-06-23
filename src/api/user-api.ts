import { T_Group } from "@/utils/models/group";
import axiosClient from "./axios_client";
import { I_User, MyCustomError } from "@/utils/models";



export const UserApi = {
  async getProfile() {
    try {
      const url = "/user/profile";
      const response = axiosClient.get<{},{status:boolean, data:I_User, groups:T_Group[]}|MyCustomError>(url)
      return response
    }
    catch(e){
      return e as MyCustomError
    }
    
  }
}

