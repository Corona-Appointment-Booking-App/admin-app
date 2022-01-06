<template>
  <div>
    <CCard>
      <CCardHeader> <strong>Create</strong> User </CCardHeader>
      <CCardBody>
        <CAlert show color="warning" v-if="isValidationFailed">
          Please fill in all required fields!
        </CAlert>

        <CAlert show color="danger" v-if="isPersistenceFailed">
          Unknown error happened while saving your data, please try again later!
        </CAlert>

        <CForm @submit.prevent="createUser">
          <CInput
            description="Email"
            label="Email"
            required="required"
            :value.sync="email"
            horizontal
          />

          <CInput
            type="password"
            description="Kennwort"
            label="Kennwort"
            required="required"
            :value.sync="password"
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
import { createUserApiService } from "@/service/user.api.service.factory";

export default {
  name: "UserCreate",
  data() {
    return {
      email: null,
      password: null,
      isValidationFailed: false,
      isPersistenceFailed: false,
      userApiService: null,
    };
  },
  created() {
    this.userApiService = createUserApiService();
  },
  methods: {
    createUser() {
      this.userApiService
        .createUser(this.email, this.password)
        .then((response) => {
          this.isValidationFailed = response.isValidationFailed;
          this.isPersistenceFailed = response.isPersistenceFailed;

          if (response.success) {
            this.$router.push({
              name: "userEdit",
              params: { id: response.id },
            });
          }
        });
    },
  },
};
</script>
