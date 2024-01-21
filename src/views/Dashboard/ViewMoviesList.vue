<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import { CategoriesTabs, MovieCard } from "@/app.organizer";
import { TCategoryItem } from "@/types/movies";
import { ROUTE_DASHBOARD_MOVIES_LIST } from "@/app.routes";
import { useMoviesStore } from "@/stores/movies";
import { useRoute, useRouter } from "vue-router";

interface ScrollTarget {
  target: HTMLElement;
}

const CATEGORIES_LIST: Array<TCategoryItem> = [
  {
    name: "All",
    value: [28, 16, 12, 35, 99],
  },
  {
    name: "Action",
    value: [28],
  },
  {
    name: "Animation",
    value: [16],
  },
  {
    name: "Adventure",
    value: [12],
  },
  {
    name: "Comedy",
    value: [35],
  },
  {
    name: "Documentary",
    value: [99],
  },
];

const router = useRouter();
const route = useRoute();
const refInfiniteList = ref<HTMLDivElement | null>(null);
const currentTab = ref<TCategoryItem | null>(null);
const isLoadingNextPage = ref<boolean>(false);
const categories = ref<Array<TCategoryItem>>(CATEGORIES_LIST);

const storeMovies = computed(() => {
  return useMoviesStore();
});
const currentPage = computed(() => {
  return storeMovies.value.currentPage;
});
const moviesGenres = computed(() => {
  return storeMovies.value.moviesGenres;
});
const end = computed(() => {
  return storeMovies.value.end;
});

const getGenres = (genre: number[], page: number = 1) =>
  storeMovies.value.fetchGenres(genre, page);
const getCategory = (name: string): TCategoryItem | undefined =>
  categories.value.find((category) => category.name === name);

const onChangeTab = (tab: TCategoryItem): void => {
  router.push({
    name: ROUTE_DASHBOARD_MOVIES_LIST.name,
    query: { genre: tab.name },
  });
  currentTab.value = tab;
  getGenres(tab.value, 1);
};

const handleScroll = async (event: UIEvent): Promise<void> => {
  const { target } = event as unknown as ScrollTarget;
  const scrollThreshold =
    target.scrollTop + target.clientHeight >=
    target.scrollHeight - 400 * currentPage.value;

  if (scrollThreshold && !end.value && !isLoadingNextPage.value) {
    isLoadingNextPage.value = true;
    const category = currentTab.value || null;
    if (category) await getGenres(category.value, currentPage.value + 1);
    isLoadingNextPage.value = false;
  }
};

onMounted(() => {
  const category = currentTab.value;
  if (category) getGenres(category.value, currentPage.value);
});

const queryGenre = route.query.genre || null;
if (queryGenre) {
  const categoryQuery = getCategory(queryGenre as string);
  if (categoryQuery) currentTab.value = categoryQuery;
} else {
  currentTab.value = categories.value[0];
}
</script>

<template>
  <div class="db-movies-list flex-1 flex flex-col p-1 pt-16">
    <CategoriesTabs
      :items="categories"
      @onChange="onChangeTab"
      :value="currentTab"
      class="a-04 fadeInDown"
    />
    <div
      ref="refInfiniteList"
      class="a-07 fadeInUp h-10 overflow-y-scroll flex-auto"
      @scroll="handleScroll"
    >
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <MovieCard
          v-for="(movie, index) in moviesGenres"
          :key="'m-' + index"
          :data="movie"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss"></style>
