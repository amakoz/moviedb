<script setup lang="ts">
const props = defineProps<{
  title?: string;
  externalTitle?: boolean;
}>();
</script>

<template>
  <div class="flex flex-1 flex-col">
    <template v-if="props.title && props.externalTitle">
      <div
        class="text-4xl dark:text-white text-black p-3 font-extrabold a-05 fadeInDown"
      >
        {{ props.title }}
      </div>
    </template>
    <div class="p-5 mt-5">
      <template v-if="props.title && !props.externalTitle">
        <div class="text-4xl dark:text-white text-black p-3 font-extrabold">
          {{ props.title }}
        </div>
      </template>
      <slot />
    </div>
  </div>
</template>

<style scoped></style>
