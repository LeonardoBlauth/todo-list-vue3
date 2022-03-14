<script setup lang="ts">
defineProps<{ badgeClass: string; label: string }>();
</script>

<template>
  <span :class="badgeClass">{{ label }}</span>
</template>

<style>
.task-badge.status-qualified {
  background-color: #c8e6c9;
  color: #256029;
}

.task-badge.status-unqualified {
  background-color: #ffcdd2;
  color: #c63737;
}

.task-badge.status-proposal {
  background-color: #ffd8b2;
  color: #805b36;
}

.task-badge.status-negotiation {
  background-color: #feedaf;
  color: #8a5340;
}

.task-badge.status-renewal {
  background-color: #eccfff;
  color: #694382;
}

.task-badge.status-new {
  background-color: #b3e5fc;
  color: #23547b;
}

.task-badge {
  border-radius: 2px;
  padding: 0.25em 0.5rem;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 0.3px;
}
</style>
