<template>
  <CCard>
    <CCardHeader> Test Center List </CCardHeader>
    <CCardBody>
      <CDataTable
        hover
        striped
        :items="items"
        :fields="fields"
        :items-per-page="10"
        clickable-rows
        :active-page="currentPage"
        @row-clicked="onRowClicked"
        :pagination="{ doubleArrows: false, align: 'center' }"
        @page-change="onPageChange"
      >
        <template #address="data">
          <td>
            <CBadge color="primary">
              {{ data.item.address }}
            </CBadge>
          </td>
        </template>
        <template #cityLocation="data">
          <td>
            <CBadge color="primary">
              {{ data.item.cityLocation.name }}
            </CBadge>
          </td>
        </template>
        <template #createdAt="data">
          <td>
            <CBadge color="primary">
              {{ data.item.createdAt }}
            </CBadge>
          </td>
        </template>
        <template #updatedAt="data">
          <td>
            <CBadge color="secondary">
              {{ data.item.updatedAt ? data.item.updatedAt : "newer" }}
            </CBadge>
          </td>
        </template>
      </CDataTable>
    </CCardBody>
  </CCard>
</template>

<script>
import { createTestCenterApiService } from "@/service/test-center.api.service.factory";

export default {
  name: "TestCenterList",
  data() {
    return {
      currentPage: 1,
      items: [],
      fields: [
        { key: "name", label: "Name", _classes: "font-weight-bold" },
        { key: "address" },
        { key: "cityLocation" },
        { key: "createdAt" },
        { key: "updatedAt" },
      ],
      testCenterApiService: null,
    };
  },
  created() {
    if (this.$route.query && this.$route.query.page) {
      this.currentPage = Number(this.$route.query.page);
    }

    this.testCenterApiService = createTestCenterApiService();
    this.loadTestCenters(this.currentPage);
  },
  watch: {
    $route: {
      immediate: true,
      handler(route) {
        if (route.query && route.query.page) {
          this.currentPage = Number(route.query.page);
        }
      },
    },
  },
  methods: {
    loadTestCenters(page) {
      this.testCenterApiService.loadTestCenters(page).then((response) => {
        this.currentPage = response.page;
        this.items = response.items;
      });
    },
    onRowClicked(item) {
      this.$router.push({ name: "testCenterEdit", params: { id: item.id } });
    },
    onPageChange(newPage) {
      this.$router.push({ query: { page: newPage } });
    },
  },
};
</script>
