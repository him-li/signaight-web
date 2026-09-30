import axios from "axios";
import { apiInstance } from "@/utils/apiInstance";
import { API_ROUTES } from "@/constants/routes";
import { UserInfo } from "@/auth";
import { NEXT_API_URL } from "@/constants";

class AuthServices {
  static async getToken() {
    try {
      const res = await axios.get(`${NEXT_API_URL}/api/get-token`);
      return res.data.access_token;
    } catch (error) {
      console.log(error);
    }
  }

  static async createHeaders(tokenData: string | null) {
    const token = tokenData ?? (await this.getToken());
    return {
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": "*",
    };
  }

  static async getUserInfo(tokenData: string | null) {
    const headers = await this.createHeaders(tokenData);
    try {
      const res = await apiInstance.get<UserInfo>(API_ROUTES.ME, {
        headers: headers,
      });
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
}

export default AuthServices;
