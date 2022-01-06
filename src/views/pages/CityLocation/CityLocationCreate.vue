<template>
  <div>
    <CCard>
      <CCardHeader> <strong>Create</strong> City Location </CCardHeader>
      <CCardBody>
        <CAlert show color="warning" v-if="isValidationFailed">
          Please fill in all required fields!
        </CAlert>

        <CAlert show color="danger" v-if="isPersistenceFailed">
          Unknown error happened while saving your data, please try again later!
        </CAlert>

        <CForm @submit.prevent="createCityLocation">
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
            <CButton type="submit" size="sm" color="primary">
              <CIcon name="cil-check-circle" />
              Submit
            </CButton>
          </CCardFooter>
        </CForm>
      </CCardBody>
    </CCard>
  </div>
</template>

<script>
import { createCityLocationApiService } from "@/service/city.location.api.service.factory";

export default {
  name: "CityLocationCreate",
  data() {
    return {
      name: null,
      cityId: null,
      loadedCities: [],
      isValidationFailed: false,
      isPersistenceFailed: false,
      cityLocationApiService: null,
    };
  },
  created() {
    this.cityLocationApiService = createCityLocationApiService();
    this.loadCities();
  },
  methods: {
    createCityLocation() {
      this.cityLocationApiService
        .createCityLocation(this.name, this.cityId)
        .then((response) => {
          this.isValidationFailed = response.isValidationFailed;
          this.isPersistenceFailed = response.isPersistenceFailed;

          if (response.success) {
            this.$router.push({
              name: "cityLocationEdit",
              params: { id: response.id },
            });
          }
        });
    },
    loadCities() {
      this.cityLocationApiService.loadCities(1, 1000).then((response) => {
        this.loadedCities = response;
      });
    },
  },
};
</script>
