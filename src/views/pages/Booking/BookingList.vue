<template>
  <CCard>
    <CCardHeader> Booking List </CCardHeader>
    <CCardBody>
      <CDataTable
        hover
        striped
        :items="items"
        :fields="fields"
        :items-per-page="10"
        clickable-rows
        :active-page="currentPage"
        @row-clicked="onRowClicked"
        :pagination="{ doubleArrows: false, align: 'center' }"
        @page-change="onPageChange"
      >
        <template #testCenter="data">
          <td>
            <CBadge color="primary">
              {{ data.item.testCenter.name }}
            </CBadge>
          </td>
        </template>
        <template #firstParticipantFirstName="data">
          <td>
            <CBadge color="primary">
              {{ data.item.participants[0].firstName }}
            </CBadge>
          </td>
        </template>
        <template #firstParticipantLastName="data">
          <td>
            <CBadge color="primary">
              {{ data.item.participants[0].lastName }}
            </CBadge>
          </td>
        </template>
        <template #createdAt="data">
          <td>
            <CBadge color="primary">
              {{ data.item.createdAt }}
            </CBadge>
          </td>
        </template>
        <template #updatedAt="data">
          <td>
            <CBadge color="secondary">
              {{ data.item.updatedAt ? data.item.updatedAt : "newer" }}
            </CBadge>
          </td>
        </template>
      </CDataTable>
    </CCardBody>
  </CCard>
</template>

<script>
import { createBookingApiService } from "@/service/booking.api.service.factory";

export default {
  name: "BookingList",
  data() {
    return {
      currentPage: 1,
      items: [],
      fields: [
        { key: "time", label: "Time", _classes: "font-weight-bold" },
        { key: "testCenter" },
        { key: "firstParticipantFirstName", label: "First Name" },
        { key: "firstParticipantLastName", label: "Last Name" },
        { key: "createdAt" },
        { key: "updatedAt" },
      ],
      bookingApiService: null,
    };
  },
  created() {
    if (this.$route.query && this.$route.query.page) {
      this.currentPage = Number(this.$route.query.page);
    }

    this.bookingApiService = createBookingApiService();
    this.loadBookings(this.currentPage);
  },
  watch: {
    $route: {
      immediate: true,
      handler(route) {
        if (route.query && route.query.page) {
          this.currentPage = Number(route.query.page);
        }
      },
    },
  },
  methods: {
    loadBookings(page) {
      this.bookingApiService.loadBookings(page).then((response) => {
        this.currentPage = response.page;
        this.items = response.items;
      });
    },
    onRowClicked(item) {
      this.$router.push({ name: "bookingEdit", params: { id: item.id } });
    },
    onPageChange(newPage) {
      this.$router.push({ query: { page: newPage } });
    },
  },
};
</script>
