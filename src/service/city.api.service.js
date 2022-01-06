import apiClient from "./api.client.service";
import {
  API_ERROR_VALIDATION,
  API_ERROR_UNKNOWN,
  API_URL_CITY_CREATE,
  API_URL_CITY_UPDATE,
  API_URL_CITY_LIST,
  API_URL_CITY_GET_BY_ID,
} from "@/api.const";

export class CityApiService {
  loadCities(page) {
    return apiClient.get(`${API_URL_CITY_LIST}/${page}`).then((response) => {
      return {
        currentPage: page,
        items: response.data.data.items,
      };
    });
  }

  loadCity(id) {
    return apiClient.get(`${API_URL_CITY_GET_BY_ID}/${id}`).then((response) => {
      let loadedCity = response.data.data;

      return {
        loadedCity,
      };
    });
  }

  createCity(name) {
    return apiClient
      .post(API_URL_CITY_CREATE, {
        name,
      })
      .then((response) => {
        return {
          id: response.data.data.id,
          success: response.data.success,
          isValidationFailed: false,
          isPersistenceFailed: false,
        };
      })
      .catch((error) => {
        return {
          id: null,
          success: error.response.data.success,
          isValidationFailed:
            error.response.data.error === API_ERROR_VALIDATION,
          isPersistenceFailed: error.response.data.error === API_ERROR_UNKNOWN,
        };
      });
  }

  updateCity(id, name) {
    return apiClient
      .post(API_URL_CITY_UPDATE, {
        id,
        name,
      })
      .then((response) => {
        return {
          id: response.data.data.id,
          success: response.data.success,
          isValidationFailed: false,
          isPersistenceFailed: false,
        };
      })
      .catch((error) => {
        return {
          id: null,
          success: error.response.data.success,
          isValidationFailed:
            error.response.data.error === API_ERROR_VALIDATION,
          isPersistenceFailed: error.response.data.error === API_ERROR_UNKNOWN,
        };
      });
  }
}
