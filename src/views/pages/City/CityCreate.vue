<template>
  <div>
    <CCard>
      <CCardHeader> <strong>Create</strong> City </CCardHeader>
      <CCardBody>
        <CAlert show color="warning" v-if="isValidationFailed">
          Please fill in all required fields!
        </CAlert>

        <CAlert show color="danger" v-if="isPersistenceFailed">
          Unknown error happened while saving your data, please try again later!
        </CAlert>

        <CForm @submit.prevent="createCity">
          <CInput
            description="Name"
            label="Name"
            required="required"
            :value.sync="name"
            horizontal
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
import { createCityApiService } from "@/service/city.api.service.factory";

export default {
  name: "CityCreate",
  data() {
    return {
      name: null,
      isValidationFailed: false,
      isPersistenceFailed: false,
      cityApiService: null,
    };
  },
  created() {
    this.cityApiService = createCityApiService();
  },
  methods: {
    createCity() {
      this.cityApiService.createCity(this.name).then((response) => {
        this.isValidationFailed = response.isValidationFailed;
        this.isPersistenceFailed = response.isPersistenceFailed;

        if (response.success) {
          this.$router.push({ name: "cityEdit", params: { id: response.id } });
        }
      });
    },
  },
};
</script>
