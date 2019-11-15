import { ResponseApi, callApi } from "@/api/apibase";
import { User } from "../../../server/src/model/model";

export default {
  async registerUser(data: any): Promise<ResponseApi<User>> {
    return await callApi({
      url: "api/v1/user",
      method: "post",
      data: data
    });
  },
  async getCurrentUser(): Promise<ResponseApi<User>> {
    return await callApi({
      url: "api/v1/users/me",
      method: "get"
    });
  }
};
