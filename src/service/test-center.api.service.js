import apiClient from "./api.client.service";
import {
  API_ERROR_VALIDATION,
  API_ERROR_UNKNOWN,
  API_URL_TEST_CENTER_CREATE,
  API_URL_TEST_CENTER_UPDATE,
  API_URL_TEST_CENTER_LIST,
  API_URL_TEST_CENTER_GET_BY_ID,
} from "@/api.const";

export class TestCenterApiService {
  loadTestCenters(page) {
    return apiClient
      .get(`${API_URL_TEST_CENTER_LIST}/${page}`)
      .then((response) => {
        return {
          currentPage: page,
          items: response.data.data.items,
        };
      });
  }

  loadTestCenter(id) {
    return apiClient
      .get(`${API_URL_TEST_CENTER_GET_BY_ID}/${id}`)
      .then((response) => {
        let loadedTestCenter = response.data.data;

        return {
          loadedTestCenter,
        };
      });
  }

  createTestCenter(name, address, cityLocationId, openingDays) {
    return apiClient
      .post(API_URL_TEST_CENTER_CREATE, {
        name,
        address,
        cityLocationId,
        openingDays,
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

  updateTestCenter(id, cityLocationId, name, address, openingDays) {
    return apiClient
      .post(API_URL_TEST_CENTER_UPDATE, {
        id,
        cityLocationId,
        name,
        address,
        openingDays,
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
