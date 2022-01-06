export default [
  {
    _name: "CSidebarNav",
    _children: [
      {
        _name: "CSidebarNavItem",
        name: "Dashboard",
        to: "/dashboard",
        icon: "cil-speedometer",
      },
      {
        _name: "CSidebarNavItem",
        name: "Frontend",
        to: "/dashboard",
        icon: "cil-laptop",
      },
      {
        _name: "CSidebarNavTitle",
        _children: ["Content"],
      },
      {
        _name: "CSidebarNavDropdown",
        name: "City",
        route: "/city/list",
        icon: "cil-star",
        items: [
          {
            name: "City List",
            to: "/city/list",
          },
          {
            name: "City Create",
            to: "/city/create",
          },
        ],
      },
      {
        _name: "CSidebarNavDropdown",
        name: "City Location",
        route: "/city/location/list",
        icon: "cil-location-pin",
        items: [
          {
            name: "City Location List",
            to: "/city/location/list",
          },
          {
            name: "City Location Create",
            to: "/city/location/create",
          },
        ],
      },
      {
        _name: "CSidebarNavDropdown",
        name: "Test Center",
        route: "/test-center/list",
        icon: "cil-bell",
        items: [
          {
            name: "Test Center List",
            to: "/test-center/list",
          },
          {
            name: "Test Center Create",
            to: "/test-center/create",
          },
        ],
      },
      {
        _name: "CSidebarNavDropdown",
        name: "Booking",
        route: "/booking/list",
        icon: "cil-check-circle",
        items: [
          {
            name: "Booking List",
            to: "/booking/list",
          },
        ],
      },
      {
        _name: "CSidebarNavDropdown",
        name: "User",
        route: "/user/list",
        icon: "cil-user",
        items: [
          {
            name: "List",
            to: "/user/list",
          },
          {
            name: "Create",
            to: "/user/create",
          },
        ],
      },
      {
        _name: "CSidebarNavItem",
        name: "Logout",
        href: "#/pages/logout",
        icon: { name: "cil-lock-locked", class: "text-white" },
        _class: "bg-primary text-white",
      },
    ],
  },
];
