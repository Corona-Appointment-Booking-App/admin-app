<template>
  <div>
    <CCard>
      <CCardHeader> <strong>Edit Test Center</strong> {{ name }} </CCardHeader>
      <CCardBody>
        <CAlert
          :show.sync="successNotificationDismissCountDown"
          closeButton
          color="success"
          v-if="isPersistenceSuccessfully"
        >
          Test Center updated successfully
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

        <CForm @submit.prevent="updateTestCenter">
          <CInput
            description="Name"
            label="Name"
            required="required"
            :value.sync="name"
            horizontal
          />

          <CInput
            description="Address"
            label="Address"
            required="required"
            :value.sync="address"
            horizontal
          />

          <CSelect
            label="City Location"
            horizontal
            :value.sync="cityLocationId"
            :options="loadedCityLocations"
            placeholder="Please select"
          />

          <CButton size="lg" color="primary" class="mb-4" block
            >Opening Days 1</CButton
          >

          <CRow>
            <CCol md="6">
              <CSelect
                v-for="loadedOpeningDay in loadedOpeningDays.openingDays"
                :key="`opening-day-${loadedOpeningDay}-from`"
                :label="`${loadedOpeningDay} from`"
                horizontal
                :value.sync="selectedOpeningDaysFrom[loadedOpeningDay]"
                :options="loadedOpeningDays.openingTimes"
                placeholder="Please select if open"
              />
            </CCol>
            <CCol md="6">
              <CSelect
                v-for="loadedOpeningDay in loadedOpeningDays.openingDays"
                :key="`opening-day-${loadedOpeningDay}-to`"
                :label="`${loadedOpeningDay} to`"
                horizontal
                :value.sync="selectedOpeningDaysTo[loadedOpeningDay]"
                :options="loadedOpeningDays.openingTimes"
                placeholder="Please select if open"
              />
            </CCol>
          </CRow>

          <hr />
          <CButton size="lg" color="primary" class="mb-4" block
            >Opening Days 2</CButton
          >

          <CRow>
            <CCol md="6">
              <CSelect
                v-for="loadedOpeningDay in loadedOpeningDays.openingDays"
                :key="`opening-day-${loadedOpeningDay}-from`"
                :label="`${loadedOpeningDay} from`"
                horizontal
                :value.sync="selectedOpeningDaysFromSecond[loadedOpeningDay]"
                :options="loadedOpeningDays.openingTimes"
                placeholder="Please select if open"
              />
            </CCol>
            <CCol md="6">
              <CSelect
                v-for="loadedOpeningDay in loadedOpeningDays.openingDays"
                :key="`opening-day-${loadedOpeningDay}-to`"
                :label="`${loadedOpeningDay} to`"
                horizontal
                :value.sync="selectedOpeningDaysToSecond[loadedOpeningDay]"
                :options="loadedOpeningDays.openingTimes"
                placeholder="Please select if open"
              />
            </CCol>
          </CRow>

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
import { createTestCenterApiService } from "@/service/test-center.api.service.factory";
import { createCityLocationApiService } from "@/service/city.location.api.service.factory";
import { createOpeningDayApiService } from "@/service/opening-day.api.service.factory";

export default {
  name: "TestCenterEdit",
  data() {
    return {
      loadedTestCenter: {},
      name: null,
      address: null,
      cityLocationId: null,
      loadedCityLocations: [],
      loadedOpeningDays: {},
      selectedOpeningDaysFrom: [],
      selectedOpeningDaysTo: [],
      selectedOpeningDaysFromSecond: [],
      selectedOpeningDaysToSecond: [],
      isValidationFailed: false,
      isPersistenceFailed: false,
      isPersistenceSuccessfully: false,
      successNotificationDismissSecs: 3,
      successNotificationDismissCountDown: 3,
      testCenterApiService: null,
      cityLocationApiService: null,
      openingDayApiService: null,
    };
  },
  created() {
    this.testCenterApiService = createTestCenterApiService();
    this.cityLocationApiService = createCityLocationApiService();
    this.openingDayApiService = createOpeningDayApiService();

    this.loadTestCenter(this.$route.params.id);
    this.loadCityLocations(1, 1000);
    this.loadOpeningDays();
  },
  methods: {
    loadTestCenter(id) {
      this.testCenterApiService.loadTestCenter(id).then((response) => {
        this.loadedTestCenter = response.loadedTestCenter;
        this.name = this.loadedTestCenter.name;
        this.address = this.loadedTestCenter.address;
        this.cityLocationId = this.loadedTestCenter.cityLocation.id;

        this.loadedTestCenter.openingDays.forEach((openingDay) => {
          if (!openingDay.times[0]) {
            return;
          }
          this.selectedOpeningDaysFrom[openingDay.day] =
            openingDay.times[0].from || null;
          this.selectedOpeningDaysTo[openingDay.day] =
            openingDay.times[0].to || null;

          if (!openingDay.times[1]) {
            return;
          }
          this.selectedOpeningDaysFromSecond[openingDay.day] =
            openingDay.times[1].from || null;
          this.selectedOpeningDaysToSecond[openingDay.day] =
            openingDay.times[1].to || null;
        });
      });
    },
    loadCityLocations(page, perPage) {
      this.cityLocationApiService
        .loadCityLocationOptions(page, perPage)
        .then((response) => {
          this.loadedCityLocations = response;
        });
    },
    loadOpeningDays() {
      this.openingDayApiService.loadGeneratedOpeningDays().then((response) => {
        this.loadedOpeningDays = response;
      });
    },
    updateTestCenter() {
      this.testCenterApiService
        .updateTestCenter(
          this.loadedTestCenter.id,
          this.cityLocationId,
          this.name,
          this.address,
          this.getSelectedOpeningDaysWithFromAndTo()
        )
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
    getSelectedOpeningDaysWithFromAndTo() {
      let openingDays = [];
      this.loadedOpeningDays.openingDays.forEach((loadedOpeningDay) => {
        let from = this.selectedOpeningDaysFrom[loadedOpeningDay] || null;
        let to = this.selectedOpeningDaysTo[loadedOpeningDay] || null;

        let times = [];

        if (from && to) {
          times.push({
            from,
            to,
          });
        }

        let fromSecond =
          this.selectedOpeningDaysFromSecond[loadedOpeningDay] || null;
        let toSecond =
          this.selectedOpeningDaysToSecond[loadedOpeningDay] || null;

        if (fromSecond && toSecond) {
          times.push({
            from: fromSecond,
            to: toSecond,
          });
        }

        if (times.length === 0) {
          return;
        }

        openingDays.push({
          day: loadedOpeningDay,
          times,
        });
      });

      return openingDays;
    },
  },
};
</script>
