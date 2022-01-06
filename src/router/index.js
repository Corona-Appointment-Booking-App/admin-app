import Vue from "vue";
import Router from "vue-router";
import { createAuthCheckApiService } from "@/service/auth-check.api.service.factory";

const TheContainer = () => import("@/containers/TheContainer");

const Dashboard = () => import("@/views/Dashboard");

const CityList = () => import("@/views/pages/City/CityList");
const CityCreate = () => import("@/views/pages/City/CityCreate");
const CityEdit = () => import("@/views/pages/City/CityEdit");

const CityLocationList = () =>
  import("@/views/pages/CityLocation/CityLocationList");
const CityLocationCreate = () =>
  import("@/views/pages/CityLocation/CityLocationCreate");
const CityLocationEdit = () =>
  import("@/views/pages/CityLocation/CityLocationEdit");

const TestCenterList = () => import("@/views/pages/TestCenter/TestCenterList");
const TestCenterCreate = () =>
  import("@/views/pages/TestCenter/TestCenterCreate");
const TestCenterEdit = () => import("@/views/pages/TestCenter/TestCenterEdit");

const UserList = () => import("@/views/pages/User/UserList");
const UserCreate = () => import("@/views/pages/User/UserCreate");
const UserEdit = () => import("@/views/pages/User/UserEdit");

const BookingList = () => import("@/views/pages/Booking/BookingList");

const Login = () => import("@/views/pages/Login");
const Logout = () => import("@/views/pages/Logout");
const Page404 = () => import("@/views/pages/Page404");
const Page500 = () => import("@/views/pages/Page500");

const authCheckApiService = createAuthCheckApiService();

Vue.use(Router);

const router = new Router({
  mode: "hash", // https://router.vuejs.org/api/#mode
  linkActiveClass: "active",
  scrollBehavior: () => ({ y: 0 }),
  routes: configRoutes(),
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    authCheckApiService
      .authCheck(localStorage.getItem("authToken"))
      .then(() => {
        next();
      })
      .catch(() => {
        localStorage.removeItem("authToken");
        next({ name: "login" });
      });
  } else {
    next();
  }
});

function configRoutes() {
  return [
    {
      path: "/",
      meta: {
        label: "Dashboard",
        requiresAuth: true,
      },
      redirect: "/dashboard",
      name: "dashboardIndex",
      component: TheContainer,
      children: [
        {
          path: "dashboard",
          name: "Dashboard",
          component: Dashboard,
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: "city",
          meta: {
            label: "City",
            requiresAuth: true,
          },
          component: {
            render(c) {
              return c("router-view");
            },
          },
          children: [
            {
              path: "list",
              name: "cityList",
              component: CityList,
              meta: {
                label: "City List",
                requiresAuth: true,
              },
            },
            {
              path: "create",
              name: "cityCreate",
              component: CityCreate,
              meta: {
                label: "City Create",
                requiresAuth: true,
              },
            },
            {
              path: "edit/:id",
              name: "cityEdit",
              component: CityEdit,
              meta: {
                label: "City Edit",
                requiresAuth: true,
              },
            },
          ],
        },
        {
          path: "city/location",
          meta: {
            label: "City Location",
            requiresAuth: true,
          },
          component: {
            render(c) {
              return c("router-view");
            },
          },
          children: [
            {
              path: "list",
              name: "cityLocationList",
              component: CityLocationList,
              meta: {
                label: "City Location List",
                requiresAuth: true,
              },
            },
            {
              path: "create",
              name: "cityLocationCreate",
              component: CityLocationCreate,
              meta: {
                label: "City Location Create",
                requiresAuth: true,
              },
            },
            {
              path: "edit/:id",
              name: "cityLocationEdit",
              component: CityLocationEdit,
              meta: {
                label: "City Location Edit",
                requiresAuth: true,
              },
            },
          ],
        },
        {
          path: "test-center",
          meta: {
            label: "Test Center",
            requiresAuth: true,
          },
          component: {
            render(c) {
              return c("router-view");
            },
          },
          children: [
            {
              path: "list",
              name: "testCenterList",
              component: TestCenterList,
              meta: {
                label: "Test Center List",
                requiresAuth: true,
              },
            },
            {
              path: "create",
              name: "testCenterCreate",
              component: TestCenterCreate,
              meta: {
                label: "Test Center Create",
                requiresAuth: true,
              },
            },
            {
              path: "edit/:id",
              name: "testCenterEdit",
              component: TestCenterEdit,
              meta: {
                label: "Test Center Edit",
                requiresAuth: true,
              },
            },
          ],
        },
        {
          path: "user",
          meta: {
            label: "User",
            requiresAuth: true,
          },
          component: {
            render(c) {
              return c("router-view");
            },
          },
          children: [
            {
              path: "list",
              name: "userList",
              component: UserList,
              meta: {
                label: "User List",
                requiresAuth: true,
              },
            },
            {
              path: "create",
              name: "userCreate",
              component: UserCreate,
              meta: {
                label: "User Create",
                requiresAuth: true,
              },
            },
            {
              path: "edit/:id",
              name: "userEdit",
              component: UserEdit,
              meta: {
                label: "User Edit",
                requiresAuth: true,
              },
            },
          ],
        },
        {
          path: "booking",
          meta: {
            label: "Booking",
            requiresAuth: true,
          },
          component: {
            render(c) {
              return c("router-view");
            },
          },
          children: [
            {
              path: "list",
              name: "bookingList",
              component: BookingList,
              meta: {
                label: "Booking List",
                requiresAuth: true,
              },
            },
          ],
        },
      ],
    },
    {
      path: "/pages",
      redirect: "/pages/404",
      name: "Pages",
      component: {
        render(c) {
          return c("router-view");
        },
      },
      children: [
        {
          path: "login",
          name: "login",
          component: Login,
        },
        {
          path: "logout",
          name: "logout",
          component: Logout,
        },
        {
          path: "404",
          name: "page404",
          component: Page404,
        },
        {
          path: "500",
          name: "page500",
          component: Page500,
        },
      ],
    },
  ];
}

export default router;
