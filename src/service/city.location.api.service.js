import apiClient from "./api.client.service";
import {
  API_ERROR_VALIDATION,
  API_ERROR_UNKNOWN,
  API_URL_CITY_LOCATION_CREATE,
  API_URL_CITY_LOCATION_UPDATE,
  API_URL_CITY_LIST,
  API_URL_CITY_LOCATION_LIST,
  API_URL_CITY_LOCATION_GET_BY_ID,
} from "@/api.const";

export class CityLocationApiService {
  loadCities(page, perPage) {
    // todo use do while

    return apiClient
      .get(`${API_URL_CITY_LIST}/${page}/${perPage}`)
      .then((response) => {
        return response.data.data.items.map((city) => {
          return {
            value: city.id,
            label: city.name,
          };
        });
      });
  }

  loadCityLocations(page) {
    return apiClient
      .get(`${API_URL_CITY_LOCATION_LIST}/${page}`)
      .then((response) => {
        return {
          currentPage: page,
          items: response.data.data.items,
        };
      });
  }

  loadCityLocationOptions(page, perPage) {
    return apiClient
      .get(`${API_URL_CITY_LOCATION_LIST}/${page}/${perPage}`)
      .then((response) => {
        return response.data.data.items.map((cityLocation) => {
          return {
            value: cityLocation.id,
            label: cityLocation.name,
          };
        });
      });
  }

  loadCityLocation(id) {
    return apiClient
      .get(`${API_URL_CITY_LOCATION_GET_BY_ID}/${id}`)
      .then((response) => {
        let loadedCityLocation = response.data.data;

        return {
          loadedCityLocation,
        };
      });
  }

  createCityLocation(name, cityId) {
    return apiClient
      .post(API_URL_CITY_LOCATION_CREATE, {
        name,
        cityId,
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

  updateCityLocation(id, cityId, name) {
    return apiClient
      .post(API_URL_CITY_LOCATION_UPDATE, {
        id,
        cityId,
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
