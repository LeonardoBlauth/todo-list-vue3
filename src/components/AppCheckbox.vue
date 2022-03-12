<script setup lang="ts">
import { ref } from "vue";
const switchChecked = ref(false);
</script>

<template>
  <b-form-checkbox
    v-model="switchChecked"
    switch
    unchecked-value="incompleted"
    value="completed"
  ></b-form-checkbox>
</template>
