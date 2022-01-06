<template>
  <div>
    <CCard>
      <CCardHeader> <strong>Edit User</strong> {{ email }} </CCardHeader>
      <CCardBody>
        <CAlert
          :show.sync="successNotificationDismissCountDown"
          closeButton
          color="success"
          v-if="isPersistenceSuccessfully"
        >
          User updated successfully
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

        <CForm @submit.prevent="updateUser">
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
import { createUserApiService } from "@/service/user.api.service.factory";

export default {
  name: "UserEdit",
  data() {
    return {
      loadedUser: {},
      email: null,
      password: null,
      isValidationFailed: false,
      isPersistenceFailed: false,
      isPersistenceSuccessfully: false,
      successNotificationDismissSecs: 3,
      successNotificationDismissCountDown: 3,
      userApiService: null,
    };
  },
  created() {
    this.userApiService = createUserApiService();
    this.loadUser(this.$route.params.id);
  },
  methods: {
    loadUser(id) {
      this.userApiService.loadUser(id).then((response) => {
        this.loadedUser = response.loadedUser;
        this.email = this.loadedUser.email;
      });
    },
    updateUser() {
      this.userApiService
        .updateUser(this.loadedUser.id, this.email, this.password)
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
