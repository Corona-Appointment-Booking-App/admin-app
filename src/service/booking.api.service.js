import apiClient from "./api.client.service";
import { API_URL_BOOKING_LIST, API_URL_BOOKING_GET_BY_ID } from "@/api.const";

export class BookingApiService {
  loadBookings(page) {
    return apiClient.get(`${API_URL_BOOKING_LIST}/${page}`).then((response) => {
      return {
        currentPage: page,
        items: response.data.data.items,
      };
    });
  }

  loadBooking(id) {
    return apiClient
      .get(`${API_URL_BOOKING_GET_BY_ID}/${id}`)
      .then((response) => {
        let loadedBooking = response.data.data;

        return {
          loadedBooking,
        };
      });
  }
}
