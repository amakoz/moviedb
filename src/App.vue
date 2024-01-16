<script setup lang="ts">
import { provide } from "vue";
import "./assets/css/index.css";
import "./assets/css/animate.css";
import { useAppProvider, IAppProvider } from "@/providers/app";
import { useRouter } from "vue-router";
const router = useRouter();
const App: IAppProvider = useAppProvider(router);
provide("App", App);
</script>

<template>
  <div id="app" :class="[App.theme.value]">
    <router-view />
  </div>
</template>

<style>
.slide-fade-enter-active {
  opacity: 0;
  z-index: 10;
}

.slide-fade-leave-active {
  opacity: 0.3;
}

.slide-fade-enter,
.slide-fade-leave-to {
  opacity: 0;
}
</style>
