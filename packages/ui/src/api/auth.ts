import axios, { ResponseApi, callApi } from "@/api/apibase";

export default {
  async getIdentity(): Promise<ResponseApi<any>> {
    return await callApi({
      url: "auth/dialogs/identity",
      method: "get"
    });
  },
  async isAuthenticated(): Promise<ResponseApi<any>> {
    return await callApi({
      url: "auth/authenticated",
      method: "get"
    });
  },
  async login(data: any): Promise<ResponseApi<any>> {
    return await callApi({
      url: "auth/login",
      method: "post",
      data: data
    });
  },
  async logout(): Promise<ResponseApi<any>> {
    return await callApi({
      url: "auth/logout",
      method: "get"
    });
  }
};
