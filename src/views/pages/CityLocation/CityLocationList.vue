<template>
  <CCard>
    <CCardHeader> City Location List </CCardHeader>
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
        <template #city="data">
          <td>
            <CBadge color="primary">
              {{ data.item.city.name }}
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
import { createCityLocationApiService } from "@/service/city.location.api.service.factory";

export default {
  name: "CityLocationList",
  data() {
    return {
      currentPage: 1,
      items: [],
      fields: [
        { key: "name", label: "Name", _classes: "font-weight-bold" },
        { key: "city" },
        { key: "createdAt" },
        { key: "updatedAt" },
      ],
      cityLocationApiService: null,
    };
  },
  created() {
    if (this.$route.query && this.$route.query.page) {
      this.currentPage = Number(this.$route.query.page);
    }

    this.cityLocationApiService = createCityLocationApiService();
    this.loadCityLocations(this.currentPage);
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
    loadCityLocations(page) {
      this.cityLocationApiService.loadCityLocations(page).then((response) => {
        this.currentPage = response.page;
        this.items = response.items;
      });
    },
    onRowClicked(item) {
      this.$router.push({ name: "cityLocationEdit", params: { id: item.id } });
    },
    onPageChange(newPage) {
      this.$router.push({ query: { page: newPage } });
    },
  },
};
</script>
