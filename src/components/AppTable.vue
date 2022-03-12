<script setup lang="ts">
import { CUSTOMERS } from "@/constatnts";
import AppBadge from "./AppBadge.vue";
</script>

<script lang="ts">
import { FilterMatchMode, FilterOperator } from "primevue/api";
import Column from "primevue/column";
import Calendar from "primevue/calendar";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Dropdown from "primevue/dropdown";
import ProgressBar from "primevue/progressbar";
import Slider from "primevue/slider";
export default {
  data() {
    return {
      customers: CUSTOMERS,
      selectedTasks: null,
      filters: {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: {
          operator: FilterOperator.AND,
          constraints: [
            { value: null, matchMode: FilterMatchMode.STARTS_WITH },
          ],
        },
        date: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
        },
        status: {
          operator: FilterOperator.OR,
          constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
        },
        activity: { value: null, matchMode: FilterMatchMode.BETWEEN },
        verified: { value: null, matchMode: FilterMatchMode.EQUALS },
      },
      loading: true,
      statuses: [
        "unqualified",
        "qualified",
        "new",
        "negotiation",
        "renewal",
        "proposal",
      ],
    };
  },

  mounted() {
    this.loading = false;
  },

  methods: {
    formatDate(value: Date) {
      return value.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    },

    clearFilter() {
      this.initFilters();
    },

    initFilters() {
      this.filters = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: {
          operator: FilterOperator.AND,
          constraints: [
            { value: null, matchMode: FilterMatchMode.STARTS_WITH },
          ],
        },
        date: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
        },
        status: {
          operator: FilterOperator.OR,
          constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
        },
        activity: { value: null, matchMode: FilterMatchMode.BETWEEN },
        verified: { value: null, matchMode: FilterMatchMode.EQUALS },
      };
    },
  },
};
</script>

<template>
  <DataTable
    :value="customers"
    :paginator="true"
    removableSort
    class="p-datatable-task"
    :rows="10"
    dataKey="id"
    :rowHover="true"
    v-model:selection="selectedTasks"
    v-model:filters="filters"
    filterDisplay="menu"
    :loading="loading"
    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
    :rowsPerPageOptions="[10, 25, 50]"
    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
    :globalFilterFields="[
      'name',
      'country.name',
      'representative.name',
      'status',
    ]"
    responsiveLayout="scroll"
  >
    <div
      class="flex flex-column md:flex-row md:justify-content-between md:align-items-center bg-white mb-3"
    >
      <h5 class="m-0 fw-bold">Tasks</h5>
      <Button
        type="button"
        icon="pi pi-filter-slash"
        label="Clear"
        class="p-button-outlined p-button-danger"
        @click="clearFilter()"
      />
    </div>
    <template #empty> No tasks found. </template>
    <template #loading> Loading tasks data. Please wait. </template>
    <Column field="name" header="Task" sortable>
      <template #body="{ data }">
        {{ data.name }}
      </template>
      <template #filter="{ filterModel }">
        <InputText
          type="text"
          v-model="filterModel.value"
          class="p-column-filter"
          placeholder="Search by task"
        />
      </template>
    </Column>
    <Column
      field="date"
      header="Date"
      sortable
      dataType="date"
      bodyStyle="text-align: center;"
    >
      <template #body="{ data }">
        {{ formatDate(data.date) }}
      </template>
      <template #filter="{ filterModel }">
        <Calendar
          v-model="filterModel.value"
          dateFormat="mm/dd/yy"
          placeholder="mm/dd/yyyy"
        />
      </template>
    </Column>
    <Column
      field="status"
      header="Status"
      sortable
      :filterMenuStyle="{ width: '14rem' }"
      bodyStyle="text-align: center;"
    >
      <template #body="{ data }">
        <AppBadge :label="data.status"></AppBadge>
        <!-- <span :class="'task-badge status-' + data.status">{{
          data.status
        }}</span> -->
      </template>
      <template #filter="{ filterModel }">
        <Dropdown
          v-model="filterModel.value"
          :options="statuses"
          placeholder="Any"
          class="p-column-filter"
          :showClear="true"
        >
          <template #value="slotProps">
            <span :class="'task-badge status-' + slotProps.value">{{
              slotProps.value
            }}</span>
          </template>
          <template #option="slotProps">
            <span :class="'task-badge status-' + slotProps.option">{{
              slotProps.option
            }}</span>
          </template>
        </Dropdown>
      </template>
    </Column>
    <Column
      field="activity"
      header="Priority"
      sortable
      :showFilterMatchModes="false"
    >
      <template #body="{ data }">
        <ProgressBar :value="data.activity" :showValue="false" />
      </template>
      <template #filter="{ filterModel }">
        <Slider v-model="filterModel.value" range class="m-3"></Slider>
        <div class="flex align-items-center justify-content-center px-2">
          <span>{{ filterModel.value ? filterModel.value[0] : 0 }}</span>
          <span>{{ filterModel.value ? filterModel.value[1] : 100 }}</span>
        </div>
      </template>
    </Column>
    <Column
      headerStyle="min-width: 4rem; text-align: center"
      bodyStyle="text-align: center; overflow: visible"
    >
      <template #body>
        <Button type="button" icon="pi pi-cog"></Button>
      </template>
    </Column>
  </DataTable>
</template>

<style lang="scss" scoped>
::v-deep(.p-paginator) .p-paginator-current {
  margin-left: auto;
}
::v-deep(.p-progressbar) {
  height: 0.5rem;
  background-color: #d8dadc;
}
::v-deep(.p-progressbar) .p-progressbar-value {
  background-color: #607d8b;
}
::v-deep(.p-datepicker) {
  min-width: 25rem;
}
::v-deep(.p-datepicker) td {
  font-weight: 400;
}
::v-deep(.p-datatable.p-datatable-task) .p-datatable-header {
  padding: 1rem;
  text-align: left;
  font-size: 1.5rem;
}
::v-deep(.p-datatable.p-datatable-task) .p-paginator {
  padding: 1rem;
}
::v-deep(.p-datatable.p-datatable-task) .p-datatable-thead > tr > th {
  text-align: left;
}
::v-deep(.p-datatable.p-datatable-task) .p-datatable-tbody > tr > td {
  cursor: auto;
  text-align: left;
}
::v-deep(.p-datatable.p-datatable-task) .p-dropdown-label:not(.p-placeholder) {
  text-transform: uppercase;
}
</style>
