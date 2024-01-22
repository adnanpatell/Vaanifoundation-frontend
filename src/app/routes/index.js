import React from "react";
import Page from "@jumbo/shared/Page";
import Home from "../pages/home";
import Role from "../pages/role";
import Users from "../pages/users";
import Login2 from "../pages/auth-pages/login2";
import Patients from "../pages/patients";
import PatientsManage from "app/pages/patients/PatientsManage";
import AppointmentStatus from "app/pages/appointments/AppointmentStatus";
import Medicine from "app/pages/medicine";
import MedicineManage from "app/pages/medicine/MedicineManage";

import MedicineCategory from "app/pages/medicine-category";
import MedicineCategoryManage from "app/pages/medicine-category/CategoryManage";

import PHc from "app/pages/phc/PHc";
import PHcManage from "app/pages/phc/PHcManage";

import Diseases from "app/pages/diseases";

import Statistics from "app/pages/statistics";

import CrmDashboard from "app/pages/dashboards/crm/CrmDashboard";

import Conference from "app/pages/conference";
import About from "app/pages/public-site/about/About";
import Contact from "app/pages/public-site/contact/Contact";
import HomePage from "app/pages/public-site/home/HomePage";
import Profile from "app/pages/profile";

/**
 routes which you want to make accessible to both authenticated and anonymous users
 **/
const routesForPublic = [
  
];

/**
 routes only accessible to authenticated users
 **/
const routesForAuthenticatedOnly = [
  {
    path: "/dashboard",
    element: <Page component={Home} />,
  },
  {
    path: "/appointment/:appointment_id",
    element: <Page component={AppointmentStatus} />,
  },
  {
    path: "/user/profile",
    element: <Page component={Profile} />,
  },
  {
    path: "/users/listing",
    element: <Page component={Users} />,
  },
  {
    path: "/conference",
    element: <Page component={Conference} />,
  },
  {
    path: "/settings/role",
    element: <Page component={Role} />,
  },
  {
    path: "/patients",
    element: <Page component={Patients} />,
  },
  {
    path: "/patients/manage",
    element: <Page component={PatientsManage} />,
  },
  {
    path: "/patients/manage/:patient_id",
    element: <Page component={PatientsManage} />,
  },
  {
    path: "/medicine/category",
    element: <Page component={MedicineCategory} />,
  },
  {
    path: "/medicine/category/manage",
    element: <Page component={MedicineCategoryManage} />,
  },
  {
    path: "/medicine/category/manage/:category_id",
    element: <Page component={MedicineCategoryManage} />,
  },
  {
    path: "/medicine/list",
    element: <Page component={Medicine} />,
  },
  {
    path: "/medicine/manage",
    element: <Page component={MedicineManage} />,
  },
  {
    path: "/medicine/manage/:medicine_id",
    element: <Page component={MedicineManage} />,
  },
  {
    path: "/phc/list",
    element: <Page component={PHc} />,
  },
  {
    path: "/phc/manage",
    element: <Page component={PHcManage} />,
  },
  {
    path: "/phc/manage/:phc_id",
    element: <Page component={PHcManage} />,
  },
  {
    path: "/diseases/list",
    element: <Page component={Diseases} />,
  },
  {
    path: "/statistics",
    element: <Page component={Statistics} />,
  },
];

/**
 routes only accessible when user is anonymous
 **/
const routesForNotAuthenticatedOnly = [
  {
    path: "/user/login",
    element: (
      <Page component={Login2} layout={"solo-page"} topNavBar={true} disableSmLogin={true} />
    ),
  },
  {
    path: "/",
    element: <Page layout={"solo-page"} topNavBar={true} component={HomePage} />,
  },
  {
    path: "/about",
    element: <Page layout={"solo-page"} topNavBar={true} component={About} />,
  },
  {
    path: "/contact",
    element: <Page layout={"solo-page"} topNavBar={true} component={Contact} />,
  },
];

const routes = [
  ...routesForPublic,
  ...routesForAuthenticatedOnly,
  ...routesForNotAuthenticatedOnly,
];

export {
  routes as default,
  routesForPublic,
  routesForNotAuthenticatedOnly,
  routesForAuthenticatedOnly,
};
