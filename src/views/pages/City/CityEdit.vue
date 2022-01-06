<template>
  <div>
    <CCard>
      <CCardHeader> <strong>Edit City</strong> {{ name }} </CCardHeader>
      <CCardBody>
        <CAlert
          :show.sync="successNotificationDismissCountDown"
          closeButton
          color="success"
          v-if="isPersistenceSuccessfully"
        >
          City updated successfully
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

        <CForm @submit.prevent="updateCity">
          <CInput
            description="Name"
            label="Name"
            required="required"
            :value.sync="name"
            horizontal
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
import { createCityApiService } from "@/service/city.api.service.factory";

export default {
  name: "CityEdit",
  data() {
    return {
      loadedCity: {},
      name: null,
      isValidationFailed: false,
      isPersistenceFailed: false,
      isPersistenceSuccessfully: false,
      successNotificationDismissSecs: 3,
      successNotificationDismissCountDown: 3,
      cityApiService: null,
    };
  },
  created() {
    this.cityApiService = createCityApiService();
    this.loadCity(this.$route.params.id);
  },
  methods: {
    loadCity(id) {
      this.cityApiService.loadCity(id).then((response) => {
        this.loadedCity = response.loadedCity;
        this.name = this.loadedCity.name;
      });
    },
    updateCity() {
      this.cityApiService
        .updateCity(this.loadedCity.id, this.name)
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
