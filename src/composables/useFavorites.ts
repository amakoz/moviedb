import { TMovieData } from "@/types/movies";
import { ref, watch } from "vue";

export function useFavorites() {
  const favorites = ref<TMovieData[]>([]);

  const addFavorite = (movie: TMovieData) => {
    if (!favorites.value.find((m) => m.id === movie.id)) {
      favorites.value.push(movie);
    }
  };

  const removeFavorite = (movieId: number) => {
    favorites.value = favorites.value.filter((movie) => movie.id !== movieId);
  };

  // Persist to localStorage
  watch(
    favorites,
    (newFavorites) => {
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
    },
    { deep: true },
  );

  // Initialize from localStorage
  const loadFavorites = () => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      favorites.value = JSON.parse(storedFavorites);
    }
  };

  return { favorites, addFavorite, removeFavorite, loadFavorites };
}
