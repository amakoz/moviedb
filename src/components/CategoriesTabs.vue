<script setup lang="ts">
import { Ref, ref } from "vue";
import { TCategoryItem } from "@/types/movies";

const props = defineProps<{
  items: TCategoryItem[];
  value: TCategoryItem | undefined;
}>();

const emit = defineEmits<{
  (e: "onChange", value: TCategoryItem): void;
}>();

const currentValue: Ref<string> = ref(
  props.value ? props.value.name : props.items[0].name
);

const isSelected = (name: string): boolean => {
  return name === currentValue.value;
};

const changeTab = (tab: TCategoryItem): void => {
  currentValue.value = tab.name;
  emit("onChange", tab);
};

const changeSelector = (event: Event) => {
  const target = event.target as HTMLInputElement;
  changeTab(
    props.items.find(
      (e) => target && e.name === (target.value as string)
    ) as TCategoryItem
  );
};
</script>

<template>
  <div class="h-14 mb-2">
    <div
      class="flex flex-1 h-full max-w-screen-xl align-center bg-blue mx-auto items-center"
    >
      <div class="flex-1 flex-row hidden md:flex">
        <div
          v-for="(item, index) of items"
          :key="'cat' + index"
          class="rounded-full mr-5 p-2 dark:text-white text-black"
          :class="
            isSelected(item.name) ? 'underline font-bold ' : 'cursor-pointer'
          "
          @click="changeTab(item)"
        >
          {{ item.name }}
        </div>
      </div>
      <div class="flex-1 flex justify-center md:hidden">
        <select
          v-model="currentValue"
          @change="changeSelector"
          class="select shadow w-64 text-center font-bold border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option v-for="item in props.items">
            {{ item.name }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
