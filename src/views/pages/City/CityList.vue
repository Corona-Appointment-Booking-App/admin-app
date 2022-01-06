<template>
  <CCard>
    <CCardHeader> City List </CCardHeader>
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
import { createCityApiService } from "@/service/city.api.service.factory";

export default {
  name: "CityList",
  data() {
    return {
      currentPage: 1,
      items: [],
      fields: [
        { key: "name", label: "Name", _classes: "font-weight-bold" },
        { key: "createdAt" },
        { key: "updatedAt" },
      ],
      cityApiService: null,
    };
  },
  created() {
    if (this.$route.query && this.$route.query.page) {
      this.currentPage = Number(this.$route.query.page);
    }

    this.cityApiService = createCityApiService();
    this.loadCities(this.currentPage);
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
    loadCities(page) {
      this.cityApiService.loadCities(page).then((response) => {
        this.currentPage = response.page;
        this.items = response.items;
      });
    },
    onRowClicked(item) {
      this.$router.push({ name: "cityEdit", params: { id: item.id } });
    },
    onPageChange(newPage) {
      this.$router.push({ query: { page: newPage } });
    },
  },
};
</script>
