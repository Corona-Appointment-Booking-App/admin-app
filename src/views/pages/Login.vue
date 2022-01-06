<template>
  <div class="c-app flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol md="8">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <CAlert
                  show
                  color="success"
                  v-if="hasAuthenticationSucceed === true"
                >
                  <strong>Login Success!</strong> You will be redirected
                </CAlert>

                <CAlert
                  show
                  color="danger"
                  v-if="hasAuthenticationSucceed === false"
                >
                  <strong>Login failed!</strong> Username or Password wrong
                </CAlert>

                <CForm @submit.prevent="onSubmitLogin">
                  <h1>Welcome</h1>
                  <p class="text-muted">Please log in to continue</p>
                  <CInput
                    placeholder="Email"
                    type="email"
                    required="required"
                    :value.sync="currentEmail"
                  >
                    <template #prepend-content
                      ><CIcon name="cil-user"
                    /></template>
                  </CInput>
                  <CInput
                    placeholder="Password"
                    type="password"
                    required="required"
                    :value.sync="currentPassword"
                  >
                    <template #prepend-content
                      ><CIcon name="cil-lock-locked"
                    /></template>
                  </CInput>
                  <CRow>
                    <CCol col="6" class="text-left">
                      <CButton type="submit" color="primary">
                        <CIcon name="cil-check-circle" />
                        Submit
                      </CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
import apiClient from "@/service/api.client.service";
import { createAuthCheckApiService } from "@/service/auth-check.api.service.factory";

export default {
  name: "Login",
  data() {
    return {
      currentEmail: null,
      currentPassword: null,
      hasAuthenticationSucceed: null,
      authCheckApiService: null,
    };
  },
  created() {
    this.authCheckApiService = createAuthCheckApiService();
    this.authCheckApiService
      .authCheck(localStorage.getItem("authToken"))
      .then(() => {
        this.$router.push({ name: "dashboardIndex" });
      });
  },
  methods: {
    onSubmitLogin() {
      apiClient
        .post("login_check", {
          email: this.currentEmail,
          password: this.currentPassword,
        })
        .then((response) => {
          const { token } = response.data;
          localStorage.setItem("authToken", token);

          this.hasAuthenticationSucceed = true;
          this.$router.go();
        })
        .catch(() => {
          this.hasAuthenticationSucceed = false;
        });
    },
  },
};
</script>
