<template>
  <div class="c-app flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol md="8">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <CAlert show color="success">
                  <strong>Logout success!</strong> You will be redirected
                </CAlert>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
export default {
  name: "Logout",
  created() {
    localStorage.removeItem("authToken");
    this.$router.push({ name: "login" });
  },
};
</script>
