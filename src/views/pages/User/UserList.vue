<template>
  <CCard>
    <CCardHeader> User List </CCardHeader>
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
import { createUserApiService } from "@/service/user.api.service.factory";

export default {
  name: "UserList",
  data() {
    return {
      currentPage: 1,
      items: [],
      fields: [
        { key: "email", label: "Email", _classes: "font-weight-bold" },
        { key: "createdAt" },
        { key: "updatedAt" },
      ],
      userApiService: null,
    };
  },
  created() {
    if (this.$route.query && this.$route.query.page) {
      this.currentPage = Number(this.$route.query.page);
    }

    this.userApiService = createUserApiService();
    this.loadUsers(this.currentPage);
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
    loadUsers(page) {
      this.userApiService.loadUsers(page).then((response) => {
        this.currentPage = response.page;
        this.items = response.items;
      });
    },
    onRowClicked(item) {
      this.$router.push({ name: "userEdit", params: { id: item.id } });
    },
    onPageChange(newPage) {
      this.$router.push({ query: { page: newPage } });
    },
  },
};
</script>
