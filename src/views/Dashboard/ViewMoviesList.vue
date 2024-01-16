<script lang="ts">
import { defineComponent, Ref } from 'vue'
// import { useInfiniteScroll } from "@vueuse/core";
import { CategoriesTabs, MovieCard } from "@/app.organizer";
import { TCategoryItem } from "@/types/movies";
import { ROUTE_DASHBOARD_MOVIES_LIST } from "@/app.routes";
import { useMoviesStore } from "@/stores/movies";

export default  defineComponent({
    components: {
        CategoriesTabs,
        MovieCard,
    },
    data() {
        return {
            refInfiniteList: null,
            currentTab: null as TCategoryItem | null,
            isLoadingNextPage: false,
            categories: [
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
            ]
        }
    },
    computed: {
        storeMovies() {
            return useMoviesStore();
        },
        currentPage() {
            return this.storeMovies.currentPage;
        },
         moviesGenres() {
            return this.storeMovies.moviesGenres;
        },
         end() {
            return this.storeMovies.end;
        }
    },
    methods: {
        getGenres (genre: number[], page: number = 1) { return this.storeMovies.getGenres(genre, page) },
        getCategory(name: string): TCategoryItem | undefined {
            return this.categories.find((e: any) => e.name === name);
        },

        onChangeTab(tab: TCategoryItem): void {
            this.$router.push({
                name: ROUTE_DASHBOARD_MOVIES_LIST.name,
                query: { genre: tab.name },
            });
            this.currentTab = tab;
            this.getGenres(tab.value, 1);
        },

        async handleScroll(event: any) {
            const { target } = event;
            if (target.scrollTop + target.clientHeight >= target.scrollHeight - (400 * this.currentPage)) {
                if (!this.end && !this.isLoadingNextPage) {
                    this.isLoadingNextPage = true;
                    const category = this.currentTab || null;
                    if (category) await this.getGenres(category.value, this.currentPage + 1);
                    this.isLoadingNextPage = false;
                }
            }
        }
    },



    created() {
        const queryGenre = this.$route.query.genre || null;
        if (queryGenre) {
            let categoryQuery = this.getCategory(queryGenre as string);
            if (categoryQuery) this.currentTab = categoryQuery;
        } else {
            this.currentTab = this.categories[0];
        }


    },

    mounted() {
        this.refInfiniteList = this.$refs.refInfiniteList as any;
        const category = this.currentTab;
        if (category)
        this.getGenres(category.value, this.currentPage);

    }
})
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
