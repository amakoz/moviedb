<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { BaseCard, MovieCard } from "@/app.organizer";
import { useMoviesStore } from "@/stores/movies";

const backgroundImage = ref("");

const storeMovies =  useMoviesStore();

const movies = computed(() => storeMovies.moviesTrends)
const getTrends = storeMovies.getTrends;

const updateBackgroundImage = (imagePath: string) => {
  backgroundImage.value = imagePath;
};

onMounted(() => getTrends());
</script>

<template>
  <div class="flex flex-1 relative">
    <transition name="slide-fade" ease-out>
      <div
        v-if="backgroundImage !== ''"
        :key="backgroundImage"
        class="absolute z-0 w-full h-full opacity-30 transition-all duration-700 bg-cover bg-color-black"
        :style="{
          backgroundImage: 'url(' + backgroundImage + ')',
        }"
      />
    </transition>
    <div
      class="db-index z-20 pt-20 mx-auto w-5/6 max-w-screen-xl flex-1 flex justify-center items-center"
    >
      <BaseCard title="Current trends" :external-title="true">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          <MovieCard
            v-for="(movie, index) in movies"
            :key="'m-' + index"
            class="a-03 fadeInUp"
            :class="'d-' + index * 100"
            :data="movie"
            @onHover="updateBackgroundImage"
          />
        </div>
      </BaseCard>
    </div>
  </div>
</template>

<style lang="scss"></style>
