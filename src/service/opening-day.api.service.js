import apiClient from "./api.client.service";
import { API_URL_OPENING_DAY_GENERATE } from "@/api.const";

export class OpeningDayApiService {
  loadGeneratedOpeningDays() {
    return apiClient.get(`${API_URL_OPENING_DAY_GENERATE}`).then((response) => {
      let openingTimes = response.data.data.openingTimes.map((openingTime) => {
        return {
          value: openingTime,
          label: openingTime,
        };
      });

      return {
        openingDays: response.data.data.openingDays,
        openingTimes,
      };
    });
  }
}
