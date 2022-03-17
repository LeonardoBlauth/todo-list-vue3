<script setup lang="ts">
import { useViewStore } from "@/stores/view";

const view = useViewStore();
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light">
    <div class="container-fluid">
      <RouterLink class="navbar-brand fw-bold" to="/"
        ><i class="pi pi-check-circle me-2"></i>Todo List</RouterLink
      >
      <b-button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </b-button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <RouterLink
              class="nav-link"
              :class="[
                { active: view.view === 'all' },
                { 'fw-bold': view.view === 'all' },
              ]"
              to="/"
              @click="view.setView('all')"
              ><small>ALL</small></RouterLink
            >
          </li>
          <li class="nav-item">
            <RouterLink
              class="nav-link"
              :class="[
                { active: view.view === 'completed' },
                { 'fw-bold': view.view === 'completed' },
              ]"
              to="/completed"
              @click="view.setView('completed')"
              ><small>COMPLETED</small></RouterLink
            >
          </li>
          <li class="nav-item">
            <RouterLink
              class="nav-link"
              :class="[
                { active: view.view === 'incompleted' },
                { 'fw-bold': view.view === 'incompleted' },
              ]"
              to="/incompleted"
              @click="view.setView('incompleted')"
              ><small>INCOMPLETED</small></RouterLink
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
