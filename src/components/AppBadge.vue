<script setup lang="ts">
defineProps<{ label: string }>();
</script>

<template>
  <div>
    <!-- <b-button variant="primary"
      >Notifications  -->
    <b-badge rounded variant="success">{{ label.toLocaleUpperCase() }}</b-badge>
    <!-- </b-button> -->

    <!-- <b-button variant="primary" class="position-relative">
      Inbox
      <b-badge variant="danger" text-indicator>
        99+
        <span class="visually-hidden">unread messages</span>
      </b-badge>
    </b-button>

    <b-button variant="primary" class="position-relative">
      Inbox
      <b-badge variant="danger" dot-indicator>
        <span class="visually-hidden">New alerts</span>
      </b-badge>
    </b-button> -->
  </div>
</template>
