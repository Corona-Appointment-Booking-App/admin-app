<template>
  <div>
    <CCard>
      <CCardHeader>
        <strong>Edit City Location</strong> {{ name }}
      </CCardHeader>
      <CCardBody>
        <CAlert
          :show.sync="successNotificationDismissCountDown"
          closeButton
          color="success"
          v-if="isPersistenceSuccessfully"
        >
          City location updated successfully
          <CProgress
            color="success"
            :max="successNotificationDismissSecs"
            :value="successNotificationDismissCountDown"
            height="4px"
          />
        </CAlert>

        <CAlert show color="warning" v-if="isValidationFailed">
          Please fill in all required fields!
        </CAlert>

        <CAlert show color="danger" v-if="isPersistenceFailed">
          Unknown error happened while saving your data, please try again later!
        </CAlert>

        <CForm @submit.prevent="updateCityLocation">
          <CInput
            description="Name"
            label="Name"
            required="required"
            :value.sync="name"
            horizontal
          />

          <CSelect
            label="City"
            horizontal
            :value.sync="cityId"
            :options="loadedCities"
            placeholder="Please select"
          />

          <CCardFooter>
            <CButton type="submit" size="sm" color="primary"
              ><CIcon name="cil-check-circle" /> Submit</CButton
            >
          </CCardFooter>
        </CForm>
      </CCardBody>
    </CCard>
  </div>
</template>

<script>
import { createCityLocationApiService } from "@/service/city.location.api.service.factory";

export default {
  name: "CityLocationEdit",
  data() {
    return {
      loadedCityLocation: {},
      name: null,
      cityId: null,
      loadedCities: [],
      isValidationFailed: false,
      isPersistenceFailed: false,
      isPersistenceSuccessfully: false,
      successNotificationDismissSecs: 3,
      successNotificationDismissCountDown: 3,
      cityLocationApiService: null,
    };
  },
  created() {
    this.cityLocationApiService = createCityLocationApiService();

    this.loadCityLocation(this.$route.params.id);
    this.loadCities(1, 1000);
  },
  methods: {
    loadCityLocation(id) {
      this.cityLocationApiService.loadCityLocation(id).then((response) => {
        this.loadedCityLocation = response.loadedCityLocation;
        this.name = this.loadedCityLocation.name;
        this.cityId = this.loadedCityLocation.city.id;
      });
    },
    loadCities(page, perPage) {
      this.cityLocationApiService.loadCities(page, perPage).then((response) => {
        this.loadedCities = response;
      });
    },
    updateCityLocation() {
      this.cityLocationApiService
        .updateCityLocation(this.loadedCityLocation.id, this.cityId, this.name)
        .then((response) => {
          this.isValidationFailed = response.isValidationFailed;
          this.isPersistenceFailed = response.isPersistenceFailed;

          if (response.success) {
            this.isPersistenceSuccessfully = true;
            this.successNotificationDismissSecs = 3;
            this.successNotificationDismissCountDown = 3;
          }
        });
    },
  },
};
</script>
