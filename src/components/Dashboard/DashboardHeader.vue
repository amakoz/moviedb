<script setup lang="ts">
import { ref, computed, watch, inject } from "vue";
import { useRouter } from "vue-router";
import {
  ROUTE_DASHBOARD,
  ROUTE_DASHBOARD_MOVIES_LIST,
  ROUTE_DASHBOARD_MOVIES_FAVORITES,
} from "@/app.routes";
import { IAppProvider } from "@/providers/app";

const router = useRouter();
const isMobileMenuOpen = ref(false);
const currentRouteName = computed(() => router.currentRoute.value.name);
const App = inject("App") as IAppProvider;
const setMobileMenuOpen = (value: boolean) => {
  isMobileMenuOpen.value = value;
};
watch(currentRouteName, () => {
  isMobileMenuOpen.value = false;
});
</script>

<template>
  <header>
    <nav class="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
      <div
        class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl"
      >
        <div class="flex items-center">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            class="mr-3 h-6 sm:h-9"
            alt="Flowbite Logo"
          />
          <span
            class="self-center text-xl font-semibold whitespace-nowrap dark:text-white"
            >PrimeMovies</span
          >
        </div>
        <div class="flex items-center lg:order-2">
          <button
            @click="() => setMobileMenuOpen(!isMobileMenuOpen)"
            type="button"
            class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <svg
              :class="{ hidden: isMobileMenuOpen }"
              class="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <svg
              :class="{ hidden: !isMobileMenuOpen }"
              class="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div
          :class="{ hidden: !isMobileMenuOpen }"
          class="justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
          id="mobile-menu-2"
        >
          <ul
            class="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0"
          >
            <li>
              <router-link :to="{ name: ROUTE_DASHBOARD.name }">
                <span
                  :class="
                    currentRouteName === ROUTE_DASHBOARD.name
                      ? 'dark:text-white light:text-black'
                      : 'text-gray-400 dark:hover:text-white light:hover:text-black'
                  "
                  class="block py-2 pr-4 pl-3 border-b border-gray-100 hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Home
                </span>
              </router-link>
            </li>
            <li>
              <router-link :to="{ name: ROUTE_DASHBOARD_MOVIES_LIST.name }">
                <span
                  :class="
                    currentRouteName === ROUTE_DASHBOARD_MOVIES_LIST.name
                      ? 'dark:text-white light:text-black'
                      : 'text-gray-400 dark:hover:text-white light:hover:text-black'
                  "
                  class="block py-2 pr-4 pl-3 border-b border-gray-100 hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                >
                  List
                </span>
              </router-link>
            </li>
            <li>
              <router-link
                :to="{ name: ROUTE_DASHBOARD_MOVIES_FAVORITES.name }"
              >
                <span
                  :class="
                    currentRouteName === ROUTE_DASHBOARD_MOVIES_FAVORITES.name
                      ? 'dark:text-white light:text-black'
                      : 'text-gray-400 dark:hover:text-white light:hover:text-black'
                  "
                  class="block py-2 pr-4 pl-3 border-b border-gray-100 hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Favorites
                </span>
              </router-link>
            </li>
          </ul>
        </div>
        <div class="hidden lg:flex lg:order-3">
          <label class="inline-flex relative items-center cursor-pointer">
            <input
              type="checkbox"
              :checked="App.theme.value === 'light' ? true : false"
              @input="
                () =>
                  App.setTheme(App.theme.value === 'light' ? 'dark' : 'light')
              "
              class="sr-only peer"
            />
            <div
              class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
            ></div>
            <span
              class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"
              >Light Mode</span
            >
          </label>
        </div>
      </div>
    </nav>
  </header>
</template>

<style lang="scss"></style>
