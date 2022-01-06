import apiClient from "./api.client.service";
import { API_URL_DASHBOARD_INDEX } from "@/api.const";

export class DashboardApiService {
  loadDashboard() {
    return apiClient.get(`${API_URL_DASHBOARD_INDEX}`).then((response) => {
      return {
        data: response.data.data,
      };
    });
  }
}
