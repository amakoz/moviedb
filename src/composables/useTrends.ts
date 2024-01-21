import useApi from "@/composables/useApi";
import { GET_MOVIES_POPULAR } from "@/stores/movies.api";

export function useTrends() {
  const getTrends = async () => {
    return await useApi(GET_MOVIES_POPULAR);
  };

  return { getTrends };
}
