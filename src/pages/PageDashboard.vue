<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useMeta } from "vue-meta";
import { LayoutDashboard, ViewDashboardIndex } from "../app.organizer";

import { ROUTE_DASHBOARD } from "../app.routes";

useMeta({
  title: "Viously",
  description: "Dashboard",
});

const router = useRouter();
const routeIsHome = computed(
  () => router.currentRoute.value.name === ROUTE_DASHBOARD.name
);
</script>

<template>
  <LayoutDashboard>
    <ViewDashboardIndex v-if="routeIsHome" />
    <router-view v-else />
  </LayoutDashboard>
</template>

<style lang="scss"></style>
