<template>
  <div>{{ text }}</div>
</template>

<script setup lang="ts">
import type { MyProps } from "./props.ts";
// defineProps({
//   text: String,
// });
defineProps<MyProps>();
</script>
