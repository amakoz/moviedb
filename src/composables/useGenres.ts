import useApi from "@/composables/useApi";
import { GET_MOVIES_GENRES } from "@/stores/movies.api";

export function useGenres() {
  const getGenres = async (genre: number[], page: number = 1) => {
    return await useApi(GET_MOVIES_GENRES, {
      query: {
        with_genres: !genre.includes(0) ? genre.join("|") : null,
        page,
      },
    });
  };

  return { getGenres };
}
