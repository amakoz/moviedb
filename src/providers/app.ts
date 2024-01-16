import { AVAILABLE_THEMES } from "@/app.constants";
import { LOCALSTORAGE_THEME } from "@/app.storages";
import { reactive, Ref, toRefs } from "vue";
import { Router, RouteLocation } from "vue-router";

export interface IAppProvider {
  loading: Ref<boolean>;
  theme: Ref<string>;
  setTheme: (value: string) => void;
}

export function useAppProvider(router: Router) {
  const state = reactive({
    loading: false,
    theme: localStorage.getItem(LOCALSTORAGE_THEME) || "dark",
  });
  /*
  /* Handling router status
  */
  router.beforeEach(
    (to: RouteLocation, from: RouteLocation, next: Function) => {
      state.loading = true;
      next();
    }
  );
  router.afterEach(() => {
    state.loading = false;
  });
  /*
  /* SETTERS
  */
  const setTheme = (value: string) => {
    if (!Object.values(AVAILABLE_THEMES).includes(value)) return;
    localStorage.setItem(LOCALSTORAGE_THEME, value);
    state.theme = value;
  };

  return {
    ...toRefs(state),
    setTheme,
  } as IAppProvider;
}
