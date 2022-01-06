import apiClient from "./api.client.service";
import {
  API_ERROR_VALIDATION,
  API_ERROR_UNKNOWN,
  API_URL_USER_CREATE,
  API_URL_USER_UPDATE,
  API_URL_USER_LIST,
  API_URL_USER_GET_BY_ID,
} from "@/api.const";

export class UserApiService {
  loadUsers(page) {
    return apiClient.get(`${API_URL_USER_LIST}/${page}`).then((response) => {
      return {
        currentPage: page,
        items: response.data.data.items,
      };
    });
  }

  loadUser(id) {
    return apiClient.get(`${API_URL_USER_GET_BY_ID}/${id}`).then((response) => {
      let loadedUser = response.data.data;

      return {
        loadedUser,
      };
    });
  }

  createUser(email, password) {
    return apiClient
      .post(API_URL_USER_CREATE, {
        email,
        password,
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

  updateUser(id, email, password) {
    return apiClient
      .post(API_URL_USER_UPDATE, {
        id,
        email,
        password,
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
