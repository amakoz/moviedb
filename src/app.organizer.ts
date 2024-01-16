import { defineAsyncComponent } from "vue";
/************************************************
# Layouts list
************************************************/
export const LayoutDashboard = defineAsyncComponent(
  () => import("./layouts/LayoutDashboard.vue")
);

/************************************************
# Views List
************************************************/
export const ViewDashboardIndex = defineAsyncComponent(
  () => import("./views/Dashboard/ViewIndex.vue")
);

/************************************************
 # Commons components list
 ************************************************/
export const DashboardHeader = defineAsyncComponent(
  () => import("./components/Dashboard/DashboardHeader.vue")
);
export const BaseCard = defineAsyncComponent(
  () => import("./components/BaseCard.vue")
);
export const MovieCard = defineAsyncComponent(
  () => import("./components/MovieCard.vue")
);
export const CategoriesTabs = defineAsyncComponent(
  () => import("./components/CategoriesTabs.vue")
);
