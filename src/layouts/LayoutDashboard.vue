<script setup lang="ts">
import { DashboardHeader } from "@/app.organizer";
</script>

<template>
  <div
    class="layout-dashboard flex flex-col min-h-screen dark:bg-gray-900 light:bg-white"
  >
    <DashboardHeader class="fixed w-screen z-50" />
    <slot />
  </div>
</template>

<style lang="scss"></style>
