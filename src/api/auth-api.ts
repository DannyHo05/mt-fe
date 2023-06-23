import { MyCustomError, T_SignIn, T_SignInReq } from "@/utils/models";
import axiosClient from "./axios_client";



export const AuthApi = {
  async signIn(payload:T_SignIn):Promise<T_SignInReq|Error>{
    const url = "/auth/login"
    try{
      const response = await axiosClient.post<{},T_SignInReq>(url,payload);
      const data = response
      return data;
    }
    catch(e){
      return e as MyCustomError
    }
  }
}
