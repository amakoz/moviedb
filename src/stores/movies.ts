import { defineStore, acceptHMRUpdate } from "pinia";
import useApi from '@composables/useApi';
import { TMovieData } from "@/types/movies";
import { LOCALSTORAGE_MOVIES_FAVORITES } from "@/app.storages";

import { GET_MOVIES_GENRES, GET_MOVIES_POPULAR } from './movies.api'

export const useMoviesStore = defineStore({
    id: "movies",

    state: () => ({
        favorites: localStorage.getItem(LOCALSTORAGE_MOVIES_FAVORITES)
            ? (JSON.parse(
                localStorage.getItem(LOCALSTORAGE_MOVIES_FAVORITES) as string
            ) as TMovieData[])
            : ([] as TMovieData[]),
        moviesTrends: [],
        moviesGenres: [],
        error: '',
        loading: false,
        currentPage: 1,
        end: false,
    }),

    actions: {
        /**
         * Get Movies genres
         * @param genre
         * @param page
         */
        async getGenres(genre: number[], page: number = 1) {

            try {
                this.loading = true;
                const response = await useApi(GET_MOVIES_GENRES, {
                    query: {
                        with_genres: !genre.includes(0) ? genre.join("|") : null,
                        page: page,
                    }
                })

                if (response.isSuccess) {
                    if (page <= this.currentPage) this.moviesGenres = response.data.results;
                    else this.moviesGenres = this.moviesGenres.concat(response.data.results);
                    if (response.data.total_pages === page) this.end = true;
                    else this.end = false;

                    this.currentPage = page;
                }
                this.loading = false;
            } catch (e) {
                console.error(e);
            }


        },
        /**
         * Get movies trends
         */
        async getTrends() {
            try {
                this.loading = true;

                const response = await useApi(GET_MOVIES_POPULAR);

                if (response.isSuccess) {
                    this.moviesTrends = response.data.results.slice(0, 4);
                }
                this.loading = false;
            }
            catch(e) {
                console.error(e);
            }

        },
        /**
         * Add to favorites
         * @param movie
         */
        addFavorite(movie: TMovieData) {
            this.favorites.push(movie);
            localStorage.setItem(
                LOCALSTORAGE_MOVIES_FAVORITES,
                JSON.stringify(this.favorites)
            );
        },
        /**
         * Remove from favorites
         * @param movie
         */
        removeFavorite(movie: TMovieData) {
            this.favorites = this.favorites.filter(
                (e: TMovieData) => e.id !== movie.id
            );
            localStorage.setItem(
                LOCALSTORAGE_MOVIES_FAVORITES,
                JSON.stringify(this.favorites)
            );
        },
    },
});
