<template>
  <div>
    <CCardGroup class="mb-4">
      <CWidgetProgressIcon
        :header="bookingsCountToday"
        text="Bookings today"
        color="gradient-info"
        inverse
      >
        <CIcon name="cil-check-circle" height="36" />
      </CWidgetProgressIcon>

      <CWidgetProgressIcon
        :header="bookingsCount"
        text="Bookings"
        color="gradient-primary"
        inverse
      >
        <CIcon name="cil-check-circle" height="36" />
      </CWidgetProgressIcon>

      <CWidgetProgressIcon
        :header="citiesCount"
        text="Cities"
        color="gradient-info"
        inverse
      >
        <CIcon name="cil-star" height="36" />
      </CWidgetProgressIcon>
      <CWidgetProgressIcon
        :header="cityLocationsCount"
        text="City locations"
        color="gradient-success"
        inverse
      >
        <CIcon name="cil-location-pin" height="36" />
      </CWidgetProgressIcon>
      <CWidgetProgressIcon
        :header="testCentersCount"
        text="Test Center"
        color="gradient-danger"
        inverse
      >
        <CIcon name="cil-bell" height="36" />
      </CWidgetProgressIcon>
    </CCardGroup>

    <CRow>
      <CCol md="12">
        <CCard>
          <CCardHeader>
            <CIcon name="cil-justify-center" /><strong> Recent Bookings </strong
            ><small>10 will shown</small>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol md="12">
                <CCard>
                  <CCardBody>
                    <CListGroup>
                      <CListGroupItem
                        v-for="(recentBooking, index) in this.recentBookings"
                        :key="recentBooking.id"
                        href="#"
                        :active="index % 2 === 0"
                        class="flex-column align-items-start"
                      >
                        <div class="d-flex w-100 justify-content-between">
                          <h5 class="mb-1">
                            {{ recentBooking.participants[0].firstName }}
                            {{ recentBooking.participants[0].lastName }}
                          </h5>
                          <small>{{
                            recentBooking.formattedCreatedDate
                          }}</small>
                        </div>
                        <p class="mb-1">
                          {{ recentBooking.testCenter.name }}
                        </p>
                        <small
                          >{{
                            recentBooking.participants.length
                          }}
                          Participants</small
                        >
                      </CListGroupItem>
                    </CListGroup>
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import { createDashboardApiService } from "@/service/dashboard.api.service.factory";
import { createBookingApiService } from "@/service/booking.api.service.factory";

export default {
  name: "Dashboard",
  data() {
    return {
      bookingsCount: "0",
      bookingsCountToday: "0",
      citiesCount: "0",
      cityLocationsCount: "0",
      testCentersCount: "0",
      recentBookings: [],
    };
  },
  created() {
    this.dashboardApiService = createDashboardApiService();
    this.bookingApiService = createBookingApiService();

    this.dashboardApiService.loadDashboard().then((responseData) => {
      const data = responseData.data;

      this.bookingsCount = data.bookingsCount.toString();
      this.bookingsCountToday = data.bookingsCountToday.toString();
      this.citiesCount = data.citiesCount.toString();
      this.cityLocationsCount = data.cityLocationsCount.toString();
      this.testCentersCount = data.testCentersCount.toString();
    });

    this.bookingApiService.loadBookings(1).then((response) => {
      this.recentBookings = response.items;
    });
  },
};
</script>
