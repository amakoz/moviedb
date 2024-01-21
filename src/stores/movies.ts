import { defineStore } from "pinia";
import { useGenresComposable } from "@composables/useGenresComposable";
import { useTrendsComposable } from "@composables/useTrendsComposable";
import { useFavoritesComposable } from "@composables/useFavoritesComposable";
import { TMovieData } from "@/types/movies";
import { ref } from "vue";

export const useMoviesStore = defineStore("movies", () => {
  const { getGenres } = useGenresComposable();
  const { getTrends } = useTrendsComposable();
  const { favorites, addFavorite, removeFavorite, loadFavorites } =
    useFavoritesComposable();

  const moviesGenres = ref<TMovieData[]>([]);
  const moviesTrends = ref<TMovieData[]>([]);
  const loading = ref(false);
  const currentPage = ref(1);
  const end = ref(false);

  const fetchGenres = async (genre: number[], page: number) => {
    loading.value = true;
    try {
      const response = await getGenres(genre, page);
      if (response.isSuccess) {
        moviesGenres.value =
          page <= currentPage.value
            ? response.data.results
            : moviesGenres.value.concat(response.data.results);
        end.value = response.data.total_pages === page;
        currentPage.value = page;
      }
    } catch (e) {
      console.error(e);
    } finally {
      loading.value = false;
    }
  };

  const fetchTrends = async () => {
    loading.value = true;
    try {
      const response = await getTrends();
      if (response.isSuccess) {
        moviesTrends.value = response.data.results.slice(0, 4);
      }
    } catch (e) {
      console.error(e);
    } finally {
      loading.value = false;
    }
  };

  // Initialize favorites from localStorage on store creation
  loadFavorites();

  return {
    favorites,
    addFavorite,
    removeFavorite,
    fetchGenres,
    fetchTrends,
    moviesGenres,
    moviesTrends,
    loading,
    currentPage,
    end,
  };
});
