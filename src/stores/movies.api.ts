import { METHOD } from "@composables/helpers/useRequest";
import axios from "axios";
const PATH_MOVIE_DB = "https://api.themoviedb.org/3/";
const apiKey = import.meta.env.VITE_DBMOVIE_API_KEY;

export const GET_MOVIES_GENRES = {
  api: axios,
  method: METHOD.GET,
  path: `${PATH_MOVIE_DB}discover/movie`,

  query: {
    api_key: {
      required: true,
      default: apiKey,
    },
    page: {
      required: false,
    },
    with_genres: {
      required: false,
    },
  },
};

export const GET_MOVIES_POPULAR = {
  api: axios,
  method: METHOD.GET,
  path: `${PATH_MOVIE_DB}movie/popular`,
  query: {
    api_key: {
      required: true,
      default: apiKey,
    },
  },
};
