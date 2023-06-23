import { T_Message } from "@/utils/models/message"
import axiosClient from "./axios_client"
import { T_Group } from "@/utils/models/group"



export const GroupApi = {
  async loadGroupData(payload: string) {
    try {
      const url = "/group/data"
      const response = axiosClient.post<{}, T_Group>(url, { groupId: payload })
      return response
    }
    catch (e) {
      console.log(e)
    }
  }
}
