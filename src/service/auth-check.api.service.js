import apiClient from "./api.client.service";
import { API_URL_ADMIN_AUTH_CHECK } from "@/api.const";

export class AuthCheckApiService {
  authCheck(authToken) {
    return apiClient.get(`${API_URL_ADMIN_AUTH_CHECK}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
  }
}
